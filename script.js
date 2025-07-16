document.addEventListener("DOMContentLoaded", function () {
  const btnContacto = document.getElementById("btn-contacto");
  const dialogo = document.getElementById("dialogo-contacto");
  const cerrar = document.getElementById("cerrar-dialogo");
  const serviciosBtns = document.querySelectorAll(".servicio-btn");
  const contactoMetodos = document.getElementById("contacto-metodos");
  const whatsappLink = document.getElementById("whatsapp-link");
  
  let servicioSeleccionado = null;

  // Funcionalidad del diálogo principal
  if (btnContacto && dialogo && cerrar) {
    btnContacto.addEventListener("click", function (e) {
      e.preventDefault();
      dialogo.style.display = "flex";
      // Reset selección y ocultar métodos al abrir
      servicioSeleccionado = null;
      contactoMetodos.style.display = "none";
      serviciosBtns.forEach(btn => btn.classList.remove("selected"));
    });

    cerrar.addEventListener("click", function () {
      dialogo.style.display = "none";
    });

    dialogo.addEventListener("click", function (e) {
      if (e.target === dialogo) dialogo.style.display = "none";
    });
  }

  // Detección de dispositivo móvil
  function esMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
  }

  // Mensajes personalizados para cada servicio
  const mensajesServicios = {
    web: "¡Hola! Me interesa una página web profesional. ¿Podrías darme más información?",
    servidor: "¡Hola! Necesito información sobre hosting, dominio y gestión de servidor.",
    marca: "¡Hola! Me interesa el servicio de diseño de marca y redes sociales.",
    otros: "¡Hola! Tengo un proyecto específico en mente. ¿Podríamos hablar sobre una solución a medida?",
    general: "¡Hola! Me gustaría conocer más sobre tus servicios de desarrollo web."
  };

  // Generar URL de WhatsApp según dispositivo y servicio
  function generarURLWhatsApp(servicio) {
    const telefono = "34628230716";
    const mensaje = encodeURIComponent(mensajesServicios[servicio] || mensajesServicios.general);
    
    if (esMobile()) {
      // Móvil: abrir WhatsApp directamente
      return `whatsapp://send?phone=${telefono}&text=${mensaje}`;
    } else {
      // Escritorio: WhatsApp Web
      return `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
    }
  }

  // Manejar selección de servicios
  serviciosBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Remover selección anterior
      serviciosBtns.forEach(b => b.classList.remove("selected"));
      
      // Seleccionar actual
      this.classList.add("selected");
      servicioSeleccionado = this.dataset.servicio;
      
      // Actualizar enlace de WhatsApp
      if (whatsappLink) {
        whatsappLink.href = generarURLWhatsApp(servicioSeleccionado);
      }
      
      // Mostrar métodos de contacto
      contactoMetodos.style.display = "block";
    });
  });

  // Animación fade-in al hacer scroll para .fadein-on-scroll
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
