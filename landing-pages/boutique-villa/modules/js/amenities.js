function BVAmenities(root) {
  if (!root) return;

  var items = Array.prototype.slice.call(root.querySelectorAll("[data-amenity]"));
  var lightbox = document.querySelector("[data-amenity-lightbox]");
  if (!items.length || !lightbox) return;

  var img = lightbox.querySelector("[data-amenity-image]");
  var caption = lightbox.querySelector("[data-amenity-caption]");
  var closeBtns = lightbox.querySelectorAll("[data-amenity-close]");
  var prevBtn = lightbox.querySelector("[data-amenity-prev]");
  var nextBtn = lightbox.querySelector("[data-amenity-next]");
  var index = 0;
  var lastFocus = null;

  function fill(i) {
    index = ((i % items.length) + items.length) % items.length;
    var item = items[index];
    var src = item.getAttribute("data-amenity-src") || "";
    var label = item.getAttribute("data-amenity-label") || "";
    if (img) {
      img.classList.remove("is-in");
      img.src = src;
      img.alt = label;
      requestAnimationFrame(function () {
        img.classList.add("is-in");
      });
    }
    if (caption) caption.textContent = label;
  }

  function open(i) {
    fill(i);
    lastFocus = document.activeElement;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (nextBtn) nextBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  items.forEach(function (item, i) {
    item.addEventListener("click", function () { open(i); });
  });

  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", close);
  });

  if (prevBtn) prevBtn.addEventListener("click", function () { fill(index - 1); });
  if (nextBtn) nextBtn.addEventListener("click", function () { fill(index + 1); });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") fill(index - 1);
    if (e.key === "ArrowRight") fill(index + 1);
  });
}

window.BVAmenities = BVAmenities;
