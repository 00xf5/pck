function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot) return;

  var heroThumbs = heroRoot ? heroRoot.querySelectorAll("[data-hero-thumb]") : [];

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
