
import { useState } from 'react'
import './App.css'

import URLForm from './components/URLForm'
import ScoreCard from './components/ScoreCard'
import EvidenceList from './components/EvidenceList'
import RecommendationPanel from './components/RecommendationPanel'
import ErrorMessage from './components/ErrorMessage'

import { analyzeUrl } from './services/api'

function App() {
  const [result, setResult] = useState(null)
  const [analyzedUrl, setAnalyzedUrl] = useState('')
  const [error, setError] = useState('')

  const handleAnalyze = async (url, options = {}) => {
    setResult(null)
    setError('')
    setAnalyzedUrl(url)

    try {
      const data = await analyzeUrl(url, options)

      if (
        typeof data?.score !== 'number' ||
        !data?.risk_level ||
        !Array.isArray(data?.evidences)
      ) {
        throw new Error(
          'El servidor devolvió una respuesta incompleta o con un formato inesperado.',
        )
      }

      setResult(data)
    } catch (requestError) {
      setError(
        requestError.message ||
          'No fue posible completar el análisis. Inténtalo nuevamente.',
      )
    }
  }

  const handleRetry = () => {
    if (analyzedUrl) {
      handleAnalyze(analyzedUrl)
    }
  }

  const handleNewAnalysis = () => {
    setResult(null)
    setError('')
    setAnalyzedUrl('')
  }

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L19 6V11.5C19 16.2 16.1 20 12 21C7.9 20 5 16.2 5 11.5V6L12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15.5 9.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>LinkGuard</span>
        </div>

        <span className="navbar-status">
          Protección inteligente de URLs
        </span>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              ANÁLISIS DE SEGURIDAD
            </div>

            <h1>
              ¿Puedes confiar
              <br />
              <span>en este enlace?</span>
            </h1>

            <p className="hero-description">
              Analiza una URL antes de confiar en ella. LinkGuard identifica
              características sospechosas y señales de riesgo sin abrir el sitio.
            </p>

            <URLForm onAnalyze={handleAnalyze} />

            <div className="trust-points">
              <div className="trust-point">
                <span className="check">✓</span>
                <span>No abrimos el sitio</span>
              </div>

              <div className="trust-point">
                <span className="check">✓</span>
                <span>Analizamos sus características</span>
              </div>

              <div className="trust-point">
                <span className="check">✓</span>
                <span>Resultado de 0 a 100</span>
              </div>
            </div>
          </div>

          <div className="security-card">
            <div className="card-header">
              <div>
                <span className="card-label">EVALUACIÓN</span>
                <h2>¿Qué analizamos?</h2>
              </div>

              <div className="shield-mini" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3L19 6V11.5C19 16.2 16.1 20 12 21C7.9 20 5 16.2 5 11.5V6L12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="analysis-items">
              <div className="analysis-item">
                <div className="analysis-icon blue">01</div>
                <div>
                  <strong>Estructura de la URL</strong>
                  <span>Características y patrones sospechosos</span>
                </div>
              </div>

              <div className="analysis-item">
                <div className="analysis-icon blue">02</div>
                <div>
                  <strong>Reglas de seguridad</strong>
                  <span>Evaluación mediante múltiples indicadores</span>
                </div>
              </div>

              <div className="analysis-item">
                <div className="analysis-icon green">03</div>
                <div>
                  <strong>Reputación</strong>
                  <span>Consulta de fuentes externas disponibles</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <span className="status-dot"></span>
              <span>Análisis seguro y no intrusivo</span>
            </div>
          </div>
        </section>

        {(error || result) && (
          <section className="results-section" aria-live="polite">
            {error && (
              <ErrorMessage
                message={error}
                onRetry={handleRetry}
              />
            )}

            {result && (
              <div className="results-content">
                <div className="results-heading">
                  <div>
                    <span className="results-eyebrow">
                      INFORME DE SEGURIDAD
                    </span>
                    <h2>Resultado del análisis</h2>
                    <p>
                      Evaluación completada para la URL proporcionada.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="new-analysis-button"
                    onClick={handleNewAnalysis}
                  >
                    Nuevo análisis
                  </button>
                </div>

                <ScoreCard result={result} />

                <RecommendationPanel
                  recommendation={result.recommendation}
                  riskLevel={result.risk_level}
                />

                <EvidenceList
                  evidences={result.evidences}
                />
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <span>LinkGuard</span>
        <span>Evaluación de riesgo de URLs</span>
      </footer>
    </div>
  )
}

export default App
