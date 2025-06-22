import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const useCarousel = (blogPosts) => {
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselTrackRef = useRef(null);

  const extendedBlogPosts = useMemo(() => [
    ...blogPosts.slice(-2),
    ...blogPosts,
    ...blogPosts.slice(0, 2),
  ], [blogPosts]);

  useEffect(() => {
    if (!isAutoScroll || isTransitioning) return;
    const interval = setInterval(() => setCarouselIndex((prev) => prev + 1), 4000);
    return () => clearInterval(interval);
  }, [isAutoScroll, isTransitioning]);

  useEffect(() => {
    if (!carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const totalPosts = blogPosts.length;
    track.style.transition = isTransitioning ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    track.style.transform = `translateX(calc(-${carouselIndex * 320}px + 50% - 160px))`;

    if (carouselIndex >= totalPosts + 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCarouselIndex(2);
        setIsTransitioning(false);
      }, 600);
    } else if (carouselIndex < 2) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCarouselIndex(totalPosts + 1);
        setIsTransitioning(false);
      }, 600);
    }
  }, [carouselIndex, isTransitioning, blogPosts.length]);

  const handleNavigation = useCallback((direction) => {
    if (isTransitioning) return;
    setCarouselIndex((prev) => prev + direction);
    setIsAutoScroll(false);
    setTimeout(() => setIsAutoScroll(true), 8000);
  }, [isTransitioning]);

  const getCurrentPostIndex = useCallback(() => {
    return ((carouselIndex - 2) % blogPosts.length + blogPosts.length) % blogPosts.length;
  }, [carouselIndex, blogPosts.length]);

  return {
    carouselIndex,
    carouselTrackRef,
    extendedBlogPosts,
    handlePrev: () => handleNavigation(-1),
    handleNext: () => handleNavigation(1),
    isTransitioning,
    isAutoScroll,
    setIsAutoScroll,
    getCurrentPostIndex,
  };
};

export default useCarousel;