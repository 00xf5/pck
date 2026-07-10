function ASViewer(root) {
  if (!root) return;

  var projects = Array.prototype.slice.call(document.querySelectorAll("[data-as-project]"));
  var img = root.querySelector("[data-as-viewer-image]");
  var title = root.querySelector("[data-as-viewer-title]");
  var meta = root.querySelector("[data-as-viewer-meta]");
  var blurb = root.querySelector("[data-as-viewer-blurb]");
  var typeEl = root.querySelector("[data-as-viewer-type]");
  var closeBtns = root.querySelectorAll("[data-as-viewer-close]");
  var prevBtn = root.querySelector("[data-as-viewer-prev]");
  var nextBtn = root.querySelector("[data-as-viewer-next]");
  var index = 0;
  var lastFocus = null;

  function visibleProjects() {
    return projects.filter(function (p) { return !p.hidden; });
  }

  function fill(project) {
    if (!project) return;
    var type = project.getAttribute("data-type") || "";
    var label = type.charAt(0).toUpperCase() + type.slice(1);
    if (img) {
      img.src = project.getAttribute("data-image") || "";
      img.alt = project.getAttribute("data-title") || "";
    }
    if (title) title.textContent = project.getAttribute("data-title") || "";
    if (typeEl) typeEl.textContent = label;
    if (meta) {
      meta.textContent = [
        project.getAttribute("data-location") || "",
        project.getAttribute("data-year") || ""
      ].filter(Boolean).join(" · ");
    }
    if (blurb) blurb.textContent = project.getAttribute("data-blurb") || "";
  }

  function openAt(i) {
    var list = visibleProjects();
    if (!list.length) return;
    index = ((i % list.length) + list.length) % list.length;
    fill(list[index]);
    lastFocus = document.activeElement;
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (nextBtn) nextBtn.focus();
  }

  function close() {
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(delta) {
    var list = visibleProjects();
    if (!list.length) return;
    index = ((index + delta) % list.length + list.length) % list.length;
    fill(list[index]);
  }

  projects.forEach(function (project) {
    project.addEventListener("click", function () {
      var list = visibleProjects();
      var i = list.indexOf(project);
      openAt(i < 0 ? 0 : i);
    });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", close);
  });

  if (prevBtn) prevBtn.addEventListener("click", function () { step(-1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { step(1); });

  document.addEventListener("keydown", function (e) {
    if (!root.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

window.ASViewer = ASViewer;
