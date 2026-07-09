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
  var interval = 6000;
  var timer = null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var touchStartX = 0;

  if (total === 0) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function goTo(i) {
    index = (i + total) % total;
    slides.forEach(function (s, n) {
      s.classList.toggle("is-active", n === index);
    });
    thumbs.forEach(function (t, n) {
      t.classList.toggle("is-active", n === index);
    });
    if (counter) counter.textContent = pad(index + 1) + "  >";
    if (thumbDot && total > 1) {
      thumbDot.style.left = (index / (total - 1)) * 100 + "%";
    }
    restart();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function restart() {
    if (timer) clearInterval(timer);
    if (reduced || total < 2) return;
    timer = setInterval(next, interval);
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () { goTo(i); });
  });

  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (nextBtn) nextBtn.addEventListener("click", next);

  root.addEventListener("mouseenter", function () {
    if (timer) clearInterval(timer);
  });
  root.addEventListener("mouseleave", restart);

  root.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) dx > 0 ? prev() : next();
  }, { passive: true });

  goTo(0);
}

window.BVHero = BVHero;
