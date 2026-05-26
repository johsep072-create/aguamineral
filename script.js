const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

reveals.forEach(section => observer.observe(section));

const yearEl = document.querySelector('#current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const productCards = document.querySelectorAll('.product-card');
const productTitle = document.querySelector('.product-info-title');
const productText = document.querySelector('.product-info-text');
const productList = document.querySelector('.product-info-list');
const productExtra = document.querySelector('.product-info-extra');

if (productCards.length && productTitle && productText && productList && productExtra) {
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      productCards.forEach(item => item.classList.remove('active'));
      card.classList.add('active');

      const title = card.dataset.title;
      const description = card.dataset.description;
      const highlights = card.dataset.highlights;
      const volume = card.dataset.volume;

      productTitle.textContent = title;
      productText.textContent = description;
      productList.innerHTML = `
        <li><strong>Capacidad:</strong> ${volume}</li>
        <li><strong>Uso:</strong> ${highlights}</li>
        <li><strong>Beneficio:</strong> Hidratación accesible para todos</li>
      `;
      productExtra.textContent = 'Toca otra presentación para ver más detalles.';
    });
  });
}

const bubbles = document.querySelector('.body-bubbles');
if (bubbles) {
  for (let i = 0; i < 6; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.left = `${Math.random() * 90}%`;
    bubble.style.top = `${Math.random() * 85}%`;
    bubble.style.width = `${12 + Math.random() * 40}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.animationDuration = `${10 + Math.random() * 16}s`;
    bubble.style.opacity = `${0.3 + Math.random() * 0.5}`;
    bubbles.appendChild(bubble);
  }
}

// Floating badges (Mineral Natural / PH equilibrado) interactivity
const floatingOptions = document.querySelectorAll('.floating-option');
let activeTooltip = null;

function removeTooltip() {
  if (activeTooltip && activeTooltip.parentNode) {
    activeTooltip.parentNode.removeChild(activeTooltip);
    activeTooltip = null;
  }
}

function showTooltipFor(button) {
  removeTooltip();
  const text = button.dataset.info || button.textContent;
  const rect = button.getBoundingClientRect();
  const tooltip = document.createElement('div');
  tooltip.className = 'floating-tooltip';
  tooltip.textContent = text;

  // Basic positioning: place above the button if enough space, otherwise below
  const padding = 8;
  const left = Math.min(window.innerWidth - 20 - 260, rect.left + window.scrollX);
  let top = rect.top + window.scrollY - 8 - 44; // try above
  if (top < window.scrollY + 10) {
    top = rect.bottom + window.scrollY + 8; // place below
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;

  document.body.appendChild(tooltip);
  activeTooltip = tooltip;

  // Remove after 4 seconds
  setTimeout(removeTooltip, 4000);
}

if (floatingOptions && floatingOptions.length) {
  floatingOptions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      showTooltipFor(btn);
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTooltipFor(btn);
      }
    });
  });

  // dismiss tooltip on global click
  document.addEventListener('click', removeTooltip);
}
