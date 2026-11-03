export function validateUrl(value) {
  if (!value || typeof value !== 'string') {
    return false
  }

  const trimmed = value.trim()

  // No aceptamos texto vacío
  if (!trimmed) {
    return false
  }

  // Evitamos entradas absurdamente largas
  if (trimmed.length > 4096) {
    return false
  }

  try {
    // Si el usuario escribió "google.com", agregamos https://
    const url = new URL(
      /^https?:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`,
    )

    // LinkGuard solamente trabaja con HTTP/HTTPS
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false
    }

    // Debe existir un hostname
    if (!url.hostname) {
      return false
    }

    // No permitimos espacios dentro de la URL
    if (/\s/.test(trimmed)) {
      return false
    }

    // Evitamos aceptar texto común como "hola"
    // Permitimos dominios, subdominios e IPs.
    const hostname = url.hostname

    const isIPv4 =
      /^(?:\d{1,3}\.){3}\d{1,3}$/.test(hostname)

    const isDomain = hostname.includes('.')

    if (!isIPv4 && !isDomain) {
      return false
    }

    return true
  } catch {
    return false
  }
}