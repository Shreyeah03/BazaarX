import { useState } from 'react'
import { normalizeImageUrl, getFallbackImage } from '../../utils/images'

export default function ProductImage({ src, alt, className = '', loading = 'lazy', ...props }) {
  const [imgSrc, setImgSrc] = useState(() => normalizeImageUrl(src))
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (!failed) {
      setFailed(true)
      setImgSrc(getFallbackImage())
    }
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      decoding="async"
      onError={handleError}
      {...props}
    />
  )
}
