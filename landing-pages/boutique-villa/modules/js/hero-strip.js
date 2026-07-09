function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot) return;

  var rows = stripRoot.querySelectorAll("[data-strip-track]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var heroThumbs = heroRoot ? heroRoot.querySelectorAll("[data-hero-thumb]") : [];

  rows.forEach(function (track) {
    if (track.dataset.stripReady === "1") return;
    var items = track.querySelectorAll("[data-strip-item]");
    if (items.length < 2) return;

    if (!reduced) {
      items.forEach(function (item) {
        track.appendChild(item.cloneNode(true));
      });
      track.dataset.stripReady = "1";
    }
  });

  if (canHover) {
    stripRoot.addEventListener("mouseenter", function () {
      rows.forEach(function (t) { t.style.animationPlayState = "paused"; });
    });
    stripRoot.addEventListener("mouseleave", function () {
      if (!reduced) {
        rows.forEach(function (t) { t.style.animationPlayState = "running"; });
      }
    });
  }

  stripRoot.addEventListener("click", function (e) {
    var item = e.target.closest("[data-strip-item]");
    if (!item || !heroRoot) return;
    var idx = parseInt(item.dataset.heroIndex, 10);
    if (isNaN(idx)) return;
    e.preventDefault();
    var thumb = heroThumbs[idx];
    if (thumb) thumb.click();
  });
}

window.BVHeroStrip = BVHeroStrip;
