
import { useState } from 'react'
import { validateUrl } from '../utils/validateUrl'
import ColdStartNotice from './ColdStartNotice'

function URLForm({ onAnalyze }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [slowConnection, setSlowConnection] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedUrl = url.trim()

    if (!validateUrl(trimmedUrl)) {
      setError('Ingresa una URL válida para analizar.')
      return
    }

    setError('')
    setSlowConnection(false)
    setLoading(true)

    try {
      await onAnalyze(trimmedUrl, {
        onSlow: () => setSlowConnection(true),
      })
    } catch (requestError) {
      setError(
        requestError.message ||
          'No fue posible analizar la URL. Inténtalo nuevamente.',
      )
    } finally {
      setLoading(false)
      setSlowConnection(false)
    }
  }

  const handleChange = (event) => {
    setUrl(event.target.value)

    if (error) {
      setError('')
    }
  }

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
        <svg
          className="link-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>

        <input
          type="text"
          value={url}
          onChange={handleChange}
          placeholder="Pega aquí la URL que quieres analizar..."
          aria-label="URL para analizar"
          aria-invalid={Boolean(error)}
          disabled={loading}
          autoComplete="url"
          maxLength={4096}
        />

        <button
          type="submit"
          disabled={loading || !url.trim() || !validateUrl(url)}
        >
          {loading ? 'Analizando...' : 'Analizar URL'}

          {!loading && <span aria-hidden="true">→</span>}
        </button>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      {loading && slowConnection && <ColdStartNotice />}
    </form>
  )
}

export default URLForm
