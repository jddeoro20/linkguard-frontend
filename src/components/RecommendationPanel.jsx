
function RecommendationPanel({ recommendation, riskLevel }) {
  if (!recommendation) {
    return null
  }

  const normalizedLevel = (riskLevel || '').toLowerCase()

  const levelClass =
    normalizedLevel === 'alto'
      ? 'recommendation-high'
      : normalizedLevel === 'medio'
        ? 'recommendation-medium'
        : 'recommendation-low'

  const getIcon = () => {
    if (normalizedLevel === 'alto') return '!'
    if (normalizedLevel === 'medio') return '⚠'
    return '✓'
  }

  const getTitle = () => {
    if (normalizedLevel === 'alto') {
      return 'Precaución: riesgo elevado'
    }

    if (normalizedLevel === 'medio') {
      return 'Mantén la precaución'
    }

    return 'Recomendación de seguridad'
  }

  return (
    <section className={`recommendation-panel ${levelClass}`}>
      <div className="recommendation-icon" aria-hidden="true">
        {getIcon()}
      </div>

      <div className="recommendation-content">
        <span className="recommendation-eyebrow">
          RECOMENDACIÓN DE LINKGUARD
        </span>

        <h2>{getTitle()}</h2>

        <p>{recommendation}</p>
      </div>
    </section>
  )
}

export default RecommendationPanel
