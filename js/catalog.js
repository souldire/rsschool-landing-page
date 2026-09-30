let products = [];
let activeCategory = "coffee";

const productsGrid = document.querySelector(".catalog_grid");
const tabs = document.querySelectorAll(".tab");

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
  });
});

fetchProducts();
