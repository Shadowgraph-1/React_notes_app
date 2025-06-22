import React from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

const BlogCard = React.memo(({ post, index, isCenter, onClick }) => (
  <div
    className={`blog-card ${isCenter ? 'center' : ''}`}
    onClick={() => onClick(post)}
  >
    <div className="blog-card-image-container">
      <div 
        className="blog-card-image" 
        style={{ backgroundImage: `url(${post.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400"})` }}
      />
      <div className="blog-card-overlay">
        <ExternalLink className="read-more-icon" size={20} />
      </div>
    </div>
    <div className="blog-card-content">
      <div className="blog-card-meta">
        <span className="blog-card-date">
          <Calendar size={14} />
          {post.date}
        </span>
        <span className="blog-card-author">
          <User size={14} />
          {post.author}
        </span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card-tags">
        {post.tags?.map((tag, i) => (
          <span key={i} className="blog-tag">{tag}</span>
        ))}
      </div>
    </div>
  </div>
));

export default BlogCard;