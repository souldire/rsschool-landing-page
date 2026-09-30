let products = [];
let activeCategory = "coffee";

const productsGrid = document.querySelector(".catalog_grid");
const tabs = document.querySelectorAll(".tab");

const moreBtn = document.querySelector(".catalog_more");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseBtn = document.querySelector(".modal_close_btn");
const modalImg = document.querySelector(".modal_img");
const modalName = document.querySelector(".modal_name");
const modalText = document.querySelector(".modal_text");
const modalSizes = document.querySelector(".modal_sizes");
const modalAdditives = document.querySelector(".modal_additives");
const modalTotalPrice = document.querySelector(".modal_total_price");

function renderCards() {
  productsGrid.innerHTML = "";
  const filtered = products.filter(
    (product) => product.category === activeCategory,
  );

  let number = 1;
  for (const product of filtered) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <img
        class="card_img"
        src="assets/menu/${activeCategory}-${number}.png"
        alt="${product.name}"
      />
      <h2 class="card_name">${product.name}</h2>
      <p class="card_text">${product.description}</p>
      <p class="card_price">$${product.price}</p>
    `;

    card.style.animationDelay = (number - 1) * 0.1 + "s";
    const cardNumber = number;
    card.addEventListener("click", () => openModal(product, cardNumber));
    productsGrid.append(card);

    number = number + 1;
  }
}

async function fetchProducts() {
  try {
    const response = await fetch("data/products.json");

    console.log(response);

    products = await response.json();

    console.log(products);

    renderCards();
  } catch (error) {
    console.log("Ошибка при загрузке товаров - ", error);
  }
}

function resetMoreButton() {
  moreBtn.classList.remove("hidden");
  productsGrid.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("show-all");
  });
}

function renderModal(product, cardNumber) {
  modalImg.src = `assets/menu/${product.category}-${cardNumber}.png`;
  modalImg.alt = product.name;
  modalName.textContent = product.name;
  modalText.textContent = product.description;

  modalSizes.innerHTML = "";
  const sizeKeys = Object.keys(product.sizes);

  sizeKeys.forEach((key, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "modal_pill";
    if (index === 0) {
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-pressed", "false");
    }
    button.innerHTML = `
      <span class="modal_pill_icon">${key.toUpperCase()}</span>
      <span>${product.sizes[key].size}</span>
    `;
    modalSizes.append(button);
  });

  modalAdditives.innerHTML = "";
  product.additives.forEach((additive, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "modal_pill";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `
      <span class="modal_pill_icon">${index + 1}</span>
      <span>${additive.name}</span>
    `;
    modalAdditives.append(button);
  });

  modalTotalPrice.textContent = `$${product.price}`;
}

function openModal(product, cardNumber) {
  renderModal(product, cardNumber);
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeCategory = tab.dataset.category;

    tabs.forEach((t) => {
      if (t === tab) {
        t.setAttribute("aria-pressed", "true");
      } else {
        t.setAttribute("aria-pressed", "false");
      }
    });

    renderCards();
    resetMoreButton();
  });
});

moreBtn.addEventListener("click", () => {
  const cards = productsGrid.querySelectorAll(".card");

  cards.forEach((card, index) => {
    if (index >= 4) {
      card.classList.add("show-all");
    }
  });

  moreBtn.classList.add("hidden");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    resetMoreButton();
  }
});

modalCloseBtn.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

fetchProducts();
