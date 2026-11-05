
function RiskGauge({ score = 0, riskLevel }) {
  const numericScore = Number(score)

  const safeScore = Number.isFinite(numericScore)
    ? Math.min(100, Math.max(0, numericScore))
    : 0

  const getRiskLevel = () => {
    if (riskLevel) return riskLevel

    if (safeScore <= 30) return 'Bajo'
    if (safeScore <= 69) return 'Medio'

    return 'Alto'
  }

  const level = getRiskLevel()

  const normalizedLevel = level.toLowerCase()

  const color =
    normalizedLevel === 'bajo'
      ? '#16a34a'
      : normalizedLevel === 'medio'
        ? '#d97706'
        : '#dc2626'

  return (
    <section className="risk-gauge" aria-label="Medidor de riesgo">
      <div className="risk-gauge-header">
        <span className="risk-gauge-label">PUNTUACIÓN DE RIESGO</span>

        <span
          className={`risk-level-badge risk-${normalizedLevel}`}
        >
          Riesgo {level.toLowerCase()}
        </span>
      </div>

      <div className="risk-gauge-score">
        <strong style={{ color }}>
          {safeScore}
        </strong>

        <span>/ 100</span>
      </div>

      <div
        className="risk-gauge-track"
        role="progressbar"
        aria-label="Puntuación de riesgo"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
        aria-valuetext={`${safeScore} de 100, riesgo ${level}`}
      >
        <div
          className="risk-gauge-fill"
          style={{
            width: `${safeScore}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className="risk-gauge-scale">
        <span>0 · Bajo</span>
        <span>30</span>
        <span>69</span>
        <span>100 · Alto</span>
      </div>
    </section>
  )
}

export default RiskGauge
