/**
 * ImageCarousel Component - Luxury Egyptian Mystery Edition
 * Design: Swipeable image carousel with navigation dots
 * Optimized for performance with image preloading
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function ImageCarousel({
  images,
  title,
  autoPlay = false,
  autoPlayInterval = 5000
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loadedImages, setLoadedImages] = useState<number[]>([0]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Preload adjacent images for smooth transitions
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    
    const indicesToPreload = [nextIndex, prevIndex];
    indicesToPreload.forEach(index => {
      if (!loadedImages.includes(index)) {
        const img = new Image();
        img.src = images[index];
        img.onload = () => {
          setLoadedImages(prev => [...prev, index]);
        };
      }
    });
  }, [currentIndex, images, loadedImages]);

  // If only one image, don't show carousel controls
  if (images.length === 1) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] border border-primary/20"
      >
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </motion.div>
    );
  }

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, images.length]);

  // Reset auto-play on manual interaction
  const handleManualInteraction = (callback: () => void): void => {
    if (autoPlayRef.current !== null) {
      clearInterval(autoPlayRef.current);
    }
    callback();
  };

  const slideVariants = useMemo(() => ({
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  }), []);

  return (
    <div className="relative w-full">
      {/* Carousel container */}
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] border border-primary/20 bg-black">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={`carousel-${currentIndex}`}
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Navigation buttons */}
        <button
          onClick={() => handleManualInteraction(handlePrevious)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 touch-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => handleManualInteraction(handleNext)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 touch-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Image counter */}
        <div className="absolute top-3 right-3 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Navigation dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleManualInteraction(() => handleDotClick(index))}
              className={`transition-all duration-300 rounded-full touch-none ${
                index === currentIndex
                  ? 'bg-accent w-3 h-3 sm:w-4 sm:h-4'
                  : 'bg-primary/40 hover:bg-primary/60 w-2 h-2 sm:w-3 sm:h-3'
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
