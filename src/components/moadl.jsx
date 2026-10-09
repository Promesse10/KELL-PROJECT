import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div
        className="kk-popup-backdrop"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <section className="kk-popup-dialog" role="dialog" aria-modal="true" aria-label="More information">
          <button type="button" className="kk-popup-close" onClick={onClose} aria-label="Close dialog">
            ×
          </button>
          {children}
        </section>
      </div>
    )
  );
};

export default Modal;
