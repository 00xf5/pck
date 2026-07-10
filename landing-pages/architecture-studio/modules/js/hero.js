function ASHero(root) {
  if (!root) return;

  var slides = root.querySelectorAll("[data-as-hero-slide]");
  var indexEl = root.querySelector("[data-as-hero-index]");
  var index = 0;
  var total = slides.length;
  var timer = null;
  var interval = 6000;

  if (total < 2) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function goTo(i) {
    index = ((i % total) + total) % total;
    slides.forEach(function (slide, n) {
      slide.classList.toggle("is-active", n === index);
    });
    if (indexEl) indexEl.textContent = pad(index + 1) + " / " + pad(total);
  }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(function () {
      goTo(index + 1);
    }, interval);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  goTo(0);
  start();
}

window.ASHero = ASHero;
