document.addEventListener("DOMContentLoaded", function () {
  const btnContacto = document.getElementById("btn-contacto");
  const dialogo = document.getElementById("dialogo-contacto");
  const cerrar = document.getElementById("cerrar-dialogo");
  if (btnContacto && dialogo && cerrar) {
    btnContacto.addEventListener("click", function (e) {
      e.preventDefault();
      dialogo.style.display = "flex";
    });
    cerrar.addEventListener("click", function () {
      dialogo.style.display = "none";
    });
    dialogo.addEventListener("click", function (e) {
      if (e.target === dialogo) dialogo.style.display = "none";
    });
  }
});
