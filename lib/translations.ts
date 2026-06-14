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
      body: 'Entretien, jardinage, maintenance : nous sélectionnons et supervisons chaque prestataire. Vous avez un seul interlocuteur, votre propriété a notre attention constante.',
    },
    lifestyle: {
      label: '02 / Lifestyle Services',
      heading: ['Chaque Détail,', 'Pris en Charge'],
      body: 'Garde d\'animaux, logistique équestre, démarches du quotidien : nous trouvons le bon prestataire et coordonnons chaque intervention. Votre quotidien, simplifié.',
    },
    servicesDetail: {
      estate: {
        intro: 'Nous sélectionnons, coordonnons et supervisons l\'ensemble des intervenants — ménage et grand nettoyage, jardins et espaces extérieurs, intendance et gestion des stocks, surveillance saisonnière de la propriété. Vous gardez un seul interlocuteur.',
        items: [],
      },
      lifestyle: {
        intro: 'Pour chaque besoin, nous trouvons le bon prestataire et coordonnons l\'intervention de bout en bout — garde et soins des animaux, transport et logistique équestre, livraisons et commandes, accompagnement administratif du quotidien.',
        items: [],
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
      send: 'Envoyer',
      sent: 'Message transmis.',
      acceptancePrefix: "J'ai lu et j'accepte la",
      acceptanceLink: 'politique de confidentialité',
      serviceOptions: {
        estate:    'Estate Management (Gestion de résidence)',
        lifestyle: 'Lifestyle Services (Services du quotidien)',
      },
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
      body: 'Maintenance, gardening, upkeep: we select and supervise every contractor. You have a single point of contact, and your property has our constant attention.',
    },
    lifestyle: {
      label: '02 / Lifestyle Services',
      heading: ['Every Detail,', 'Taken Care Of'],
      body: 'Pet care, equestrian logistics, everyday errands: we find the right provider and coordinate each intervention. Your daily life, simplified.',
    },
    servicesDetail: {
      estate: {
        intro: 'We select, coordinate and supervise every contractor. You keep a single point of contact.',
        items: [
          'Housekeeping and deep cleaning',
          'Gardens and outdoor spaces',
          'Household management and inventory',
          'Seasonal property watch',
        ],
      },
      lifestyle: {
        intro: 'For every need, we find the right provider and coordinate the work from start to finish.',
        items: [
          'Pet care and companion animals',
          'Horse transport and equestrian logistics',
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
      send: 'Send',
      sent: 'Message sent.',
      acceptancePrefix: 'I have read and accept the',
      acceptanceLink: 'privacy policy',
      serviceOptions: {
        estate:    'Estate Management',
        lifestyle: 'Lifestyle Services',
      },
    },
  },
}
