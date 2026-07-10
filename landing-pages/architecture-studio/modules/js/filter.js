function ASFilter(root) {
  if (!root) return;

  var buttons = root.querySelectorAll("[data-as-filter]");
  var projects = document.querySelectorAll("[data-as-project]");
  var empty = document.querySelector("[data-as-empty]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var primed = false;

  function showProject(project, forceVisible) {
    project.hidden = false;
    project.removeAttribute("hidden");
    if (reduce) {
      project.classList.remove("is-filtered-out");
      project.classList.add("is-visible");
      return;
    }
    requestAnimationFrame(function () {
      project.classList.remove("is-filtered-out");
      if (forceVisible) project.classList.add("is-visible");
    });
  }

  function hideProject(project) {
    if (project.hidden || project.classList.contains("is-filtered-out")) {
      project.hidden = true;
      project.classList.add("is-filtered-out");
      return;
    }
    if (reduce) {
      project.classList.add("is-filtered-out");
      project.hidden = true;
      return;
    }
    project.classList.add("is-filtered-out");
    var done = false;
    function finish(e) {
      if (done) return;
      if (e && e.propertyName && e.propertyName !== "opacity") return;
      done = true;
      project.removeEventListener("transitionend", finish);
      if (project.classList.contains("is-filtered-out")) project.hidden = true;
    }
    project.addEventListener("transitionend", finish);
    window.setTimeout(finish, 420);
  }

  function apply(type) {
    var forceVisible = primed;
    var visible = 0;
    projects.forEach(function (project) {
      var match = type === "all" || project.getAttribute("data-type") === type;
      if (match) {
        visible += 1;
        showProject(project, forceVisible);
      } else {
        hideProject(project);
      }
    });
    if (empty) empty.classList.toggle("is-visible", visible === 0);
    primed = true;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-as-filter") || "all";
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      apply(type);
    });
  });

  apply("all");
}

window.ASFilter = ASFilter;
