// Animación fade-in al hacer scroll para .fadein-on-scroll
window.addEventListener("DOMContentLoaded", function () {
  var fadeEls = document.querySelectorAll(".fadein-on-scroll");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach(function (el) {
    observer.observe(el);
  });
});
