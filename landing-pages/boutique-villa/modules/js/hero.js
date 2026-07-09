function BVHero(root) {
  if (!root) return;

  var slides = root.querySelectorAll("[data-hero-slide]");
  var thumbs = root.querySelectorAll("[data-hero-thumb]");
  var counter = root.querySelector("[data-hero-counter]");
  var thumbDot = root.querySelector("[data-hero-thumb-dot]");
  var prevBtn = root.querySelector("[data-hero-prev]");
  var nextBtn = root.querySelector("[data-hero-next]");
  var index = 0;
  var total = slides.length;
  var timer = null;
  var interval = 5000;
  var touchX = 0;
  var touchY = 0;

  if (total < 2) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function goTo(i) {
    index = ((i % total) + total) % total;
    slides.forEach(function (slide, n) {
      slide.classList.toggle("is-active", n === index);
    });
    thumbs.forEach(function (thumb, n) {
      thumb.classList.toggle("is-active", n === index);
    });
    if (counter) counter.textContent = pad(index + 1) + "  >";
    if (thumbDot) thumbDot.style.left = (index / (total - 1)) * 100 + "%";
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    stop();
    timer = setInterval(next, interval);
  }

  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () {
      goTo(i);
      start();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      start();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      start();
    });
  }

  root.addEventListener("touchstart", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    if (e.target.closest("a, button, [data-hero-strip]")) return;
    touchX = e.changedTouches[0].clientX;
    touchY = e.changedTouches[0].clientY;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    if (e.target.closest("a, button, [data-hero-strip]")) return;
    var dx = e.changedTouches[0].clientX - touchX;
    var dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx > 0) prev();
    else next();
    start();
  }, { passive: true });

  goTo(0);
  start();
}

window.BVHero = BVHero;
