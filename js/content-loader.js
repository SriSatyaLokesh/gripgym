// Content Loader — Fetch and render pricing, gallery, contact & footer sections from data/content.json

document.addEventListener('DOMContentLoaded', function() {
  loadContent();
});

async function loadContent() {
  try {
    const response = await fetch('data/content.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    console.log('[ContentLoader] Data loaded, starting renders...');
    
    // Render pricing section
    renderPricing(data.pricing);
    console.log('[ContentLoader] Pricing rendered');
    
    // Render gallery section
    renderGallery(data.gallery);
    console.log('[ContentLoader] Gallery rendered');
    
    // Render contact section
    renderContact(data.contact);
    console.log('[ContentLoader] Contact rendered');
    
    // Render footer section
    renderFooter(data.footer);
    console.log('[ContentLoader] Footer rendered');
    
    // Attach form handler
    attachFormHandler();
    
    // Reinitialize WOW.js for newly rendered elements
    if (typeof WOW !== 'undefined') {
      new WOW({
        animateClass: 'animated',
        offset: 0,
        mobile: false
      }).init();
      console.log('[ContentLoader] WOW.js reinitialized');
    }
    
    // Initialize lightbox after gallery render
    if (typeof Lightbox !== 'undefined') {
      Lightbox.init('.gallery-item');
      console.log('[ContentLoader] Lightbox initialized');
    }
    
    console.log('[ContentLoader] All content loaded and initialized');
  } catch (error) {
    console.error('Error loading content:', error);
    const pricingGrid = document.getElementById('pricing-grid');
    const galleryGrid = document.getElementById('gallery-grid');
    const contactInfo = document.getElementById('contact-info');
    
    if (pricingGrid) pricingGrid.textContent = 'Error loading pricing data. Please refresh the page.';
    if (galleryGrid) galleryGrid.textContent = 'Error loading gallery data. Please refresh the page.';
    if (contactInfo) contactInfo.textContent = 'Error loading contact data. Please refresh the page.';
  }
}

function renderPricing(pricingData) {
  const intro = document.querySelector('.intro-text');
  if (intro) {
    intro.textContent = pricingData.intro;
  }
  
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;
  
  grid.innerHTML = ''; // Clear placeholder
  
  pricingData.tiers.forEach((tier, index) => {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    if (tier.id === 'elite' || tier.id === 'annual') {
      card.classList.add('featured');
    }
    
    // Price display
    const priceText = document.createElement('div');
    priceText.className = 'price';
    priceText.textContent = '₹' + tier.price.toLocaleString('en-IN');
    
    // Duration
    const duration = document.createElement('div');
    duration.className = 'duration';
    duration.textContent = tier.duration;
    
    // Name
    const name = document.createElement('h3');
    name.textContent = tier.name;
    
    // Discount label (if present)
    if (tier.discount_label) {
      const discount = document.createElement('div');
      discount.className = 'discount-label';
      discount.textContent = tier.discount_label;
      card.appendChild(discount);
    }
    
    // Features list
    const features = document.createElement('ul');
    features.className = 'features';
    tier.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      features.appendChild(li);
    });
    
    // Select button
    const button = document.createElement('button');
    button.className = 'select-plan-btn';
    button.textContent = 'Select Plan';
    button.onclick = function() {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    };
    
    // Assemble card (order: name, price, duration, features, button)
    card.appendChild(name);
    card.appendChild(priceText);
    card.appendChild(duration);
    card.appendChild(features);
    card.appendChild(button);
    
    grid.appendChild(card);
  });
}

function renderGallery(galleryData) {
  const grid = document.getElementById('gallery-grid');
  if (!grid) {
    console.warn('[ContentLoader] Gallery grid container not found');
    return;
  }
  
  grid.innerHTML = ''; // Clear placeholder
  
  if (!galleryData.images || galleryData.images.length === 0) {
    console.warn('[ContentLoader] No gallery images found in data');
    return;
  }
  
  galleryData.images.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item wow fadeIn';
    item.setAttribute('data-wow-delay', (index * 0.1) + 's');
    item.setAttribute('data-image', image.id);
    item.setAttribute('data-caption', image.caption);
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.title = image.caption;
    
    const caption = document.createElement('div');
    caption.className = 'gallery-item-caption';
    caption.textContent = image.caption;
    
    item.appendChild(img);
    item.appendChild(caption);
    
    grid.appendChild(item);
    
    console.log('[ContentLoader] Gallery item added:', image.caption);
  });
}

function renderContact(contactData) {
  const contactInfo = document.getElementById('contact-info');
  if (!contactInfo) return;
  
  contactInfo.innerHTML = ''; // Clear placeholder
  
  // Phone
  const phone = document.createElement('div');
  phone.className = 'contact-item';
  const phoneLabel = document.createElement('strong');
  phoneLabel.textContent = 'Phone:';
  const phoneValue = document.createElement('p');
  phoneValue.textContent = contactData.phone;
  phone.appendChild(phoneLabel);
  phone.appendChild(phoneValue);
  
  // Email
  const email = document.createElement('div');
  email.className = 'contact-item';
  const emailLabel = document.createElement('strong');
  emailLabel.textContent = 'Email:';
  const emailValue = document.createElement('p');
  emailValue.textContent = contactData.email;
  email.appendChild(emailLabel);
  email.appendChild(emailValue);
  
  // Address
  const address = document.createElement('div');
  address.className = 'contact-item';
  const addressLabel = document.createElement('strong');
  addressLabel.textContent = 'Address:';
  const addressValue = document.createElement('p');
  addressValue.textContent = contactData.address;
  address.appendChild(addressLabel);
  address.appendChild(addressValue);
  
  // Hours
  const hours = document.createElement('div');
  hours.className = 'contact-item';
  const hoursLabel = document.createElement('strong');
  hoursLabel.textContent = 'Hours:';
  const hoursValue = document.createElement('p');
  hoursValue.textContent = contactData.hours.weekdays + '\n' + contactData.hours.weekends;
  hoursValue.style.whiteSpace = 'pre-line';
  hours.appendChild(hoursLabel);
  hours.appendChild(hoursValue);
  
  contactInfo.appendChild(phone);
  contactInfo.appendChild(email);
  contactInfo.appendChild(address);
  contactInfo.appendChild(hours);
}

function renderFooter(footerData) {
  // Update footer phone
  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.textContent = footerData.phone;
  }
  
  // Update footer email
  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) {
    footerEmail.textContent = footerData.email;
  }
  
  // Update footer hours
  const footerHours = document.getElementById('footer-hours');
  if (footerHours) {
    footerHours.innerHTML = '';
    const weekdaysP = document.createElement('p');
    weekdaysP.innerHTML = '<strong>Weekdays:</strong> ' + footerData.hours.weekdays;
    const weekendP = document.createElement('p');
    weekendP.innerHTML = '<strong>Weekends:</strong> ' + footerData.hours.weekends;
    footerHours.appendChild(weekdaysP);
    footerHours.appendChild(weekendP);
  }
  
  // Update footer social links
  const footerSocial = document.getElementById('footer-social');
  if (footerSocial && footerData.social_links) {
    footerSocial.innerHTML = '';
    footerData.social_links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.title = link.platform;
      a.innerHTML = '<i class="' + link.icon + '"></i>';
      footerSocial.appendChild(a);
    });
  }
  
  // Update footer year
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
}

function attachFormHandler() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    
    // Show success message
    const msgDiv = document.getElementById('form-message');
    msgDiv.textContent = 'Thank you ' + name + '! Your message has been sent. We will contact you shortly.';
    msgDiv.className = 'success';
    msgDiv.style.display = 'block';
    
    // Reset form
    form.reset();
    
    // Hide message after 5 seconds
    setTimeout(function() {
      msgDiv.style.display = 'none';
    }, 5000);
  });
}

// Add scroll listener for floating glass header transition
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Dynamic Hero Glow Aura Tracking (60fps LERP) - Desktop Only
document.addEventListener('DOMContentLoaded', function() {
  const heroSection = document.querySelector('.home');
  // Check if device supports hover (desktop mouse) and screen is large
  if (heroSection && window.matchMedia('(hover: hover) and (min-width: 768px)').matches) {
    const glowAura = document.createElement('div');
    glowAura.className = 'hero-glow-aura';
    heroSection.appendChild(glowAura);

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isTracking = false;

    window.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isTracking = true;
    });

    // Reset position if mouse leaves hero section to prevent trailing glow
    heroSection.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    function animateGlow() {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      glowAura.style.transform = `translate3d(${currentX - 150}px, ${currentY - 150}px, 0)`;
      requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
  }
});

