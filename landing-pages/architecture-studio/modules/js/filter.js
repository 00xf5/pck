function ASFilter(root) {
  if (!root) return;

  var buttons = root.querySelectorAll("[data-as-filter]");
  var projects = document.querySelectorAll("[data-as-project]");
  var empty = document.querySelector("[data-as-empty]");

  function apply(type) {
    var visible = 0;
    projects.forEach(function (project) {
      var match = type === "all" || project.getAttribute("data-type") === type;
      project.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.classList.toggle("is-visible", visible === 0);
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
