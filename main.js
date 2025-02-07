import tourStops from './tourStops.js';

// Initialize map
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

// Generate tour stop cards
const stopsContainer = document.querySelector('.stops-container');
tourStops.forEach(stop => {
  const stopCard = document.createElement('div');
  stopCard.className = 'stop-card';
  stopCard.innerHTML = `
    <h3>${stop.name}</h3>
    <img src="${stop.image}" alt="${stop.name}" style="width:100%;max-width:400px;">
    <p>${stop.description}</p>
  `;
  stopsContainer.appendChild(stopCard);
});

// Testimonials rotation
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function rotateTestimonials() {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[currentTestimonial].classList.add('active');
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(rotateTestimonials, 5000);

// Bingo card functionality
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
  'Hidden Cat'
];

function generateBingoCard() {
  const card = document.querySelector('.bingo-card');
  card.innerHTML = '';
  
  // Shuffle and take first 16 items for 4x4 grid
  const shuffled = [...catTypes]
    .sort(() => Math.random() - 0.5)
    .slice(0, 16);
  
  shuffled.forEach(cat => {
    const square = document.createElement('div');
    square.className = 'bingo-square';
    square.textContent = cat;
    square.addEventListener('click', () => {
      square.classList.toggle('marked');
      checkForWin();
    });
    card.appendChild(square);
  });
}

function checkForWin() {
  const squares = document.querySelectorAll('.bingo-square');
  const markedSquares = Array.from(squares).map(square => square.classList.contains('marked'));
  
  // Check rows
  for (let i = 0; i < 4; i++) {
    if (markedSquares.slice(i * 4, (i + 1) * 4).every(marked => marked)) {
      alert('BINGO! You won!');
      return;
    }
  }
  
  // Check columns
  for (let i = 0; i < 4; i++) {
    if ([0,1,2,3].every(j => markedSquares[i + j * 4])) {
      alert('BINGO! You won!');
      return;
    }
  }
  
  // Check diagonals
  if ([0,5,10,15].every(i => markedSquares[i])) {
    alert('BINGO! You won!');
    return;
  }
  if ([3,6,9,12].every(i => markedSquares[i])) {
    alert('BINGO! You won!');
    return;
  }
}

document.querySelector('.new-card-btn').addEventListener('click', generateBingoCard);
generateBingoCard(); // Initial card generation