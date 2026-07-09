function BVHeroStrip(stripRoot, heroRoot) {
  if (!stripRoot) return;

  var tracks = stripRoot.querySelectorAll(".bv-strip-track");
  var thumbs = heroRoot ? heroRoot.querySelectorAll("[data-hero-thumb]") : [];
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var raf = 0;
  var last = 0;
  var offsets = [];
  var speeds = [];

  tracks.forEach(function (track, i) {
    var reverse = track.closest(".bv-strip-row--alt");
    speeds[i] = reverse ? 0.028 : -0.035;
    offsets[i] = reverse ? -(track.scrollWidth / 2) : 0;
    track.style.willChange = "transform";
  });

  function tick(now) {
    if (!last) last = now;
    var dt = Math.min(32, now - last);
    last = now;

    tracks.forEach(function (track, i) {
      var half = track.scrollWidth / 2;
      if (half < 1) return;
      offsets[i] += speeds[i] * dt;
      if (offsets[i] <= -half) offsets[i] += half;
      if (offsets[i] >= 0) offsets[i] -= half;
      track.style.transform = "translate3d(" + offsets[i] + "px,0,0)";
    });

    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (reduced || raf) return;
    last = 0;
    tracks.forEach(function (track, i) {
      if (speeds[i] > 0) offsets[i] = -(track.scrollWidth / 2);
    });
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  stripRoot.addEventListener("click", function (e) {
    var item = e.target.closest("[data-strip-item]");
    if (!item || !heroRoot) return;
    var idx = parseInt(item.getAttribute("data-hero-index"), 10);
    if (isNaN(idx) || !thumbs[idx]) return;
    e.preventDefault();
    thumbs[idx].click();
  });

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  start();
}

window.BVHeroStrip = BVHeroStrip;
