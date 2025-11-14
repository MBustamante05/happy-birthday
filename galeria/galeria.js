// Aquí puedes añadir las URLs de tus fotos
const photos = [
  { caption: "Meras risas 💫", image: "../images/recuerdo1.jpeg"},
  { caption: "Meros recuerdos ✨", image: "../images/recuerdo2.jpeg"},
  { caption: "Que falla 😄", image: "../images/recuerdo3.jpeg"},
  { caption: "Que te hayas 🌟", image: "../images/recuerdo4.jpeg"},
  { caption: "Fuyido 💕", image: "../images/recuerdo5.jpeg"},
];

let currentIndex = 0;

function createPhotoCards() {
  const carousel = document.getElementById("carousel");
  const indicators = document.getElementById("indicators");

  photos.forEach((photo, index) => {
    // Crear tarjeta
    const card = document.createElement("div");
    card.className = "photo-card";
    card.innerHTML = `
                    <div class="photo-wrapper">
                        <img src="${photo.image}" alt="Photo ${index + 1}" class="photo-image" />
                    </div>
                    <div class="photo-caption">${photo.caption}</div>
                `;
    carousel.appendChild(card);

    // Crear indicador
    const indicator = document.createElement("div");
    indicator.className = "indicator" + (index === 0 ? " active" : "");
    indicator.onclick = () => goToPhoto(index);
    indicators.appendChild(indicator);
  });

  updateCarousel();
}

function updateCarousel() {
  const cards = document.querySelectorAll(".photo-card");
  const indicators = document.querySelectorAll(".indicator");
  const totalCards = cards.length;

  cards.forEach((card, index) => {
    let position = index - currentIndex;

    // Normalizar la posición para efecto circular
    if (position < -2) position += totalCards;
    if (position > 2) position -= totalCards;

    let transform = "";
    let zIndex = 0;
    let opacity = 0;

    if (position === 0) {
      // Tarjeta central
      transform = "translateX(0) translateZ(0) rotateY(0deg) scale(1)";
      zIndex = 5;
      opacity = 1;
    } else if (position === 1) {
      // Derecha
      transform =
        "translateX(320px) translateZ(-100px) rotateY(-25deg) scale(0.85)";
      zIndex = 4;
      opacity = 0.7;
    } else if (position === -1) {
      // Izquierda
      transform =
        "translateX(-320px) translateZ(-100px) rotateY(25deg) scale(0.85)";
      zIndex = 4;
      opacity = 0.7;
    } else if (position === 2) {
      // Extremo derecho
      transform =
        "translateX(640px) translateZ(-200px) rotateY(-35deg) scale(0.7)";
      zIndex = 3;
      opacity = 0.4;
    } else if (position === -2) {
      // Extremo izquierdo
      transform =
        "translateX(-640px) translateZ(-200px) rotateY(35deg) scale(0.7)";
      zIndex = 3;
      opacity = 0.4;
    }

    card.style.transform = transform;
    card.style.zIndex = zIndex;
    card.style.opacity = opacity;
    card.style.pointerEvents = position === 0 ? "auto" : "none";
  });

  // Actualizar indicadores
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

function nextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  updateCarousel();
}

function prevPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  updateCarousel();
}

function goToPhoto(index) {
  currentIndex = index;
  updateCarousel();
}

// Soporte para teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

// Soporte para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) nextPhoto();
  if (touchEndX > touchStartX + 50) prevPhoto();
}

// Inicializar
createPhotoCards();
