function BVCarousel(root) {
  if (!root) return;

  var track = root.querySelector("[data-carousel-track]");
  var slides = root.querySelectorAll("[data-carousel-slide]");
  var dots = root.querySelectorAll("[data-carousel-dot]");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  var progress = root.querySelector("[data-carousel-progress]");
  var index = 0;
  var total = slides.length;
  var autoplay = root.dataset.autoplay === "true";
  var interval = parseInt(root.dataset.interval, 10) || 5000;
  var timer = null;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!track || total === 0) return;

  var isSnap = track.classList.contains("bv-carousel-track--snap");

  function goTo(i) {
    var loop = root.dataset.loop === "true";
    if (!loop && i < 0) i = 0;
    if (!loop && i >= total) i = total - 1;
    index = loop ? ((i % total) + total) % total : i;
    if (isSnap) {
      var slide = slides[index];
      if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: reduced ? "auto" : "smooth" });
    } else {
      var viewW = root.querySelector(".bv-carousel-viewport").offsetWidth;
      track.style.transform = "translateX(-" + index * viewW + "px)";
    }
    dots.forEach(function (d, n) {
      d.classList.toggle("is-active", n === index);
      d.setAttribute("aria-selected", n === index ? "true" : "false");
    });
    if (prevBtn) prevBtn.disabled = index === 0 && !root.dataset.loop;
    if (nextBtn) nextBtn.disabled = index === total - 1 && !root.dataset.loop;
    root.dispatchEvent(new CustomEvent("bv:slide", { detail: { index: index } }));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function startAutoplay() {
    if (!autoplay || reduced) return;
    stopAutoplay();
    if (progress) {
      progress.style.transition = "none";
      progress.style.width = "0%";
      requestAnimationFrame(function () {
        progress.style.transition = "width " + interval + "ms linear";
        progress.style.width = "100%";
      });
    }
    timer = setTimeout(function () {
      next();
      startAutoplay();
    }, interval);
  }

  function stopAutoplay() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(); startAutoplay(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goTo(i);
      startAutoplay();
    });
  });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);

  if (isSnap) {
    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var left = track.scrollLeft;
        var closest = 0;
        var minDist = Infinity;
        slides.forEach(function (s, i) {
          var dist = Math.abs(s.offsetLeft - left);
          if (dist < minDist) { minDist = dist; closest = i; }
        });
        if (closest !== index) {
          index = closest;
          dots.forEach(function (d, n) {
            d.classList.toggle("is-active", n === index);
          });
        }
      }, 80);
    }, { passive: true });
  }

  goTo(0);
  startAutoplay();

  window.addEventListener("resize", function () {
    if (!isSnap) goTo(index);
  });

  return { goTo: goTo, next: next, prev: prev, stop: stopAutoplay, start: startAutoplay };
}

window.BVCarousel = BVCarousel;
