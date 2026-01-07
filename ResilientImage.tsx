/**
 * ResilientImage Component
 * Handles image loading with fallback, retry logic, and network error handling
 */

import { useState, useEffect } from 'react';
import { getFallbackImage, imageCache } from '@/lib/networkOptimization';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
  maxRetries?: number;
}

export default function ResilientImage({
  src,
  alt,
  className = '',
  onError,
  maxRetries = 2
}: ResilientImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check cache first
    const cached = imageCache.get(src);
    if (cached) {
      setImageSrc(cached);
      setIsLoading(false);
      return;
    }

    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    imageCache.set(src, src);
  };

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Retry with a delay
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageSrc(src + `?retry=${retryCount + 1}`);
      }, 1000 * (retryCount + 1));
    } else {
      // Use fallback
      setHasError(true);
      setIsLoading(false);
      setImageSrc(getFallbackImage('placeholder'));
      onError?.();
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
    />
  );
}
