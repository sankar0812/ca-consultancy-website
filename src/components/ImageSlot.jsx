import Artwork from './Artwork.jsx';

/**
 * Shows a real image when supplied (src, srcSet, sizes), otherwise the built-in artwork.
 * Add photography in data/site.js > images.
 */
export default function ImageSlot({ image, variant = 'hero', alt, priority = false, className = '' }) {
  return (
    <div className={`image-slot ${className}`.trim()}>
      {image?.src ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes || '(min-width: 960px) 50vw, 100vw'}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      ) : (
        <Artwork variant={variant} label={alt} />
      )}
    </div>
  );
}
