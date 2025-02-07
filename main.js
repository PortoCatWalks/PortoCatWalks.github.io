import tourStops from './tourStops.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize map
  const mapElement = document.getElementById('tour-map');
  if (mapElement) {
    const map = L.map('tour-map').setView([41.1442, -8.5957], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add markers for tour stops
    tourStops.forEach(stop => {
      const marker = L.marker(stop.coordinates)
        .addTo(map)
        .bindPopup(`
          <h3>${stop.name}</h3>
          <img src="${stop.image}" alt="${stop.name}" style="width:100%;max-width:200px;">
          <p>${stop.description}</p>
        `);
    });
  }

  // Updated tour stop card generation
  const stopsContainer = document.querySelector('.stops-container');
  if (stopsContainer) {
    tourStops.forEach(stop => {
      const stopCard = document.createElement('div');
      stopCard.className = 'stop-card';
      stopCard.innerHTML = `
        <div class="stop-header">
          <img src="${stop.image}" alt="${stop.name}" class="stop-thumbnail">
          <div>
            <h3 class="stop-title">${stop.name}</h3>
            <p class="stop-description">${stop.description.split('.')[0]}.</p>
          </div>
        </div>
        <div class="stop-expanded">
          <img src="${stop.image}" alt="${stop.name}">
          <p>${stop.description}</p>
        </div>
      `;
      
      stopCard.addEventListener('click', () => {
        const expanded = stopCard.querySelector('.stop-expanded');
        expanded.classList.toggle('active');
      });
      
      stopsContainer.appendChild(stopCard);
    });
  }

  // Enhanced Testimonials rotation with dots
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  let currentTestimonial = 0;

  if (testimonials.length && dots.length) {
    function showTestimonial(index) {
      testimonials.forEach(t => t.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      testimonials[index].classList.add('active');
      dots[index].classList.add('active');
      currentTestimonial = index;
    }

    function rotateTestimonials() {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }

    // Initialize testimonials
    showTestimonial(0);
    setInterval(rotateTestimonials, 6000);

    // Add click handlers to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });
  }

  // Mobile Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Add initialization for collapsible sections
  const initializeSections = () => {
    const stopsContent = document.getElementById('stops-content');
    const tourInfoContent = document.getElementById('tour-info-content');
    if (stopsContent) stopsContent.classList.remove('collapsed');
    if (tourInfoContent) tourInfoContent.classList.remove('collapsed');
  };

  initializeSections();

  // Bingo card functionality
  const bingoCard = document.querySelector('.bingo-card');
  const newCardBtn = document.querySelector('.new-card-btn');

  const catTypes = [
    'Orange Cat',
    'Tabby Cat',
    'Kitten',
    'Sleeping Cat',
    'Rooftop Cat',
    'Fat Cat',
    'Grumpy Cat',
    'Calico Cat',
    'Tuxedo Cat',
    'Tortie Cat',
    'Siamese Cat',
    'Black Cat',
    'White Cat',
    'Three-Color Cat',
    'Stretching Cat',
    'Hidden Cat',
    'Friendly Cat',
    'Shy Cat',
    'Playful Cat',
    'Senior Cat',
    'Mother Cat',
    'Window Cat',
    'Garden Cat',
    'Curious Cat',
    'Lounging Cat'
  ];

  if (bingoCard) {
    function generateBingoCard() {
      bingoCard.innerHTML = '';
    
      // Shuffle and take first 25 items for 5x5 grid
      const shuffled = [...catTypes]
        .sort(() => Math.random() - 0.5)
        .slice(0, 25);
    
      shuffled.forEach(cat => {
        const square = document.createElement('div');
        square.className = 'bingo-square';
        square.textContent = cat;
        square.addEventListener('click', () => {
          square.classList.toggle('marked');
          checkForWin();
        });
        bingoCard.appendChild(square);
      });
    }

    function checkForWin() {
      const squares = document.querySelectorAll('.bingo-square');
      const markedSquares = Array.from(squares).map(square => square.classList.contains('marked'));
    
      // Check rows
      for (let i = 0; i < 5; i++) {
        if (markedSquares.slice(i * 5, (i + 1) * 5).every(marked => marked)) {
          alert('BINGO! You won!');
          return;
        }
      }
    
      // Check columns
      for (let i = 0; i < 5; i++) {
        if ([0,1,2,3,4].every(j => markedSquares[i + j * 5])) {
          alert('BINGO! You won!');
          return;
        }
      }
    
      // Check diagonals
      if ([0,6,12,18,24].every(i => markedSquares[i])) {
        alert('BINGO! You won!');
        return;
      }
      if ([4,8,12,16,20].every(i => markedSquares[i])) {
        alert('BINGO! You won!');
        return;
      }
    }

    if (newCardBtn) {
      newCardBtn.addEventListener('click', generateBingoCard);
    }
    generateBingoCard(); // Initial card generation
  }
});

// These need to be global functions since they're called from HTML onclick attributes
window.toggleSection = function(sectionId) {
  const content = document.getElementById(`${sectionId}-content`);
  const icon = document.querySelector(`#${sectionId} .section-toggle`);
  if (content && icon) {
    content.classList.toggle('collapsed');
    icon.classList.toggle('collapsed');
  }
};

window.toggleBingo = function() {
  const content = document.querySelector('.bingo-content');
  const icon = document.querySelector('.toggle-icon');
  if (content && icon) {
    content.classList.toggle('collapsed');
    icon.classList.toggle('collapsed');
  }
};