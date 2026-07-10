function ASInview() {
  if (!("IntersectionObserver" in window)) return;

  var projects = document.querySelectorAll(".as-project");
  var steps = document.querySelectorAll(".as-step");

  function bind(els, threshold, rootMargin) {
    if (!els.length) return;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { threshold: threshold, rootMargin: rootMargin }
    );
    els.forEach(function (el) {
      obs.observe(el);
    });
  }

  bind(projects, 0.4, "0px 0px -12% 0px");
  bind(steps, 0.45, "0px 0px -18% 0px");
}

window.ASInview = ASInview;
