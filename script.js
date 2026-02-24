let products = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

async function loadProducts() {
  try {
    const response = await fetch("data/productos.json");
    const data = await response.json();

    products = data.products;

    const savedCategory = localStorage.getItem("activeCategory") || "todos";
    renderProducts(savedCategory);

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

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

      ${product.isBox
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

let lastIsMobile = window.innerWidth <= 768;

window.addEventListener("resize", () => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile === lastIsMobile) return;

  lastIsMobile = isMobile;

  if (showingAll) return;

  renderProducts(currentCategory);
});

productsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".box-btn");
  if (!btn) return;

  const boxData = JSON.parse(btn.dataset.box);
  localStorage.setItem("selectedBox", JSON.stringify(boxData));
  window.location.href = "box.html";
});


document.title = `${box.name} | mk.creativos`;

const metaDescription =
  document.querySelector("meta[name='description']") ||
  document.createElement("meta");

metaDescription.name = "description";
metaDescription.content = box.description;
document.head.appendChild(metaDescription);

const ogTitle = document.createElement("meta");
ogTitle.setAttribute("property", "og:title");
ogTitle.content = box.name;

const ogDesc = document.createElement("meta");
ogDesc.setAttribute("property", "og:description");
ogDesc.content = box.description;

const ogImage = document.createElement("meta");
ogImage.setAttribute("property", "og:image");
ogImage.content = box.image;

document.head.append(ogTitle, ogDesc, ogImage);