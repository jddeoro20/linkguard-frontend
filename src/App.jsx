import './App.css'
import URLForm from './components/URLForm'
import { analyzeUrl } from './services/api'

function App() {
  const handleAnalyze = async (url) => {
    const result = await analyzeUrl(url)

    console.log('Resultado del backend:', result)
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

      <main className="hero-section">
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
      </main>

      <footer className="footer">
        <span>LinkGuard</span>
        <span>Evaluación de riesgo de URLs</span>
      </footer>
    </div>
  )
}

export default App