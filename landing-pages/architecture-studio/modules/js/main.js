(function () {
  "use strict";

  document.documentElement.classList.add("as-js");

  ASHero(document.querySelector("[data-as-hero]"));
  ASFilter(document.querySelector("[data-as-filters]"));
  ASViewer(document.querySelector("[data-as-viewer]"));
  ASCounters(document.querySelector("[data-as-stats]"));
  ASContact(document.querySelector("[data-as-form]"));
  ASMenu(document.querySelector("[data-as-header]"));
  ASReveal();

  var navLinks = document.querySelectorAll(".as-nav a[href^='#']");
  var sections = [];
  navLinks.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section, link: link });
  });

  function setActive() {
    var y = window.scrollY + 120;
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
