import React from 'react';

const Modal = ({ selectedPost, onClose }) => {
  if (!selectedPost) return null;

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>
        <img 
          src={selectedPost.image} 
          alt={selectedPost.title}
          className="modal-image"
        />
        <h2 className="modal-title">{selectedPost.title}</h2>
        <p className="modal-meta">{selectedPost.date} • {selectedPost.author}</p>
        <p className="modal-excerpt">{selectedPost.excerpt}</p>
        <div className="modal-tags">
          {selectedPost.tags?.map((tag, i) => (
            <span key={i} className="modal-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;