export default function OfflinePage() {
  return (
    <div
      style={{
        minHeight:       '100dvh',
        backgroundColor: '#14110e',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        padding:         '2rem',
        textAlign:       'center',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--f-display)',
          fontSize:      '13px',
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color:         '#e8e1d2',
          marginBottom:  '3rem',
          display:       'block',
        }}
      >
        ALPSEREN
      </span>

      <div
        style={{
          width:           '1.5rem',
          height:          '1px',
          backgroundColor: 'rgba(232,225,210,.12)',
          margin:          '0 auto 3rem',
        }}
      />

      <h1
        style={{
          fontFamily:    'var(--f-editorial)',
          fontWeight:    300,
          fontSize:      'clamp(28px, 5vw, 42px)',
          lineHeight:    1.3,
          color:         '#e8e1d2',
          marginBottom:  '1.5rem',
          letterSpacing: '-0.005em',
        }}
      >
        Connexion indisponible
      </h1>

      <p
        style={{
          fontFamily: 'var(--f-system)',
          fontWeight: 300,
          fontSize:   '14px',
          lineHeight: 1.85,
          color:      'rgba(232,225,210,.50)',
          maxWidth:   '360px',
        }}
      >
        Vérifiez votre connexion internet et réessayez.
      </p>
    </div>
  )
}
