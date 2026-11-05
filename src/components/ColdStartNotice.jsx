
function ColdStartNotice() {
  return (
    <div className="cold-start-notice" role="status">
      <span className="loading-indicator" aria-hidden="true" />

      <p>
        Conectando con el servidor de análisis (despertando
        instancia de prueba)... esto puede tomar unos segundos
        la primera vez.
      </p>
    </div>
  )
}

export default ColdStartNotice
