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
      label: '05 / Contact',
      civility: 'Civilité',
      civOptions: { madame: 'Madame', monsieur: 'Monsieur', autre: 'Autre' },
      firstName: 'Prénom',
      lastName:  'Nom',
      email:     'Email',
      phone:     'Téléphone',
      address:   'Adresse',
      npa:       'NPA',
      localite:  'Localité',
      clientType: 'Type de client',
      clientTypeOptions: {
        particulier: 'Particulier',
        regie:       'Régie',
        entreprise:  'Entreprise',
        autre:       'Autre',
      },
      service: 'Service demandé',
      serviceOptions: {
        estate:    'Estate Management (Gestion de propriété)',
        lifestyle: 'Lifestyle Services (Services du quotidien)',
      },
      timeline: 'Délai souhaité',
      timelineOptions: {
        asap:      'Dès que possible',
        semaine:   'Sous 1 semaine',
        mois:      'Sous 1 mois',
        flexible:  'Flexible',
        planifier: 'À planifier',
      },
      message:          'Message',
      send:             'Envoyer',
      sent:             'Message transmis.',
      acceptancePrefix: "J'accepte d'être recontacté(e) et que mes données soient traitées conformément à la",
      acceptanceLink:   'politique de confidentialité',
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
      label: '05 / Contact',
      civility: 'Title',
      civOptions: { madame: 'Ms.', monsieur: 'Mr.', autre: 'Other' },
      firstName: 'First name',
      lastName:  'Last name',
      email:     'Email',
      phone:     'Phone',
      address:   'Address',
      npa:       'Postcode',
      localite:  'City',
      clientType: 'Client type',
      clientTypeOptions: {
        particulier: 'Individual',
        regie:       'Property management',
        entreprise:  'Company',
        autre:       'Other',
      },
      service: 'Service requested',
      serviceOptions: {
        estate:    'Estate Management',
        lifestyle: 'Lifestyle Services',
      },
      timeline: 'Preferred timeline',
      timelineOptions: {
        asap:      'As soon as possible',
        semaine:   'Within 1 week',
        mois:      'Within 1 month',
        flexible:  'Flexible',
        planifier: 'To be planned',
      },
      message:          'Message',
      send:             'Send',
      sent:             'Message sent.',
      acceptancePrefix: 'I agree to be contacted and for my data to be processed in accordance with the',
      acceptanceLink:   'privacy policy',
    },
  },
}
