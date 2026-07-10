function PACounters(root) {
  var nums = (root || document).querySelectorAll("[data-pa-count]");
  if (!nums.length) return;
  var done = false;

  function animate(el) {
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    var start = performance.now();
    function frame(now) {
      var t = Math.min(1, (now - start) / 1000);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nums.forEach(function (el) { el.textContent = el.getAttribute("data-to") || "0"; });
    return;
  }

  var target = root || nums[0].closest(".pa-hero-meta") || document.body;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !done) {
        done = true;
        nums.forEach(animate);
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(target);
}

window.PACounters = PACounters;
