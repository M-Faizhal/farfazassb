import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

const Carousel = ({ 
  images = [], 
  autoSlide = true, 
  autoSlideInterval = 4000,
  showDots = false, // Default ke false
  showArrows = true,
  showPlayPause = true,
  className = "",
  height = "h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoSlide);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto slide functionality
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const slideInterval = setInterval(goToNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [isPlaying, autoSlideInterval, images.length, goToNext]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Preload images for better performance
  useEffect(() => {
    if (images.length > 0) {
      const imagePromises = images.map(image => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = image.src;
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsLoading(false);
      });
    }
  }, [images]);

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-gray-200 rounded-lg ${className}`}>
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${height} bg-gray-200 rounded-lg animate-pulse ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`}>
      {/* Main image container */}
      <div 
        className={`relative overflow-hidden rounded-lg shadow-xl ${height}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <img
                src={image.src}
                alt={image.alt || `Slide ${index + 1}`}
                className="w-full h-full object-cover"
                style={{ aspectRatio: '3024/1745' }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6">
                  <div className="max-w-4xl mx-auto">
                    <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-2">
                      {image.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base lg:text-lg">
                      {image.caption}
                    </p>
                  </div>
                </div>
              )}

              {/* Slide counter */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {index + 1} / {images.length}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
          </>
        )}

        {/* Play/Pause button */}
        {showPlayPause && images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
        )}

        {/* Progress bar */}
        {isPlaying && images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className="h-full bg-blue-600 transition-all duration-100 ease-linear"
              style={{ 
                width: `${((Date.now() % autoSlideInterval) / autoSlideInterval) * 100}%`,
                animation: `progress ${autoSlideInterval}ms linear infinite`
              }}
            />
          </div>
        )}
      </div>

      {/* Dots indicator - hanya tampil jika showDots = true */}
      {showDots && images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Carousel;