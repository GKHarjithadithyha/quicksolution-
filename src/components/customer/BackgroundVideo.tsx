import React, { useRef, useState } from 'react';

interface BackgroundVideoProps {
  src?: string;
  poster: string;
  alt: string;
  className?: string;
  autoPlayAlways?: boolean;
  isActive?: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  src,
  poster,
  alt,
  className = 'w-full h-full object-cover',
  autoPlayAlways = true,
  isActive = true
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !src || hasError) return;

    if (autoPlayAlways || isActive) {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy; poster image remains visible
        });
      }
    } else {
      el.pause();
    }
  }, [autoPlayAlways, isActive, src, hasError]);

  if (!src || hasError) {
    return <img src={poster} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay={autoPlayAlways}
      muted
      loop
      playsInline
      preload={autoPlayAlways ? 'auto' : 'metadata'}
      onError={() => setHasError(true)}
      aria-label={alt}
      className={className}
    />
  );
};
