function PARunway(root) {
  if (!root) return;

  var isDown = false;
  var startX = 0;
  var scrollLeft = 0;

  root.addEventListener("mousedown", function (e) {
    isDown = true;
    root.classList.add("is-dragging");
    startX = e.pageX - root.offsetLeft;
    scrollLeft = root.scrollLeft;
  });

  root.addEventListener("mouseleave", function () {
    isDown = false;
    root.classList.remove("is-dragging");
  });

  root.addEventListener("mouseup", function () {
    isDown = false;
    root.classList.remove("is-dragging");
  });

  root.addEventListener("mousemove", function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - root.offsetLeft;
    root.scrollLeft = scrollLeft - (x - startX) * 1.25;
  });
}

window.PARunway = PARunway;
