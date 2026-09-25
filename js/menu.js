const mobileMenu = document.querySelector(".mobile-menu");
const menuBtn = document.querySelector(".header_burger_btn");

menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));
