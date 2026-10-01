const slider = document.querySelector(".slider");
const track = slider.querySelector(".slider_track");
const prevBtn = slider.querySelector(".slider_arrow-prev");
const nextBtn = slider.querySelector(".slider_arrow-next");
const controls = slider.querySelectorAll(".slider_control");

const count = controls.length;
let index = 0;

function update() {
  track.style.transform = `translateX(-${index * 100}%)`;

  controls.forEach((control, i) => {
    control.classList.toggle("slider_control-active", i === index);
  });
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % count;
  update();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + count) % count;
  update();
});
