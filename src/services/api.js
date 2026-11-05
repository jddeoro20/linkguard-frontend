
const DEVELOPMENT_API_URL = 'http://localhost:8000'
const SLOW_CONNECTION_DELAY = 2000
const REQUEST_TIMEOUT = 45000

function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, '')
  }

  if (import.meta.env.DEV) {
    return DEVELOPMENT_API_URL
  }

  throw new Error(
    'La configuración del servidor no está disponible. Contacta al administrador.',
  )
}

async function readErrorMessage(response) {
  try {
    const errorData = await response.json()

    if (typeof errorData?.detail === 'string') {
      return errorData.detail
    }

    if (Array.isArray(errorData?.detail)) {
      return errorData.detail
        .map((error) => error.msg || 'Error de validación')
        .join('. ')
    }

    if (typeof errorData?.message === 'string') {
      return errorData.message
    }
  } catch {
    // La respuesta puede no contener JSON.
  }

  return 'No fue posible completar el análisis.'
}

export async function analyzeUrl(url, { onSlow } = {}) {
  const API_BASE_URL = getApiBaseUrl()
  const controller = new AbortController()

  let slowConnectionTimer
  let timeoutTimer

  slowConnectionTimer = setTimeout(() => {
    onSlow?.()
  }, SLOW_CONNECTION_DELAY)

  timeoutTimer = setTimeout(() => {
    controller.abort()
  }, REQUEST_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const message = await readErrorMessage(response)

      if (response.status === 400) {
        throw new Error(message)
      }

      if (response.status === 429) {
        throw new Error(
          'Has alcanzado el límite de análisis. Espera un momento antes de intentarlo nuevamente.',
        )
      }

      if (response.status >= 500) {
        throw new Error(
          'El servidor de análisis presenta dificultades. Inténtalo nuevamente más tarde.',
        )
      }

      throw new Error(message)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'El servidor tardó demasiado en responder. Inténtalo nuevamente.',
      )
    }

    if (error instanceof TypeError) {
      throw new Error(
        'No se pudo conectar con el servidor de análisis. Comprueba tu conexión e inténtalo nuevamente.',
      )
    }

    throw error
  } finally {
    clearTimeout(slowConnectionTimer)
    clearTimeout(timeoutTimer)
  }
}
