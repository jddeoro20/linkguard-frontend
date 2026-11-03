import { useState } from 'react'
import { validateUrl } from '../utils/validateUrl'

function URLForm({ onAnalyze }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('1. Se presionó el botón')
    console.log('2. URL:', url)

    const trimmedUrl = url.trim()

    if (!validateUrl(trimmedUrl)) {
      console.log('3. URL inválida')
      setError('Ingresa una URL válida para analizar.')
      return
    }

    console.log('3. URL válida')

    setError('')
    setLoading(true)

    try {
      await onAnalyze(trimmedUrl)
      console.log('4. onAnalyze ejecutado')
    } catch (error) {
      console.error('Error:', error)
      setError('No fue posible analizar la URL. Inténtalo nuevamente.')
    } finally {
      setLoading(false)
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
          autoComplete="off"
        />

        <button
          type="submit"
          disabled={loading}
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
    </form>
  )
}

export default URLForm