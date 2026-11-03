const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function analyzeUrl(url) {
  const response = await fetch(`${API_BASE_URL}/api/v1/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  })

  if (!response.ok) {
    let errorMessage = 'No fue posible analizar la URL.'

    try {
      const errorData = await response.json()

      if (errorData?.detail) {
        errorMessage = errorData.detail
      }
    } catch {
      // El backend puede devolver una respuesta sin JSON.
    }

    throw new Error(errorMessage)
  }

  return response.json()
}