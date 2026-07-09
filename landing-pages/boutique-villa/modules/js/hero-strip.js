function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot || !heroRoot) return;

  var thumbs = heroRoot.querySelectorAll("[data-hero-thumb]");

  stripRoot.addEventListener("click", function (e) {
    var item = e.target.closest("[data-strip-item]");
    if (!item) return;
    var idx = parseInt(item.getAttribute("data-hero-index"), 10);
    if (isNaN(idx) || !thumbs[idx]) return;
    e.preventDefault();
    thumbs[idx].click();
  });
}

window.BVHeroStrip = BVHeroStrip;
