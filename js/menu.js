const mobileMenu = document.querySelector(".mobile-menu");
const menuBtn = document.querySelector(".header_burger_btn");
const menuLinks = mobileMenu.querySelectorAll("a");

function openMenu() {
  mobileMenu.classList.add("open");
  menuBtn.classList.add("open");
  menuBtn.setAttribute("aria-label", "Close menu");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  menuBtn.classList.remove("open");
  menuBtn.setAttribute("aria-label", "Open menu");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () => {
  if (mobileMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
