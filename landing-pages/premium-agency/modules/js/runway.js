function PARunway(root) {
  if (!root) return;

  var isDown = false;
  var startX = 0;
  var scrollLeft = 0;
  var activeId = null;

  root.style.touchAction = "pan-x";

  function endDrag(e) {
    if (!isDown) return;
    if (e && activeId != null && e.pointerId !== activeId) return;
    isDown = false;
    activeId = null;
    root.classList.remove("is-dragging");
    try {
      if (e) root.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }

  root.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDown = true;
    activeId = e.pointerId;
    root.classList.add("is-dragging");
    startX = e.clientX;
    scrollLeft = root.scrollLeft;
    try {
      root.setPointerCapture(e.pointerId);
    } catch (err) {}
  });

  root.addEventListener("pointermove", function (e) {
    if (!isDown || e.pointerId !== activeId) return;
    /* Touch/pen: keep native momentum scrolling. Mouse: custom drag. */
    if (e.pointerType !== "mouse") return;
    e.preventDefault();
    root.scrollLeft = scrollLeft - (e.clientX - startX) * 1.25;
  });

  root.addEventListener("pointerup", endDrag);
  root.addEventListener("pointercancel", endDrag);
  root.addEventListener("lostpointercapture", function () {
    isDown = false;
    activeId = null;
    root.classList.remove("is-dragging");
  });

  root.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });
}

window.PARunway = PARunway;
