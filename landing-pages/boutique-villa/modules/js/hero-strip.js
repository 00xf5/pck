function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot) return;

  var tracks = stripRoot.querySelectorAll(".bv-strip-track");
  var thumbs = heroRoot ? heroRoot.querySelectorAll("[data-hero-thumb]") : [];
  var timer = null;
  var offsets = [];
  var speeds = [];

  tracks.forEach(function (track, i) {
    var reverse = !!track.closest(".bv-strip-row--alt");
    speeds[i] = reverse ? 1.2 : -1.5;
    offsets[i] = 0;
  });

  function step() {
    tracks.forEach(function (track, i) {
      var half = track.scrollWidth / 2;
      if (half < 40) return;
      offsets[i] += speeds[i];
      if (offsets[i] <= -half) offsets[i] += half;
      if (offsets[i] >= 0) offsets[i] -= half;
      track.style.transform = "translate3d(" + offsets[i] + "px,0,0)";
    });
  }

  function start() {
    if (timer) return;
    tracks.forEach(function (track, i) {
      var half = track.scrollWidth / 2;
      offsets[i] = speeds[i] > 0 && half > 40 ? -half : 0;
    });
    timer = setInterval(step, 16);
  }

  function boot() {
    var tries = 0;
    (function wait() {
      var ready = true;
      tracks.forEach(function (track) {
        if (track.scrollWidth < 80) ready = false;
      });
      if (ready || tries > 40) start();
      else {
        tries += 1;
        setTimeout(wait, 100);
      }
    })();
  }

  stripRoot.addEventListener("click", function (e) {
    var item = e.target.closest("[data-strip-item]");
    if (!item || !heroRoot) return;
    var idx = parseInt(item.getAttribute("data-hero-index"), 10);
    if (isNaN(idx) || !thumbs[idx]) return;
    e.preventDefault();
    thumbs[idx].click();
  });

  if (document.readyState === "complete") boot();
  else window.addEventListener("load", boot);
  boot();
}

window.BVHeroStrip = BVHeroStrip;
