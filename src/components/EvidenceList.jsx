
import { useState } from 'react'

function EvidenceList({ evidences = [] }) {
  const [expandedItems, setExpandedItems] = useState([])

  const toggleEvidence = (index) => {
    setExpandedItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    )
  }

  if (!Array.isArray(evidences)) {
    return null
  }

  return (
    <section className="evidence-section">
      <div className="evidence-header">
        <div>
          <span className="evidence-eyebrow">
            DETECCIÓN DE AMENAZAS
          </span>
          <h2>Evidencias encontradas</h2>
        </div>

        <span className="evidence-count">
          {evidences.length} {evidences.length === 1 ? 'indicador' : 'indicadores'}
        </span>
      </div>

      {evidences.length === 0 ? (
        <div className="evidence-empty">
          <span className="evidence-empty-icon" aria-hidden="true">
            ✓
          </span>
          <div>
            <strong>No se detectaron evidencias</strong>
            <p>
              El motor de reglas no identificó indicadores
              sospechosos en esta URL.
            </p>
          </div>
        </div>
      ) : (
        <div className="evidence-list">
          {evidences.map((evidence, index) => {
            const expanded = expandedItems.includes(index)

            return (
              <article
                className="evidence-item"
                key={evidence.rule_id || index}
              >
                <button
                  className="evidence-toggle"
                  type="button"
                  onClick={() => toggleEvidence(index)}
                  aria-expanded={expanded}
                >
                  <div className="evidence-item-main">
                    <span className="evidence-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="evidence-item-info">
                      <strong>
                        {evidence.title || 'Evidencia detectada'}
                      </strong>
                      <span>
                        {evidence.rule_id || 'Regla sin identificador'}
                      </span>
                    </div>
                  </div>

                  <div className="evidence-item-actions">
                    <span className="evidence-points">
                      +{Number(evidence.points) || 0} pts
                    </span>

                    <span
                      className={`evidence-chevron ${expanded ? 'expanded' : ''}`}
                      aria-hidden="true"
                    >
                      ⌄
                    </span>
                  </div>
                </button>

                {expanded && (
                  <div className="evidence-description">
                    {evidence.description ||
                      'No hay una descripción disponible para esta evidencia.'}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default EvidenceList
