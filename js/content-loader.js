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
    
    // Apply dynamic theme colors if present
    if (data.theme) {
      applyTheme(data.theme);
      console.log('[ContentLoader] Theme colors applied');
    }
    
    // Render Navigation
    renderNavigation(data.navigation);
    console.log('[ContentLoader] Navigation rendered');
    
    // Render Header branding and SEO meta tags
    renderHeader(data.metadata, data.hero ? data.hero.tagline : '', data);
    console.log('[ContentLoader] Header rendered');
    
    // Render Hero section
    renderHero(data.hero);
    console.log('[ContentLoader] Hero rendered');
    
    // Render About section
    renderAbout(data.about);
    console.log('[ContentLoader] About rendered');
    
    // Render Services section
    renderServices(data.services);
    console.log('[ContentLoader] Services rendered');
    
    // Render Start Today section
    renderStartToday(data.start_today);
    console.log('[ContentLoader] Start Today rendered');
    
    // Render Classes section
    renderClasses(data.classes_section);
    console.log('[ContentLoader] Classes rendered');
    
    // Render Schedule section
    renderSchedule(data.schedule_section);
    console.log('[ContentLoader] Schedule rendered');
    
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
    renderFooter(data.footer, data.metadata);
    console.log('[ContentLoader] Footer rendered');
    
    // Attach form handler
    attachFormHandler(data.contact);
    
    // Initialize navigation event listeners
    initNavigationListeners();
    console.log('[ContentLoader] Navigation listeners initialized');
    
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

function applyTheme(themeData) {
  const root = document.documentElement;
  const colorMap = {
    'primary': '--color-primary',
    'primary_dark': '--color-primary-dark',
    'bg_primary': '--color-bg-primary',
    'bg_secondary': '--color-bg-secondary',
    'bg_surface': '--color-bg-surface',
    'text_base': '--color-text-base',
    'text_muted': '--color-text-muted',
    'text_on_accent': '--color-text-on-accent',
    'border': '--color-border',
    'border_light': '--color-border-light'
  };
  
  for (const [key, cssVar] of Object.entries(colorMap)) {
    if (themeData[key]) {
      root.style.setProperty(cssVar, themeData[key]);
    }
  }
}

function renderHeader(metadata, tagline, data) {
  if (!metadata) return;
  
  // Set header logo link
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    const name = metadata.gym_name || "GripGym";
    if (name.toLowerCase().startsWith("grip")) {
      logoLink.innerHTML = 'Grip<span>' + name.substring(4) + '</span>';
    } else {
      logoLink.innerHTML = name;
    }
  }
  
  // Update document title
  if (metadata.gym_name) {
    document.title = metadata.gym_name + (tagline ? " — " + tagline : "");
  }
  
  // Update description meta tag
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${metadata.gym_name} - ${tagline || 'Bhadrachalam premier strength destination.'}`);
  }
  
  // Update keywords meta tag
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords && metadata.keywords) {
    metaKeywords.setAttribute('content', metadata.keywords);
  }
  
  // Update theme-color meta tag
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor && data.theme && data.theme.bg_primary) {
    metaThemeColor.setAttribute('content', data.theme.bg_primary);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', `${metadata.gym_name} - Your Premium Fitness Destination`);
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', `Expert-led fitness classes at ${metadata.gym_name}. Join us today!`);
  
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && metadata.og_image) ogImage.setAttribute('content', metadata.og_image);
  
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl && metadata.og_url) ogUrl.setAttribute('content', metadata.og_url);
  
  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', `${metadata.gym_name} - Your Premium Fitness Destination`);
  
  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', `Expert-led fitness classes at ${metadata.gym_name}. Join us today!`);
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage && metadata.og_image) twitterImage.setAttribute('content', metadata.og_image);
  
  // Update JSON-LD LocalBusiness Schema
  const jsonLdScript = document.querySelector('script[type="application/ld+json"]');
  if (jsonLdScript) {
    try {
      const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": metadata.gym_name || "GripGym",
        "description": `${metadata.gym_name || "GripGym"} - Premium fitness classes including powerlifting, strength training, and conditioning`,
        "url": metadata.og_url || window.location.href,
        "telephone": data.contact ? data.contact.phone : "+91-9876543210",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": metadata.address || "Old Market Road",
          "addressLocality": "Bhadrachalam",
          "addressRegion": "Telangana",
          "postalCode": "507111",
          "addressCountry": "IN"
        },
        "image": metadata.og_image || "https://sristayalokesh.is-a.dev/gripgym/images/hero-image.jpg",
        "priceRange": "$$",
        "areaServed": "Bhadrachalam, Telangana",
        "serviceType": "Fitness Classes, Personal Training, Strength Training"
      };
      jsonLdScript.textContent = JSON.stringify(schema, null, 2);
    } catch (e) {
      console.error('Error updating JSON-LD LocalBusiness Schema:', e);
    }
  }
  
  // Dynamically load Google Analytics if configured
  if (metadata.google_analytics_id && metadata.google_analytics_id !== 'G-XXXXXXXXXX') {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + metadata.google_analytics_id;
    document.head.appendChild(gaScript);
    
    const gaInlineScript = document.createElement('script');
    gaInlineScript.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${metadata.google_analytics_id}');
    `;
    document.head.appendChild(gaInlineScript);
  }
}

function renderHero(heroData) {
  if (!heroData) return;
  
  const tagline = document.getElementById('hero-tagline');
  if (tagline) tagline.textContent = heroData.tagline;
  
  const title = document.getElementById('hero-title');
  if (title) {
    title.innerHTML = (heroData.title_main || "Grip") + '<span>' + (heroData.title_span || "Gym") + '</span>';
  }
  
  const subtitle = document.getElementById('hero-subtitle');
  if (subtitle) subtitle.textContent = heroData.subtitle;
  
  const desc = document.getElementById('hero-desc');
  if (desc) desc.textContent = heroData.description;
  
  const btnGroup = document.getElementById('hero-buttons');
  if (btnGroup) {
    btnGroup.innerHTML = '';
    
    if (heroData.cta_primary_text) {
      const btn1 = document.createElement('a');
      btn1.href = heroData.cta_primary_link || '#pricing';
      btn1.className = 'hero-cta main-btn';
      btn1.textContent = heroData.cta_primary_text;
      btnGroup.appendChild(btn1);
    }
    
    if (heroData.cta_outline_text) {
      const btn2 = document.createElement('a');
      btn2.href = heroData.cta_outline_link || '#classes';
      btn2.className = 'hero-cta outline-btn';
      btn2.textContent = heroData.cta_outline_text;
      btnGroup.appendChild(btn2);
    }
  }
}

function renderAbout(aboutData) {
  const grid = document.getElementById('about-grid');
  if (!grid || !aboutData || !aboutData.cards) return;
  
  grid.innerHTML = '';
  
  aboutData.cards.forEach((card, index) => {
    const box = document.createElement('div');
    box.className = 'box wow bounceInUp';
    if (index > 0) {
      box.setAttribute('data-wow-delay', (index * 0.2) + 's');
    }
    
    const inner = document.createElement('div');
    inner.className = 'inner';
    
    const imgDiv = document.createElement('div');
    imgDiv.className = 'img';
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = card.title;
    imgDiv.appendChild(img);
    
    const textDiv = document.createElement('div');
    textDiv.className = 'text';
    const h4 = document.createElement('h4');
    h4.textContent = card.title;
    const p = document.createElement('p');
    p.textContent = card.text;
    
    textDiv.appendChild(h4);
    textDiv.appendChild(p);
    
    inner.appendChild(imgDiv);
    inner.appendChild(textDiv);
    box.appendChild(inner);
    grid.appendChild(box);
  });
}

function renderServices(servicesData) {
  const textDiv = document.getElementById('services-text');
  const accordionDiv = document.getElementById('services-accordion');
  if (!servicesData) return;
  
  if (textDiv) {
    textDiv.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = servicesData.title || "Services";
    const p = document.createElement('p');
    p.textContent = servicesData.description;
    const a = document.createElement('a');
    a.href = servicesData.cta_link || '#classes';
    a.className = 'btn';
    a.textContent = servicesData.cta_text || 'Start Now';
    
    textDiv.appendChild(h2);
    textDiv.appendChild(p);
    textDiv.appendChild(a);
  }
  
  if (accordionDiv && servicesData.accordion) {
    accordionDiv.innerHTML = '';
    
    servicesData.accordion.forEach((item, index) => {
      const container = document.createElement('div');
      container.className = 'accordian-container';
      if (index === 0) {
        container.classList.add('active');
      }
      
      const head = document.createElement('div');
      head.className = 'head';
      const h4 = document.createElement('h4');
      h4.textContent = item.title;
      const span = document.createElement('span');
      span.className = index === 0 ? 'fa fa-angle-down' : 'fa fa-angle-up';
      
      head.appendChild(h4);
      head.appendChild(span);
      
      const body = document.createElement('div');
      body.className = 'body';
      if (index > 0) {
        body.style.display = 'none';
      }
      const p = document.createElement('p');
      p.textContent = item.description;
      body.appendChild(p);
      
      container.appendChild(head);
      container.appendChild(body);
      accordionDiv.appendChild(container);
      
      // Bind click handler dynamically
      container.addEventListener('click', function() {
        const allContainers = accordionDiv.querySelectorAll('.accordian-container');
        allContainers.forEach(c => {
          if (c !== container) {
            c.classList.remove('active');
            const b = c.querySelector('.body');
            if (b) slideUp(b);
            const s = c.querySelector('.head span');
            if (s) {
              s.className = 'fa fa-angle-up';
            }
          }
        });
        
        const myBody = container.querySelector('.body');
        const mySpan = container.querySelector('.head span');
        if (container.classList.contains('active')) {
          container.classList.remove('active');
          if (myBody) slideUp(myBody);
          if (mySpan) mySpan.className = 'fa fa-angle-up';
        } else {
          container.classList.add('active');
          if (myBody) slideDown(myBody);
          if (mySpan) mySpan.className = 'fa fa-angle-down';
        }
      });
    });
  }
}

function renderStartToday(startTodayData) {
  const container = document.getElementById('start-today-content');
  if (!container || !startTodayData) return;
  
  container.innerHTML = '';
  
  const textDiv = document.createElement('div');
  textDiv.className = 'box text wow slideInLeft';
  
  const h2 = document.createElement('h2');
  h2.textContent = startTodayData.title || "Start Your Training Today";
  
  const p = document.createElement('p');
  p.textContent = startTodayData.description;
  
  const a = document.createElement('a');
  a.href = startTodayData.cta_link || '#contact';
  a.className = 'btn';
  a.textContent = startTodayData.cta_text || 'Start Now';
  
  textDiv.appendChild(h2);
  textDiv.appendChild(p);
  textDiv.appendChild(a);
  
  const imgDiv = document.createElement('div');
  imgDiv.className = 'box img wow slideInRight';
  
  const img = document.createElement('img');
  img.src = startTodayData.image || 'images/gallery4.jpg';
  img.alt = 'start today';
  
  imgDiv.appendChild(img);
  
  container.appendChild(textDiv);
  container.appendChild(imgDiv);
}

function renderClasses(classesData) {
  const header = document.getElementById('classes-header');
  const grid = document.getElementById('classes-grid');
  if (!classesData) return;
  
  if (header) {
    header.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = classesData.title || "Our Classes";
    const p = document.createElement('p');
    p.className = 'section-desc';
    p.textContent = classesData.description;
    header.appendChild(h2);
    header.appendChild(p);
  }
  
  if (grid && classesData.cards) {
    grid.innerHTML = '';
    
    classesData.cards.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'class-card wow fadeInUp';
      card.setAttribute('data-wow-delay', ((index + 1) * 0.1) + 's');
      
      const imgDiv = document.createElement('div');
      imgDiv.className = 'class-card-img';
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title;
      const price = document.createElement('div');
      price.className = 'class-card-price';
      price.textContent = item.price;
      
      imgDiv.appendChild(img);
      imgDiv.appendChild(price);
      
      const bodyDiv = document.createElement('div');
      bodyDiv.className = 'class-card-body';
      const h3 = document.createElement('h3');
      h3.textContent = item.title;
      const coach = document.createElement('p');
      coach.className = 'coach-tag';
      coach.textContent = item.coach;
      const desc = document.createElement('p');
      desc.className = 'class-card-text';
      desc.textContent = item.description;
      const a = document.createElement('a');
      a.href = '#contact';
      a.className = 'class-details-btn';
      a.textContent = 'Get Details';
      
      bodyDiv.appendChild(h3);
      bodyDiv.appendChild(coach);
      bodyDiv.appendChild(desc);
      bodyDiv.appendChild(a);
      
      card.appendChild(imgDiv);
      card.appendChild(bodyDiv);
      grid.appendChild(card);
    });
  }
}

function renderSchedule(scheduleData) {
  const header = document.getElementById('schedule-header');
  const thead = document.getElementById('schedule-table-header');
  const tbody = document.getElementById('schedule-table-body');
  if (!scheduleData) return;
  
  if (header) {
    header.innerHTML = '';
    const h2 = document.createElement('h2');
    h2.textContent = scheduleData.title || "Training Schedule";
    const p = document.createElement('p');
    p.className = 'section-desc';
    p.textContent = scheduleData.description;
    header.appendChild(h2);
    header.appendChild(p);
  }
  
  if (thead) {
    thead.innerHTML = '';
    const tr = document.createElement('tr');
    
    const dayLabel = scheduleData.headers && scheduleData.headers.day ? scheduleData.headers.day : "Day";
    const morningLabel = scheduleData.headers && scheduleData.headers.morning ? scheduleData.headers.morning : "Morning Sessions";
    const eveningLabel = scheduleData.headers && scheduleData.headers.evening ? scheduleData.headers.evening : "Evening Sessions";
    
    const thDay = document.createElement('th');
    thDay.textContent = dayLabel;
    
    const thMorning = document.createElement('th');
    thMorning.textContent = morningLabel;
    
    const thEvening = document.createElement('th');
    thEvening.textContent = eveningLabel;
    
    tr.appendChild(thDay);
    tr.appendChild(thMorning);
    tr.appendChild(thEvening);
    thead.appendChild(tr);
  }
  
  if (tbody && scheduleData.days) {
    tbody.innerHTML = '';
    
    scheduleData.days.forEach(dayInfo => {
      const tr = document.createElement('tr');
      const dayCol = document.createElement('td');
      dayCol.className = 'day-col';
      dayCol.textContent = dayInfo.day;
      tr.appendChild(dayCol);
      
      if (dayInfo.holiday) {
        const holidayCol = document.createElement('td');
        holidayCol.colSpan = 2;
        holidayCol.className = 'holiday-col';
        const badge = document.createElement('span');
        badge.className = 'holiday-badge';
        badge.textContent = dayInfo.holiday_label || "HOLIDAY - GYM CLOSED";
        holidayCol.appendChild(badge);
        tr.appendChild(holidayCol);
      } else {
        // Morning slots
        const morningCol = document.createElement('td');
        if (dayInfo.morning) {
          dayInfo.morning.forEach(slot => {
            const span = document.createElement('span');
            span.className = 'slot ' + (slot.type === 'women' ? 'women-slot' : 'men-slot');
            span.innerHTML = '<strong>' + slot.time + '</strong><br>' + slot.text;
            morningCol.appendChild(span);
          });
        }
        tr.appendChild(morningCol);
        
        // Evening slots
        const eveningCol = document.createElement('td');
        if (dayInfo.evening) {
          dayInfo.evening.forEach(slot => {
            const span = document.createElement('span');
            span.className = 'slot ' + (slot.type === 'women' ? 'women-slot' : 'men-slot');
            span.innerHTML = '<strong>' + slot.time + '</strong><br>' + slot.text;
            eveningCol.appendChild(span);
          });
        }
        tr.appendChild(eveningCol);
      }
      
      tbody.appendChild(tr);
    });
  }
}

function renderPricing(pricingData) {
  // Update pricing section title
  const title = document.getElementById('pricing-title');
  if (title) {
    title.textContent = pricingData.title || "Membership Plans";
  }

  const intro = document.querySelector('.intro-text');
  if (intro) {
    intro.textContent = pricingData.intro;
  }
  
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  pricingData.tiers.forEach((tier, index) => {
    const card = document.createElement('div');
    card.className = 'pricing-card';
    if (tier.id === 'elite' || tier.id === 'annual') {
      card.classList.add('featured');
    }
    
    const priceText = document.createElement('div');
    priceText.className = 'price';
    priceText.textContent = '₹' + tier.price.toLocaleString('en-IN');
    
    const duration = document.createElement('div');
    duration.className = 'duration';
    duration.textContent = tier.duration;
    
    const name = document.createElement('h3');
    name.textContent = tier.name;
    
    if (tier.discount_label) {
      const discount = document.createElement('div');
      discount.className = 'discount-label';
      discount.textContent = tier.discount_label;
      card.appendChild(discount);
    }
    
    const features = document.createElement('ul');
    features.className = 'features';
    tier.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      features.appendChild(li);
    });
    
    const button = document.createElement('button');
    button.className = 'select-plan-btn';
    button.textContent = tier.cta_text || 'Select Plan';
    button.onclick = function() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    card.appendChild(name);
    card.appendChild(priceText);
    card.appendChild(duration);
    card.appendChild(features);
    card.appendChild(button);
    
    grid.appendChild(card);
  });
}

function renderGallery(galleryData) {
  // Update gallery title and intro
  const title = document.getElementById('gallery-title');
  if (title && galleryData.title) {
    title.textContent = galleryData.title;
  }
  
  const intro = document.getElementById('gallery-intro');
  if (intro && galleryData.intro) {
    intro.textContent = galleryData.intro;
  }

  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  if (!galleryData.images || galleryData.images.length === 0) return;
  
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
  });
}

function renderContact(contactData) {
  // Update contact section title
  const title = document.getElementById('contact-title');
  if (title) {
    title.textContent = contactData.title || "Get In Touch";
  }

  const contactInfo = document.getElementById('contact-info');
  if (!contactInfo) return;
  
  contactInfo.innerHTML = '';
  
  const phone = document.createElement('div');
  phone.className = 'contact-item';
  const phoneLabel = document.createElement('strong');
  phoneLabel.textContent = 'Phone:';
  const phoneValue = document.createElement('p');
  phoneValue.textContent = contactData.phone;
  phone.appendChild(phoneLabel);
  phone.appendChild(phoneValue);
  
  const email = document.createElement('div');
  email.className = 'contact-item';
  const emailLabel = document.createElement('strong');
  emailLabel.textContent = 'Email:';
  const emailValue = document.createElement('p');
  emailValue.textContent = contactData.email;
  email.appendChild(emailLabel);
  email.appendChild(emailValue);
  
  const address = document.createElement('div');
  address.className = 'contact-item';
  const addressLabel = document.createElement('strong');
  addressLabel.textContent = 'Address:';
  const addressValue = document.createElement('p');
  addressValue.textContent = contactData.address;
  address.appendChild(addressLabel);
  address.appendChild(addressValue);
  
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
  
  // Populate form placeholders dynamically
  const form = document.getElementById('contact-form');
  if (form && contactData.form) {
    const nameInput = form.querySelector('input[name="name"]');
    if (nameInput) nameInput.placeholder = contactData.form.name_placeholder || "Your Name";
    
    const emailInput = form.querySelector('input[name="email"]');
    if (emailInput) emailInput.placeholder = contactData.form.email_placeholder || "Your Email";
    
    const messageInput = form.querySelector('textarea[name="message"]');
    if (messageInput) messageInput.placeholder = contactData.form.message_placeholder || "Your Message";
    
    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn) submitBtn.textContent = contactData.form.submit_button_text || "Send Message";
  }
}

function renderFooter(footerData, metadata) {
  const footerBranding = document.getElementById('footer-branding');
  if (footerBranding) {
    footerBranding.innerHTML = '';
    const h3 = document.createElement('h3');
    const name = footerData.company_name || metadata.gym_name || "GripGym";
    if (name.toLowerCase().startsWith("grip")) {
      h3.innerHTML = 'Grip<span>' + name.substring(4) + '</span>';
    } else {
      h3.innerHTML = name;
    }
    const taglineP = document.createElement('p');
    taglineP.className = 'footer-tagline';
    taglineP.textContent = footerData.tagline;
    footerBranding.appendChild(h3);
    footerBranding.appendChild(taglineP);
  }

  // Set location header
  const footerHeaderLoc = document.getElementById('footer-header-location');
  if (footerHeaderLoc && footerData.headers && footerData.headers.location) {
    footerHeaderLoc.textContent = footerData.headers.location;
  } else if (footerHeaderLoc) {
    footerHeaderLoc.textContent = "Location";
  }

  // Update footer location address
  const footerLoc = document.getElementById('footer-location');
  if (footerLoc) {
    footerLoc.innerHTML = (footerData.address || metadata.address || "Old Market Road<br>Bhadrachalam, Telangana 507111<br>India").replace(/\n/g, '<br>');
  }

  // Set Contact header
  const footerHeaderContact = document.getElementById('footer-header-contact');
  if (footerHeaderContact && footerData.headers && footerData.headers.contact) {
    footerHeaderContact.textContent = footerData.headers.contact;
  } else if (footerHeaderContact) {
    footerHeaderContact.textContent = "Contact";
  }

  // Set phone/email labels
  const footerLabelPhone = document.getElementById('footer-label-phone');
  if (footerLabelPhone) {
    footerLabelPhone.textContent = footerData.labels && footerData.labels.phone ? footerData.labels.phone : "Phone:";
  }
  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.textContent = footerData.phone;
  }
  
  const footerLabelEmail = document.getElementById('footer-label-email');
  if (footerLabelEmail) {
    footerLabelEmail.textContent = footerData.labels && footerData.labels.email ? footerData.labels.email : "Email:";
  }
  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) {
    footerEmail.textContent = footerData.email;
  }
  
  // Set Hours header
  const footerHeaderHours = document.getElementById('footer-header-hours');
  if (footerHeaderHours && footerData.headers && footerData.headers.hours) {
    footerHeaderHours.textContent = footerData.headers.hours;
  } else if (footerHeaderHours) {
    footerHeaderHours.textContent = "Hours";
  }

  const footerHours = document.getElementById('footer-hours');
  if (footerHours) {
    footerHours.innerHTML = '';
    const weekdaysP = document.createElement('p');
    const weekdaysLabel = footerData.labels && footerData.labels.weekdays ? footerData.labels.weekdays : "Weekdays:";
    weekdaysP.innerHTML = '<strong>' + weekdaysLabel + '</strong> ' + footerData.hours.weekdays;
    const weekendP = document.createElement('p');
    const weekendsLabel = footerData.labels && footerData.labels.weekends ? footerData.labels.weekends : "Weekends:";
    weekendP.innerHTML = '<strong>' + weekendsLabel + '</strong> ' + footerData.hours.weekends;
    footerHours.appendChild(weekdaysP);
    footerHours.appendChild(weekendP);
  }
  
  // Set Follow Us header
  const footerHeaderSocial = document.getElementById('footer-header-social');
  if (footerHeaderSocial && footerData.headers && footerData.headers.follow_us) {
    footerHeaderSocial.textContent = footerData.headers.follow_us;
  } else if (footerHeaderSocial) {
    footerHeaderSocial.textContent = "Follow Us";
  }

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
  
  // Set bottom footer gym name
  const footerGymName = document.getElementById('footer-gym-name');
  if (footerGymName) {
    footerGymName.textContent = metadata.gym_name || "GripGym";
  }
  
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) {
    footerCopyright.textContent = footerData.copyright_text || "All rights reserved.";
  }
}

function attachFormHandler(contactData) {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  // Clean up any existing listeners by cloning form
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);
  
  newForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = newForm.querySelector('input[name="name"]').value;
    const msgDiv = document.getElementById('form-message');
    
    let successPattern = 'Thank you {name}! Your message has been sent. We will contact you shortly.';
    if (contactData && contactData.form && contactData.form.success_message) {
      successPattern = contactData.form.success_message;
    }
    
    msgDiv.textContent = successPattern.replace('{name}', name);
    msgDiv.className = 'success';
    msgDiv.style.display = 'block';
    
    newForm.reset();
    
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

// Helper Functions for Accordion and Navigation Transitions (Vanilla JS counterparts of jQuery slideUp/slideDown)
function slideUp(element, duration = 300) {
  element.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
  element.style.boxSizing = 'border-box';
  element.style.height = element.offsetHeight + 'px';
  element.offsetHeight; // force repaint
  element.style.overflow = 'hidden';
  element.style.height = '0';
  element.style.paddingTop = '0';
  element.style.paddingBottom = '0';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';
  
  window.setTimeout(() => {
    element.style.display = 'none';
    element.style.removeProperty('height');
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition');
  }, duration);
}

function slideDown(element, duration = 300) {
  element.style.removeProperty('display');
  let display = window.getComputedStyle(element).display;
  if (display === 'none') display = 'block';
  element.style.display = display;
  
  let height = element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = '0';
  element.style.paddingTop = '0';
  element.style.paddingBottom = '0';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';
  element.offsetHeight; // force repaint
  
  element.style.transition = `height ${duration}ms ease, padding ${duration}ms ease, margin ${duration}ms ease`;
  element.style.height = height + 'px';
  element.style.removeProperty('padding-top');
  element.style.removeProperty('padding-bottom');
  element.style.removeProperty('margin-top');
  element.style.removeProperty('margin-bottom');
  
  window.setTimeout(() => {
    element.style.removeProperty('height');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition');
  }, duration);
}

function renderNavigation(navData) {
  const navUl = document.querySelector('.nav ul');
  if (!navUl || !navData) return;
  navUl.innerHTML = '';
  
  navData.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.link;
    a.textContent = item.label;
    li.appendChild(a);
    navUl.appendChild(li);
  });
}

function initNavigationListeners() {
  // Mobile ham-burger toggler
  const hamBurger = document.querySelector('.ham-burger');
  const nav = document.querySelector('.nav');
  
  if (hamBurger && nav) {
    // Clear old event listener to prevent duplicates
    const newHamBurger = hamBurger.cloneNode(true);
    hamBurger.parentNode.replaceChild(newHamBurger, hamBurger);
    
    newHamBurger.addEventListener('click', function(e) {
      nav.classList.toggle('open');
      newHamBurger.classList.toggle('active');
      e.stopPropagation();
    });
    
    // Close nav on clicking a link
    nav.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link) {
        nav.classList.remove('open');
        newHamBurger.classList.remove('active');
      }
    });
  }
  
  // Smooth scroll links delegation
  document.addEventListener('click', function(e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Update active class on nav links
        const navLinks = document.querySelectorAll('.nav ul li a');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        
        // Update hash
        window.history.pushState(null, null, targetId);
      }
    }
  });
}
