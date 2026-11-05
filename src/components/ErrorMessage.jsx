
function ErrorMessage({ message, onRetry }) {
  if (!message) return null

  return (
    <div className="error-message" role="alert">
      <div className="error-message-icon" aria-hidden="true">
        !
      </div>

      <div className="error-message-content">
        <strong>No pudimos completar el análisis</strong>

        <p>{message}</p>

        {onRetry && (
          <button
            type="button"
            className="error-retry-button"
            onClick={onRetry}
          >
            Intentar nuevamente
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
