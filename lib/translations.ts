export type Lang = 'fr' | 'en'

export const translations = {
  fr: {
    hero: {
      tagline: "L'Excellence du Quotidien",
      discover: 'Découvrir',
    },
    philosophie: {
      body: "Derrière chaque grande résidence se cache une exigence invisible : tout doit fonctionner, toujours, sans que cela ne se voie. ALPSEREN est né pour porter cette exigence — avec la discrétion d'un confident, la précision d'un professionnel et la réactivité d'un partenaire toujours présent. Coordination, supervision, esthétique et technologie au service de votre tranquillité.",
    },
    estate: {
      label: '01 / Estate Management',
      heading: ['Votre Résidence,', 'Notre Vigilance'],
      body: 'Ménage, jardinage, coordination des prestataires.\nVotre propriété entretenue à la perfection, chaque jour.',
    },
    lifestyle: {
      label: '02 / Lifestyle Services',
      heading: ['Chaque Détail,', 'Pris en Charge'],
      body: 'Soins aux animaux, transport de chevaux, services sur-mesure.\nVotre quotidien, simplifié.',
    },
    servicesDetail: {
      estate: {
        items: [
          'Ménage régulier et grand nettoyage',
          'Entretien des jardins et espaces extérieurs',
          'Coordination et supervision des prestataires',
          'Intendance et gestion des stocks',
          'Surveillance saisonnière de la propriété',
        ],
      },
      lifestyle: {
        items: [
          'Soins aux animaux de compagnie',
          'Transport et logistique équestre',
          'Services sur-mesure et organisation',
          'Gestion des livraisons et commandes',
          'Accompagnement administratif du quotidien',
        ],
      },
    },
    contact: {
      label: '03 / Contact',
      name: 'Prénom & Nom',
      email: 'Email',
      phone: 'Téléphone',
      service: 'Type de service',
      timeline: 'Délai du projet',
      message: 'Message',
      captcha: 'Captcha : 3 + 4 = ?',
      send: 'Envoyer',
      sent: 'Message transmis.',
      acceptancePrefix: "J'ai lu et j'accepte la",
      acceptanceLink: 'politique de confidentialité',
    },
  },
  en: {
    hero: {
      tagline: 'Everyday Excellence',
      discover: 'Discover',
    },
    philosophie: {
      body: "Behind every great residence lies an invisible requirement: everything must work, always, without it being noticed. ALPSEREN was born to carry this requirement — with the discretion of a confidant, the precision of a professional and the responsiveness of a partner always present. Coordination, supervision, aesthetics and technology at the service of your peace of mind.",
    },
    estate: {
      label: '01 / Estate Management',
      heading: ['Your Residence,', 'Our Vigilance'],
      body: 'Housekeeping, gardening, contractor coordination.\nYour property maintained to perfection, every day.',
    },
    lifestyle: {
      label: '02 / Lifestyle Services',
      heading: ['Every Detail,', 'Taken Care Of'],
      body: 'Animal care, horse transport, bespoke services.\nYour daily life, simplified.',
    },
    servicesDetail: {
      estate: {
        items: [
          'Regular housekeeping and deep cleaning',
          'Garden and outdoor space maintenance',
          'Contractor coordination and supervision',
          'Household management and inventory',
          'Seasonal property watch',
        ],
      },
      lifestyle: {
        items: [
          'Pet care and companion animal services',
          'Horse transport and equestrian logistics',
          'Bespoke services and event organisation',
          'Parcel and delivery management',
          'Daily administrative support',
        ],
      },
    },
    contact: {
      label: '03 / Contact',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Type of service',
      timeline: 'Project timeline',
      message: 'Message',
      captcha: 'Captcha: 3 + 4 = ?',
      send: 'Send',
      sent: 'Message sent.',
      acceptancePrefix: 'I have read and accept the',
      acceptanceLink: 'privacy policy',
    },
  },
}
