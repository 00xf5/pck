(function () {
  "use strict";

  function boot() {
    var heroEl = document.querySelector("[data-hero]");
    if (typeof BVHero === "function") BVHero(heroEl);
    if (typeof BVHeroStrip === "function") {
      BVHeroStrip(document.querySelector("[data-hero-strip]"), heroEl);
    }
    if (typeof BVCarousel === "function") {
      document.querySelectorAll("[data-carousel]").forEach(function (el) {
        BVCarousel(el);
      });
    }
    if (typeof BVReveal === "function") BVReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
