function ASCounters(root) {
  if (!root) return;

  var nums = root.querySelectorAll("[data-as-count]");
  if (!nums.length) return;
  var done = false;

  function animate(el) {
    var to = parseInt(el.getAttribute("data-to"), 10) || 0;
    var start = performance.now();
    var duration = 1100;

    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(to * eased));
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function run() {
    if (done) return;
    done = true;
    nums.forEach(animate);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nums.forEach(function (el) {
      el.textContent = el.getAttribute("data-to") || "0";
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        run();
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(root);
}

window.ASCounters = ASCounters;
