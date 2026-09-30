let products = [];
let activeCategory = "coffee";

const productsGrid = document.querySelector(".catalog_grid");
const tabs = document.querySelectorAll(".tab");

const moreBtn = document.querySelector(".catalog_more");
const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseBtn = document.querySelector(".modal_close_btn");

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
    card.addEventListener("click", openModal);
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

function openModal() {
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
