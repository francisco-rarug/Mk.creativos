const products = [
  {
    id: 1,
    name: "🎵 Cuadro Spotify Personalizado",
    description: "Tu canción favorita convertida en un recuerdo único y decorativo, totalmente personalizado",
    price: "$22.500",
    image: "recursos/Cuadro.jpeg",
    category: "cuadros",
  },
  {
    id: 2,
    name: "📔 Agenda Personalizada",
    description: "Organizá tus días con estilo. Diseñada a tu gusto, ideal para planificar, anotar y acompañarte todo el año.",
    price: "$15.000",
    image: "recursos/Agenda1.jpeg",
    category: "agendas",
  },
  {
    id: 3,
    name: "✨ Plancha de 20 Stickers Personalizados",
    description: "Diseños únicos hechos a tu medida, ideales para decorar, regalar o darle tu estilo a todo.",
    price: "$4.500",
    image: "recursos/Stickert1.jpeg",
    category: "stickerts",
  },
  {
    id: 4,
    name: "📘 Álbum de Figuritas Personalizado (32 figuritas)",
    description: "Un recuerdo único y divertido, creado a tu medida con 32 figuritas personalizadas para coleccionar y compartir.",
    price: "$15.000",
    image: "recursos/AlbumFigu2.jpeg",
    category: "otros",
  },
  {
    id: 5,
    name: "🔑 Llaveros Personalizados",
    description: "Un detalle práctico y único, diseñado a tu gusto para llevar tu estilo a todos lados.",
    price: "$2.500",
    image: "recursos/Llavero3.jpeg",
    category: "otros",
  },
  {
    id: 6,
    name: "📸 Polaroids Personalizadas (10 unidades)",
    description: "Tus mejores recuerdos impresos con estilo retro, ideales para regalar, decorar o atesorar.",
    price: "$6.000",
    image: "recursos/Polaroid.jpeg",
    category: "otros",
  },
  {
    id: 7,
    name: "🗓️ Calendario Personalizado",
    description: "Organizá tu año con tus fotos y diseño favorito, uniendo funcionalidad y recuerdos en un solo producto.",
    price: "$1.500",
    image: "recursos/Calendarios.jpeg",
    category: "otros",
  },
  {
    id: 8,
    name: "🃏 Juego de UNO Personalizado",
    description: "El clásico de cartas con tu propio diseño, ideal para regalar y disfrutar momentos únicos en cada partida.",
    price: "$12.000",
    image: "recursos/Uno.jpeg",
    category: "otros",
  },
  {
    id: 9,
    name: "💞 Llaveros para Compartir",
    description: "Un detalle especial en partes que se complementan, ideal para simbolizar vínculos y llevar siempre cerca a esa persona.",
    price: "$6.000",
    image: "recursos/Llavero1.jpeg",
    category: "otros",
  },
  {
    id: 10,
    name: "💧 Stickers para Termo de vinilo (20 unidades)",
    description: "Stickers personalizados y resistentes al agua, ideales para decorar tu termo y acompañarte en el día a día.",
    price: "$7.000",
    image: "recursos/StickertTermo.jpeg",
    category: "stickerts",
  },
  {
    id: 11,
    name: "📒 Cuadernos Personalizados",
    description: "Diseñados a tu gusto, ideales para escribir, estudiar o regalar con un estilo único.",
    price: "$5.000",
    image: "recursos/Cuaderno1.jpeg",
    category: "agendas",
  },
  {
    id: 12,
    name: "📖 Álbum de Fotos Personalizado",
    description: "Un espacio único para guardar y revivir tus mejores recuerdos, diseñado especialmente para vos.",
    price: "$20.000",
    image: "recursos/Album Fotos.jpeg",
    category: "otros",
  },
  {
    id: 13,
    name: "🗒️ Agendas de Anime",
    description: "Organizá tu día a día con tus personajes favoritos, combinando estilo, color y pasión por el anime.",
    price: "$15.000",
    image: "recursos/Agenda2.jpeg",
    category: "agendas",
  },
  {
    id: 14,
    name: "💧 Stickers Resistentes al Agua (20 unidades)",
    description: "Diseños durables y personalizados, ideales para termos, botellas y superficies que acompañan tu día a día",
    price: "$6.000",
    image: "recursos/Stickert2.jpeg",
    category: "stickerts",
  },
  {
    id: 15,
    name: "🖼️🔑 Cuadro + Llavero Personalizados",
    description: "El combo ideal para regalar: un diseño único para decorar y un llavero a juego para llevar siempre con vos",
    price: "$25.000",
    image: "recursos/Cuadro2.jpeg",
    category: "cuadros",
  },
  {
    id: 16,
    name: "✏️🎒 Stickers para Útiles Escolares",
    description: "Stickers personalizados ideales para identificar y decorar cuadernos, carpetas y útiles con estilo propio.",
    price: "$3.000",
    image: "recursos/StickertsEscolares.jpeg",
    category: "stickerts",
  },
  {
    id: "box-san-valentin",
    name: "🎁 Box San Valentín",
    description: "Un box especial con productos personalizados, pensado para sorprender.",
    price: "$30.000",
    image: "recursos/Box-SanValentin.jpeg",
    category: "box",
    isBox: true,
    video: "recursos/Video-BoxSanValentin.mp4",
    longDescription: `
Este Box San Valentín fue creado para expresar amor de una manera única y especial.
Incluye productos personalizados cuidadosamente seleccionados para transmitir emociones.
`
  },
];

const productsContainer = document.getElementById("products");
const categoryButtons = document.querySelectorAll(".category");
const loadMoreBtn = document.getElementById("loadMore");

let currentCategory = "todos";
let showingAll = false;

const DESKTOP_LIMIT = 8;
const MOBILE_LIMIT = 4;

function getLimit() {
  return window.innerWidth <= 768 ? MOBILE_LIMIT : DESKTOP_LIMIT;
}

function createCard(product) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy">
    <div class="card-content">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price}</div>

      ${
        product.isBox
          ? `<button class="box-btn" data-box='${JSON.stringify(product)}'>Ver Box</button>`
          : ""
      }
    </div>
  `;

  productsContainer.appendChild(card);
}

function renderProducts(category) {
  productsContainer.innerHTML = "";
  currentCategory = category;
  showingAll = false;

  const limit = getLimit();

  const filtered =
    category === "todos"
      ? products
      : products.filter(p => p.category === category);

  filtered.slice(0, limit).forEach((p, i) => createCard(p, i * 80));

  if (filtered.length > limit) {
    loadMoreBtn.textContent = "Ver más";
    loadMoreBtn.style.display = "inline-block";
  } else {
    loadMoreBtn.style.display = "none";
  }
}

loadMoreBtn.addEventListener("click", () => {
  productsContainer.innerHTML = "";

  const filtered =
    currentCategory === "todos"
      ? products
      : products.filter(p => p.category === currentCategory);

  if (!showingAll) {
    filtered.forEach((p, i) => createCard(p, i * 60));
    loadMoreBtn.textContent = "Ver menos";
    showingAll = true;
  } else {
    renderProducts(currentCategory);
  }
});

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
  const category = btn.dataset.category;

  localStorage.setItem("activeCategory", category);

  categoryButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(category);
});
});

const originalTitle = "mk.creativos";

const idleMessages = [
  "¿estás ahí?",
  "volvé 👀",
  "te estamos esperando",
  "hey 👋"
];

const INACTIVITY_TIME = 5000;
const ANIMATION_SPEED = 500;

let inactivityTimer;
let animationTimer;
let messageIndex = 0;
let dots = 0;

function startIdleAnimation() {
  clearInterval(animationTimer);

  animationTimer = setInterval(() => {
    dots = (dots + 1) % 4;
    document.title = `${idleMessages[messageIndex]}${".".repeat(dots)}`;

    if (dots === 0) {
      messageIndex = (messageIndex + 1) % idleMessages.length;
    }
  }, ANIMATION_SPEED);
}

function resetTitleAndTimers() {
  document.title = originalTitle;
  clearTimeout(inactivityTimer);
  clearInterval(animationTimer);
  inactivityTimer = setTimeout(startIdleAnimation, INACTIVITY_TIME);
}

["mousemove", "keydown", "scroll", "click", "touchstart"].forEach(event =>
  window.addEventListener(event, resetTitleAndTimers)
);

resetTitleAndTimers();

const savedCategory = localStorage.getItem("activeCategory") || "todos";

categoryButtons.forEach(btn => {
  btn.classList.toggle(
    "active",
    btn.dataset.category === savedCategory
  );
});

renderProducts(savedCategory);

let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    renderProducts(currentCategory);
  }, 300);
});

productsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".box-btn");
  if (!btn) return;

  const boxData = JSON.parse(btn.dataset.box);
  localStorage.setItem("selectedBox", JSON.stringify(boxData));
  window.location.href = "box.html";
});