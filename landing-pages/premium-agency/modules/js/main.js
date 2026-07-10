(function () {
  "use strict";

  document.documentElement.classList.add("pa-js");

  PARunway(document.querySelector("[data-pa-runway]"));
  PAMarquee(document.querySelector(".pa-marquee"));
  PACounters(document.querySelector(".pa-hero-meta"));
  PAContact(document.querySelector("[data-pa-form]"));
  PAMenu(document.querySelector("[data-pa-header]"));
  PAReveal();
  PAInview();

  var navLinks = document.querySelectorAll(".pa-nav a[href^='#']");
  var sections = [];
  navLinks.forEach(function (link) {
    var section = document.getElementById(link.getAttribute("href").slice(1));
    if (section) sections.push({ el: section, link: link });
  });

  function setActive() {
    var y = window.scrollY + 100;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.offsetTop <= y) current = s;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", current && link === current.link);
    });
  }

  if (sections.length) {
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }
})();
