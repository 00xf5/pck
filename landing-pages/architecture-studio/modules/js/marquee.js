function ASMarquee(root) {
  if (!root) return;
  var track = root.querySelector(".as-marquee-track");
  if (!track) return;

  if (track.children.length === 1) {
    track.appendChild(track.children[0].cloneNode(true));
  }

  track.style.animation = "none";
  void track.offsetWidth;
  track.style.animation = "";

  var cs = window.getComputedStyle(track);
  var animating = cs.animationName && cs.animationName !== "none";
  if (animating && cs.animationPlayState !== "paused") return;

  var x = 0;
  var last = 0;
  var speed = 52;

  track.style.animation = "none";
  track.style.willChange = "transform";

  function frame(now) {
    if (!last) last = now;
    var dt = Math.min(32, now - last) / 1000;
    last = now;
    var half = track.scrollWidth / 2;
    if (half > 0) {
      x -= speed * dt;
      if (-x >= half) x += half;
      track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
    }
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
}

window.ASMarquee = ASMarquee;
