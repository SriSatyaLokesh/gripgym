// Content Loader — Fetch and render pricing & contact sections from data/content.json

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
    
    // Render pricing section
    renderPricing(data.pricing);
    
    // Render contact section
    renderContact(data.contact);
    
    // Attach form handler
    attachFormHandler();
  } catch (error) {
    console.error('Error loading content:', error);
    document.getElementById('pricing-grid').textContent = 'Error loading pricing data. Please refresh the page.';
    document.getElementById('contact-info').textContent = 'Error loading contact data. Please refresh the page.';
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
