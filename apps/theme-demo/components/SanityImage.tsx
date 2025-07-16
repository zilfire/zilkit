import imageUrlBuilder from '@sanity/image-url'
import {client} from '../lib/sanity'
import Image from 'next/image'

const builder = imageUrlBuilder(client)

interface SanityImageProps {
  image: any
  alt?: string
  width?: number
  height?: number
  className?: string
  sizes?: string
}

export default function SanityImage({
  image,
  alt = '',
  width = 800,
  height = 600,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SanityImageProps) {
  if (!image) return null

  const imageUrl = builder.image(image).url()

  return (
    <Image
      src={imageUrl}
      alt={alt || image.alt || ''}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
    />
  )
}
