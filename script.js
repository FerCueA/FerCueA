document.addEventListener("DOMContentLoaded", function () {
  const btnContacto = document.getElementById("btn-contacto");
  const dialogo = document.getElementById("dialogo-contacto");
  const cerrar = document.getElementById("cerrar-dialogo");
  const serviciosBtns = document.querySelectorAll(".servicio-btn");
  const contactoMetodos = document.getElementById("contacto-metodos");
  const whatsappLink = document.getElementById("whatsapp-link");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const ctaFlotante = document.getElementById("cta-flotante");
  
  let servicioSeleccionado = null;

  // ===== TEMA OSCURO/CLARO =====
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Anunciar cambio para lectores de pantalla
    announceThemeChange(newTheme);
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
    }
  }

  function announceThemeChange(theme) {
    const message = theme === 'dark' ? 'Modo oscuro activado' : 'Modo claro activado';
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // ===== CTA FLOTANTE =====
  function initCTA() {
    if (!ctaFlotante) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'servicios') {
          if (entry.isIntersecting) {
            ctaFlotante.classList.add('visible');
          } else {
            ctaFlotante.classList.remove('visible');
          }
        }
      });
    }, { threshold: 0.1 });

    const serviciosSection = document.getElementById('servicios');
    if (serviciosSection) {
      observer.observe(serviciosSection);
    }

    // Al hacer clic en CTA, abrir diálogo de contacto
    ctaFlotante.addEventListener('click', () => {
      if (btnContacto) {
        btnContacto.click();
      }
    });
  }

  // ===== DIÁLOGO DE CONTACTO =====
  function initContactDialog() {
    if (!btnContacto || !dialogo || !cerrar) return;

    btnContacto.addEventListener("click", function (e) {
      e.preventDefault();
      dialogo.style.display = "flex";
      dialogo.setAttribute('aria-hidden', 'false');
      
      // Reset selección y ocultar métodos al abrir
      servicioSeleccionado = null;
      if (contactoMetodos) contactoMetodos.style.display = "none";
      serviciosBtns.forEach(btn => btn.classList.remove("selected"));
      
      // Focus en el primer elemento
      const firstButton = dialogo.querySelector('.servicio-btn');
      if (firstButton) firstButton.focus();
    });

    cerrar.addEventListener("click", function () {
      closeDialog();
    });

    dialogo.addEventListener("click", function (e) {
      if (e.target === dialogo) closeDialog();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && dialogo.style.display === 'flex') {
        closeDialog();
      }
    });
  }

  function closeDialog() {
    if (dialogo) {
      dialogo.style.display = "none";
      dialogo.setAttribute('aria-hidden', 'true');
      if (btnContacto) btnContacto.focus(); // Devolver focus
    }
  }

  // ===== DETECCIÓN DE DISPOSITIVO =====
  function esMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
  }

  // ===== MENSAJES WHATSAPP =====
  const mensajesServicios = {
    web: "¡Hola! Me interesa una página web profesional. ¿Podrías darme más información sobre servicios, plazos y presupuesto?",
    servidor: "¡Hola! Necesito información sobre hosting, dominio y gestión de servidor. ¿Qué incluyen estos servicios?",
    marca: "¡Hola! Me interesa el servicio de diseño de marca y redes sociales. ¿Podrías contarme más sobre el proceso?",
    otros: "¡Hola! Tengo un proyecto específico en mente. ¿Podríamos hablar sobre una solución a medida?",
    general: "¡Hola! Me gustaría conocer más sobre tus servicios de desarrollo web y cómo podrías ayudarme con mi proyecto."
  };

  function generarURLWhatsApp(servicio) {
    const telefono = "34628230716";
    const mensaje = encodeURIComponent(mensajesServicios[servicio] || mensajesServicios.general);
    
    if (esMobile()) {
      return `whatsapp://send?phone=${telefono}&text=${mensaje}`;
    } else {
      return `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;
    }
  }

  // ===== SELECCIÓN DE SERVICIOS =====
  function initServiceSelection() {
    serviciosBtns.forEach((btn, index) => {
      // Accesibilidad: navegación con teclado
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('role', 'button');
      
      btn.addEventListener("click", function() {
        selectService(this);
      });

      btn.addEventListener("keydown", function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectService(this);
        }
      });
    });
  }

  function selectService(btn) {
    // Remover selección anterior
    serviciosBtns.forEach(b => {
      b.classList.remove("selected");
      b.setAttribute('aria-pressed', 'false');
    });
    
    // Seleccionar actual
    btn.classList.add("selected");
    btn.setAttribute('aria-pressed', 'true');
    servicioSeleccionado = btn.dataset.servicio;
    
    // Actualizar enlace de WhatsApp
    if (whatsappLink) {
      whatsappLink.href = generarURLWhatsApp(servicioSeleccionado);
    }
    
    // Mostrar métodos de contacto
    if (contactoMetodos) {
      contactoMetodos.style.display = "block";
      // Anunciar para lectores de pantalla
      const serviceName = btn.textContent.trim();
      announceServiceSelection(serviceName);
    }
  }

  function announceServiceSelection(serviceName) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Servicio seleccionado: ${serviceName}. Métodos de contacto disponibles.`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  // ===== ANIMACIONES SCROLL =====
  function initScrollAnimations() {
    const fadeEls = document.querySelectorAll(".fadein-on-scroll");
    const observer = new IntersectionObserver(
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
  }

  // ===== INICIALIZACIÓN =====
  initTheme();
  initCTA();
  initContactDialog();
  initServiceSelection();
  initScrollAnimations();

  // Mejorar accesibilidad general
  document.addEventListener('focusin', function(e) {
    if (e.target.matches('button, a, input, select, textarea')) {
      e.target.style.outline = '2px solid var(--secundario)';
      e.target.style.outlineOffset = '2px';
    }
  });

  document.addEventListener('focusout', function(e) {
    if (e.target.matches('button, a, input, select, textarea')) {
      e.target.style.outline = '';
      e.target.style.outlineOffset = '';
    }
  });
});
