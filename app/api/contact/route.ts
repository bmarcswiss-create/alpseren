import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY ?? ''

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function line(label: string, value: string) {
  return `<p><strong>${label} :</strong> ${esc(value)}</p>`
}

export async function POST(request: Request) {
  const body = await request.json() as {
    civility?:      string
    firstName?:     string
    lastName?:      string
    email?:         string
    phone?:         string
    address?:       string
    npa?:           string
    localite?:      string
    canton?:        string
    clientType?:    string
    service?:       string
    timeline?:      string
    message?:       string
    consent?:       boolean
    recaptchaToken?: string
  }

  const {
    civility = '', firstName = '', lastName = '', email = '', phone = '',
    address = '', npa = '', localite = '', canton = '', clientType = '',
    service = '', timeline = '', message = '', consent = false,
    recaptchaToken = '',
  } = body

  // ── reCAPTCHA ─────────────────────────────────────────────────────────────
  if (RECAPTCHA_SECRET) {
    try {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
        { method: 'POST' },
      )
      const { success, score } = await verifyRes.json() as { success: boolean; score: number }
      if (!success || score < 0.5) {
        return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 })
      }
    } catch (err) {
      console.error('[contact] reCAPTCHA verify error:', err)
      return NextResponse.json({ error: 'reCAPTCHA verify error' }, { status: 500 })
    }
  }

  // ── Validation serveur ───────────────────────────────────────────────────
  if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !service.trim() || !message.trim()) {
    return NextResponse.json({ error: 'Champ obligatoire manquant' }, { status: 400 })
  }
  if (!consent) {
    return NextResponse.json({ error: 'Consentement requis' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
  }
  const phoneNorm = phone.replace(/[\s\-\.\(\)]/g, '')
  if (!/^[+\d]{7,20}$/.test(phoneNorm)) {
    return NextResponse.json({ error: 'Téléphone invalide' }, { status: 400 })
  }

  // ── Corps de l'email — format Libellé : valeur (une ligne par champ) ──────
  const htmlBody = `
<div style="font-family:sans-serif;font-size:14px;line-height:2;color:#333;max-width:560px;">
  ${line('Civilité',       civility)}
  ${line('Prénom',         firstName)}
  ${line('Nom',            lastName)}
  ${line('Email',          email)}
  ${line('Téléphone',      phone)}
  ${line('Adresse',        address)}
  ${line('NPA',            npa)}
  ${line('Localité',       localite)}
  ${line('Canton',         canton)}
  ${line('Type de client', clientType)}
  ${line('Service',        service)}
  ${line('Délai',          timeline)}
  <p><strong>Message :</strong><br>${esc(message).replace(/\n/g, '<br>')}</p>
  ${line('Consentement',   'Oui')}
</div>`

  const textBody = [
    `Civilité : ${civility}`,
    `Prénom : ${firstName}`,
    `Nom : ${lastName}`,
    `Email : ${email}`,
    `Téléphone : ${phone}`,
    `Adresse : ${address}`,
    `NPA : ${npa}`,
    `Localité : ${localite}`,
    `Canton : ${canton}`,
    `Type de client : ${clientType}`,
    `Service : ${service}`,
    `Délai : ${timeline}`,
    `Message : ${message}`,
    `Consentement : Oui`,
  ].join('\n')

  // ── Envoi ────────────────────────────────────────────────────────────────
  try {
    await resend.emails.send({
      from:    'ALPSEREN <contact@alpseren.ch>',
      to:      'contact@alpseren.ch',
      replyTo: email,
      subject: `Nouveau message de ${firstName} ${lastName}`,
      html:    htmlBody,
      text:    textBody,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Erreur envoi', detail: String(err) }, { status: 500 })
  }
}
