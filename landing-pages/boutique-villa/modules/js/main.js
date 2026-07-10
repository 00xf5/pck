(function () {
  "use strict";

  var heroEl = document.querySelector("[data-hero]");
  BVHero(heroEl);
  BVHeroStrip(document.querySelector("[data-hero-strip]"), heroEl);

  document.querySelectorAll("[data-carousel]").forEach(function (el) {
    BVCarousel(el);
  });

  BVContact(document.querySelector("[data-contact-form]"));
  BVReveal();
})();
