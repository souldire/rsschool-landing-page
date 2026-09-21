const lightBtn = document.querySelector(".light_theme_btn");
const darkBtn = document.querySelector(".dark_theme_btn");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  if (theme === "dark") {
    lightBtn.setAttribute("aria-checked", "false");
    darkBtn.setAttribute("aria-checked", "true");
  } else {
    lightBtn.setAttribute("aria-checked", "true");
    darkBtn.setAttribute("aria-checked", "false");
  }
}

lightBtn.addEventListener("click", function () {
  setTheme("light");
});

darkBtn.addEventListener("click", function () {
  setTheme("dark");
});

setTheme(document.documentElement.dataset.theme);
