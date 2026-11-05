
import RiskGauge from './RiskGauge'

function ScoreCard({ result }) {
  if (!result) return null

  const {
    score,
    risk_level,
    url_analyzed,
    normalized_url,
    execution_time_ms,
    phishtank_status,
  } = result

  const formatExecutionTime = (time) => {
    if (time === null || time === undefined) {
      return 'No disponible'
    }

    const numericTime = Number(time)

    return Number.isFinite(numericTime)
      ? `${numericTime.toFixed(2)} ms`
      : 'No disponible'
  }

  const formatReputationStatus = (status) => {
    const statuses = {
      available: 'Disponible',
      cached: 'Resultado en caché',
      unavailable: 'No disponible',
      timeout: 'Tiempo de espera agotado',
    }

    return statuses[status] || 'Estado desconocido'
  }

  return (
    <section className="score-card">
      <div className="score-card-header">
        <div>
          <span className="score-card-eyebrow">
            RESULTADO DEL ANÁLISIS
          </span>

          <h2>Evaluación de seguridad</h2>
        </div>

        <div className="score-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L19 6V11.5C19 16.2 16.1 20 12 21C7.9 20 5 16.2 5 11.5V6L12 3Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <RiskGauge score={score} riskLevel={risk_level} />

      <div className="score-card-details">
        <div className="score-detail">
          <span>URL analizada</span>
          <strong title={url_analyzed}>
            {url_analyzed || 'No disponible'}
          </strong>
        </div>

        <div className="score-detail">
          <span>URL normalizada</span>
          <strong title={normalized_url}>
            {normalized_url || 'No disponible'}
          </strong>
        </div>
      </div>

      <div className="score-card-metadata">
        <div className="metadata-item">
          <span>Tiempo de ejecución</span>
          <strong>
            {formatExecutionTime(execution_time_ms)}
          </strong>
        </div>

        <div className="metadata-item">
          <span>PhishTank</span>
          <strong>
            {formatReputationStatus(phishtank_status)}
          </strong>
        </div>
      </div>
    </section>
  )
}

export default ScoreCard
