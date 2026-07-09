function BVHero(root) {
  if (!root) return;

  var slides = root.querySelectorAll("[data-hero-slide]");
  var thumbs = root.querySelectorAll("[data-hero-thumb]");
  var counter = root.querySelector("[data-hero-counter]");
  var thumbDot = root.querySelector("[data-hero-thumb-dot]");
  var prevBtn = root.querySelector("[data-hero-prev]");
  var nextBtn = root.querySelector("[data-hero-next]");
  var total = slides.length;
  var index = 0;
  var cycleMs = 25000;
  var stepMs = 5000;
  var syncTimer = null;
  var resumeTimer = null;
  var paused = false;

  if (total === 0) return;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function paintChrome(i) {
    index = ((i % total) + total) % total;
    thumbs.forEach(function (t, n) {
      t.classList.toggle("is-active", n === index);
    });
    slides.forEach(function (s, n) {
      s.classList.toggle("is-active", n === index);
    });
    if (counter) counter.textContent = pad(index + 1) + "  >";
    if (thumbDot && total > 1) {
      thumbDot.style.left = (index / (total - 1)) * 100 + "%";
    }
  }

  function syncFromClock() {
    if (paused) return;
    var i = Math.floor((Date.now() / stepMs) % total);
    paintChrome(i);
  }

  function startSync() {
    stopSync();
    syncFromClock();
    syncTimer = setInterval(syncFromClock, 250);
  }

  function stopSync() {
    if (syncTimer) clearInterval(syncTimer);
    syncTimer = null;
  }

  function pauseCss() {
    paused = true;
    root.classList.add("is-paused");
    stopSync();
    if (resumeTimer) clearTimeout(resumeTimer);
  }

  function resumeCss() {
    paused = false;
    root.classList.remove("is-paused");
    startSync();
  }

  function jump(i) {
    pauseCss();
    paintChrome(i);
    resumeTimer = setTimeout(resumeCss, 8000);
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function (e) {
      e.preventDefault();
      jump(i);
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      jump(index - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      jump(index + 1);
    });
  }

  var tx = 0;
  var ty = 0;
  root.addEventListener("touchstart", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    if (e.target.closest("a, button, [data-hero-strip]")) return;
    tx = e.changedTouches[0].screenX;
    ty = e.changedTouches[0].screenY;
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (!e.changedTouches || !e.changedTouches[0]) return;
    if (e.target.closest("a, button, [data-hero-strip]")) return;
    var dx = e.changedTouches[0].screenX - tx;
    var dy = e.changedTouches[0].screenY - ty;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    jump(dx > 0 ? index - 1 : index + 1);
  }, { passive: true });

  startSync();
}

window.BVHero = BVHero;
