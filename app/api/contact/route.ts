import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Clé secrète reCAPTCHA v3 — à définir dans .env.local : RECAPTCHA_SECRET_KEY
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY ?? ''

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  const { name, email, phone, service, timeline, message, recaptchaToken } = await request.json()

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

  try {
    await resend.emails.send({
      from: 'ALPSEREN <contact@alpseren.ch>',
      to: 'contact@alpseren.ch',
      subject: `Nouveau message de ${name}`,
      html: `
        <p><strong>Nom :</strong> ${esc(name)}</p>
        <p><strong>Email :</strong> ${esc(email)}</p>
        ${phone    ? `<p><strong>Téléphone :</strong> ${esc(phone)}</p>` : ''}
        ${service  ? `<p><strong>Service :</strong> ${esc(service)}</p>` : ''}
        ${timeline ? `<p><strong>Délai :</strong> ${esc(timeline)}</p>` : ''}
        <p><strong>Message :</strong><br>${esc(message).replace(/\n/g, '<br>')}</p>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Resend error:', err)
    return NextResponse.json({ error: 'Erreur envoi', detail: String(err) }, { status: 500 })
  }
}
