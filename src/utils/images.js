const FALLBACK =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1028"/>
          <stop offset="100%" style="stop-color:#2d1f3d"/>
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#g)"/>
      <text x="400" y="400" font-family="system-ui,sans-serif" font-size="28" fill="#a855f7" text-anchor="middle" dominant-baseline="middle">BazaarX</text>
    </svg>`
  )

export function normalizeImageUrl(url) {
  if (!url || url.startsWith('data:')) return url
  if (url.includes('images.unsplash.com') && !url.includes('auto=format')) {
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}auto=format&fit=crop`
  }
  return url
}

export function getFallbackImage() {
  return FALLBACK
}
