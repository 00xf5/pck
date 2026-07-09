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
  var interval = 5000;
  var timer = null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var touchStartX = 0;
  var touchStartY = 0;
  var swiping = false;

  if (total === 0) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function start() {
    stop();
    if (reduced || total < 2) return;
    timer = setInterval(next, interval);
  }

  function goTo(i) {
    index = ((i % total) + total) % total;
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
    start();
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function (e) {
      e.stopPropagation();
      goTo(i);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      prev();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      next();
    });
  }

  if (canHover) {
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
  }

  root.addEventListener("touchstart", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    if (e.target.closest("a, button, [data-hero-strip]")) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    swiping = true;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (!swiping || !e.changedTouches || !e.changedTouches[0]) return;
    swiping = false;
    var dx = e.changedTouches[0].screenX - touchStartX;
    var dy = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) {
      start();
      return;
    }
    if (dx > 0) prev();
    else next();
  }, { passive: true });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  goTo(0);
}

window.BVHero = BVHero;
