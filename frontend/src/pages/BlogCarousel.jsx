import React, { useState } from 'react';
import useCarousel from '../hooks/useCarousel';
import BlogCard from '../pages/BlogCard';
import { NavigationButtons, CarouselInfo } from './CarouselControls';
import Modal from './Modal';
import { blogPosts } from '../components/BlogData';
import '../components/BlogCarousel.css';

const BlogCarousel = () => {
  const {
    carouselIndex,
    carouselTrackRef,
    extendedBlogPosts,
    handlePrev,
    handleNext,
    isTransitioning,
    isAutoScroll,
    setIsAutoScroll,
    getCurrentPostIndex,
  } = useCarousel(blogPosts);

  const [selectedPost, setSelectedPost] = useState(null);

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const toggleAutoScroll = () => {
    setIsAutoScroll(!isAutoScroll);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="blog-carousel-container">
      <div className="carousel-header">
        <h2 className="carousel-title">Последние статьи</h2>
        <p className="carousel-subtitle">Изучайте новые технологии и тренды разработки</p>
      </div>

      <div className="blog-carousel">
        <NavigationButtons 
          handlePrev={handlePrev}
          handleNext={handleNext}
          isTransitioning={isTransitioning}
        />

        <div className="carousel-track" ref={carouselTrackRef}>
          {extendedBlogPosts.map((post, index) => (
            <BlogCard
              key={`${post.id}-${index}`}
              post={post}
              index={index}
              isCenter={index === carouselIndex}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      <CarouselInfo 
        isAutoScroll={isAutoScroll}
        toggleAutoScroll={toggleAutoScroll}
        currentPostIndex={getCurrentPostIndex()}
        totalPosts={blogPosts.length}
      />

      <Modal 
        selectedPost={selectedPost}
        onClose={closeModal}
      />
    </div>
  );
};

export default BlogCarousel;