// Lightbox Module - Vanilla JS Gallery Modal
// Provides click-to-view lightbox functionality for gallery images

(function() {
  'use strict';

  const Lightbox = {
    overlay: null,
    image: null,
    caption: null,
    closeBtn: null,

    /**
     * Initialize lightbox
     * @param {string} selector - CSS selector for gallery items
     */
    init: function(selector) {
      console.log('[Lightbox] Initializing with selector:', selector);
      
      // Create lightbox HTML if not exists
      this.createLightboxHTML();
      
      // Attach event listeners to gallery items
      this.attachEventListeners(selector);
      
      console.log('[Lightbox] Initialization complete');
    },

    /**
     * Create lightbox HTML structure
     */
    createLightboxHTML: function() {
      // Check if lightbox already exists
      if (document.querySelector('.lightbox-overlay')) {
        this.overlay = document.querySelector('.lightbox-overlay');
        this.image = this.overlay.querySelector('.lightbox-image');
        this.caption = this.overlay.querySelector('.lightbox-caption');
        this.closeBtn = this.overlay.querySelector('.lightbox-close');
        return;
      }

      // Create overlay
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Gallery Lightbox');

      // Create content wrapper
      const content = document.createElement('div');
      content.className = 'lightbox-content';

      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.textContent = '×';
      closeBtn.setAttribute('aria-label', 'Close lightbox');
      closeBtn.setAttribute('type', 'button');

      // Create image element
      const image = document.createElement('img');
      image.className = 'lightbox-image';

      // Create caption
      const caption = document.createElement('p');
      caption.className = 'lightbox-caption';

      // Assemble structure
      content.appendChild(closeBtn);
      content.appendChild(image);
      content.appendChild(caption);
      overlay.appendChild(content);

      // Add to DOM
      document.body.appendChild(overlay);

      // Store references
      this.overlay = overlay;
      this.image = image;
      this.caption = caption;
      this.closeBtn = closeBtn;
    },

    /**
     * Attach click listeners to gallery items
     * @param {string} selector - CSS selector for gallery items
     */
    attachEventListeners: function(selector) {
      const self = this;
      const items = document.querySelectorAll(selector);

      console.log('[Lightbox] Found', items.length, 'gallery items');

      items.forEach((item, index) => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();

          const img = this.querySelector('img');
          const imgSrc = img ? img.src : this.getAttribute('data-image');
          const imgAlt = img ? img.alt : 'Gallery Image';
          const caption = img ? img.alt : this.getAttribute('data-caption') || 'Gallery Image';

          console.log('[Lightbox] Opening item', index + 1, '-', imgAlt);

          self.open(imgSrc, caption);
        });
      });

      // Close button event
      this.closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        self.close();
      });

      // Overlay backdrop click (outside image)
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          self.close();
        }
      });

      // ESC key to close
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
          self.close();
        }
      });

      console.log('[Lightbox] Event listeners attached');
    },

    /**
     * Open lightbox with image
     * @param {string} src - Image source
     * @param {string} caption - Image caption
     */
    open: function(src, caption) {
      if (!src) {
        console.warn('[Lightbox] No image source provided');
        return;
      }

      this.image.src = src;
      this.caption.textContent = caption || '';
      this.overlay.classList.add('active');

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      console.log('[Lightbox] Opened:', src);
    },

    /**
     * Close lightbox
     */
    close: function() {
      this.overlay.classList.remove('active');

      // Restore body scroll
      document.body.style.overflow = '';

      console.log('[Lightbox] Closed');
    }
  };

  // Export globally for use in other scripts
  window.Lightbox = Lightbox;

  console.log('[Lightbox] Module loaded and ready for initialization');
})();
