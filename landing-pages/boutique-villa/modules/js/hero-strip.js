function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot) return;

  var rows = stripRoot.querySelectorAll("[data-strip-track]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var heroThumbs = heroRoot ? heroRoot.querySelectorAll("[data-hero-thumb]") : [];

  rows.forEach(function (track) {
    if (track.dataset.stripReady === "1") return;
    var items = Array.prototype.slice.call(track.querySelectorAll("[data-strip-item]"));
    if (items.length < 2) return;
    if (!reduced) {
      items.forEach(function (item) {
        track.appendChild(item.cloneNode(true));
      });
      track.dataset.stripReady = "1";
    }
  });

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
