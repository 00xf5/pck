function BVCarousel(root) {
  if (!root) return;

  var track = root.querySelector("[data-carousel-track]");
  var slides = root.querySelectorAll("[data-carousel-slide]");
  var dots = root.querySelectorAll("[data-carousel-dot]");
  var prevBtn = root.querySelector("[data-carousel-prev]");
  var nextBtn = root.querySelector("[data-carousel-next]");
  var progress = root.querySelector("[data-carousel-progress]");
  var viewport = root.querySelector(".bv-carousel-viewport");
  var index = 0;
  var total = slides.length;
  var autoplay = root.dataset.autoplay === "true";
  var interval = parseInt(root.dataset.interval, 10) || 5000;
  var timer = null;
  var isSnap = track && track.classList.contains("bv-carousel-track--snap");
  var scroller = isSnap ? viewport : null;

  if (!track || total === 0) return;
  if (isSnap && !scroller) return;

  function goTo(i) {
    var loop = root.dataset.loop === "true";
    if (!loop && i < 0) i = 0;
    if (!loop && i >= total) i = total - 1;
    index = loop ? ((i % total) + total) % total : i;

    if (isSnap) {
      var slide = slides[index];
      if (slide) {
        scroller.scrollTo({
          left: slide.offsetLeft - track.offsetLeft,
          behavior: "smooth"
        });
      }
    } else if (viewport) {
      track.style.transform = "translateX(-" + index * viewport.offsetWidth + "px)";
    }

    dots.forEach(function (dot, n) {
      dot.classList.toggle("is-active", n === index);
      dot.setAttribute("aria-selected", n === index ? "true" : "false");
    });
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  function start() {
    stop();
    if (!autoplay) return;
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
      start();
    }, interval);
  }

  function stop() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { goTo(i); start(); });
  });

  if (isSnap) {
    var scrollTimer;
    scroller.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var left = scroller.scrollLeft;
        var closest = 0;
        var min = Infinity;
        slides.forEach(function (slide, i) {
          var dist = Math.abs((slide.offsetLeft - track.offsetLeft) - left);
          if (dist < min) { min = dist; closest = i; }
        });
        if (closest !== index) {
          index = closest;
          dots.forEach(function (dot, n) {
            dot.classList.toggle("is-active", n === index);
          });
        }
      }, 80);
    }, { passive: true });
  }

  window.addEventListener("resize", function () {
    if (!isSnap) goTo(index);
  });

  goTo(0);
  start();
}

window.BVCarousel = BVCarousel;
