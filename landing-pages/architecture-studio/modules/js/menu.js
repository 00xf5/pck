function ASMenu(header) {
  if (!header) return;

  var btn = header.querySelector("[data-as-menu]");
  var nav = header.querySelector(".as-nav");
  if (!btn || !nav) return;

  function close() {
    header.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function open() {
    header.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    btn.setAttribute("aria-label", "Close menu");
  }

  btn.addEventListener("click", function () {
    if (header.classList.contains("is-open")) close();
    else open();
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) close();
  });
}

window.ASMenu = ASMenu;
