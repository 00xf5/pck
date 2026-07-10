function PAInview() {
  if (!("IntersectionObserver" in window)) return;

  var runway = document.querySelector("[data-pa-runway]");
  var cases = document.querySelectorAll(".pa-case");
  var services = document.querySelectorAll(".pa-service");

  if (runway && cases.length) {
    var caseObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { root: runway, threshold: 0.55, rootMargin: "0px -8% 0px -8%" }
    );
    cases.forEach(function (el) {
      caseObs.observe(el);
    });
  }

  if (services.length) {
    var svcObs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-inview", entry.isIntersecting && entry.intersectionRatio >= 0.45);
        });
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-12% 0px -28% 0px" }
    );
    services.forEach(function (el) {
      svcObs.observe(el);
    });
  }
}

window.PAInview = PAInview;
