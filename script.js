document.addEventListener("DOMContentLoaded", function () {
  var img = document.querySelector(".preview-proyecto");
  var skeleton = document.querySelector(".skeleton-loader");
  if (img && skeleton) {
    if (img.complete) {
      img.classList.add("loaded");
      skeleton.style.display = "none";
    } else {
      img.addEventListener("load", function () {
        img.classList.add("loaded");
        skeleton.style.display = "none";
      });
    }
  }
});
