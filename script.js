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
  let toastQueue = [];
  let isProcessingToasts = false;
  let particleSystem = null;

  // ========================================
  // SISTEMA DE NOTIFICACIONES TOAST
  // ========================================

  function showToast(message, type = 'info', duration = 4000) {
    const toast = {
      id: Date.now() + Math.random(),
      message,
      type,
      duration
    };
    
    toastQueue.push(toast);
    
    if (!isProcessingToasts) {
      processToastQueue();
    }
  }

  function processToastQueue() {
    if (toastQueue.length === 0) {
      isProcessingToasts = false;
      return;
    }
    
    isProcessingToasts = true;
    const toast = toastQueue.shift();
    createToastElement(toast);
    
    setTimeout(() => {
      processToastQueue();
    }, 300);
  }

  function createToastElement(toast) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${toast.type}`;
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'polite');
    
    const iconMap = {
      success: 'bi-check-circle-fill',
      error: 'bi-exclamation-triangle-fill',
      warning: 'bi-exclamation-circle-fill',
      info: 'bi-info-circle-fill'
    };
    
    toastEl.innerHTML = `
      <div class="toast-content">
        <i class="bi ${iconMap[toast.type] || iconMap.info}"></i>
        <span>${toast.message}</span>
      </div>
      <button class="toast-close" onclick="removeToast(this)" aria-label="Cerrar notificación">
        <i class="bi bi-x"></i>
      </button>
    `;
    
    container.appendChild(toastEl);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      toastEl.classList.add('show');
    });
    
    // Auto-eliminar
    setTimeout(() => {
      removeToast(toastEl);
    }, toast.duration);
  }

  window.removeToast = function(element) {
    const toastEl = element.classList ? element : element.closest('.toast');
    if (!toastEl) return;
    
    toastEl.classList.add('hiding');
    
    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 300);
  };

  // ========================================
  // SISTEMA DE PARTÍCULAS
  // ========================================

  class ParticleSystem {
    constructor(container) {
      this.container = container;
      this.particles = [];
      this.maxParticles = window.innerWidth > 768 ? 50 : 25;
      this.isRunning = false;
      
      this.init();
    }
    
    init() {
      this.createParticles();
      this.start();
      
      // Escuchar cambios de tamaño de ventana
      window.addEventListener('resize', () => {
        this.maxParticles = window.innerWidth > 768 ? 50 : 25;
        this.adjustParticleCount();
      });
    }
    
    createParticles() {
      for (let i = 0; i < this.maxParticles; i++) {
        this.createParticle();
      }
    }
    
    createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición aleatoria
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Tamaño aleatorio
      const size = Math.random() * 4 + 2;
      
      // Velocidad aleatoria
      const vx = (Math.random() - 0.5) * 2;
      const vy = (Math.random() - 0.5) * 2;
      
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      particle.vx = vx;
      particle.vy = vy;
      particle.x = x;
      particle.y = y;
      
      this.container.appendChild(particle);
      this.particles.push(particle);
    }
    
    updateParticles() {
      this.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Rebotar en los bordes
        if (particle.x <= 0 || particle.x >= window.innerWidth) {
          particle.vx *= -1;
        }
        if (particle.y <= 0 || particle.y >= window.innerHeight) {
          particle.vy *= -1;
        }
        
        // Mantener dentro de la pantalla
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
        
        particle.style.left = particle.x + 'px';
        particle.style.top = particle.y + 'px';
      });
    }
    
    adjustParticleCount() {
      const currentCount = this.particles.length;
      
      if (currentCount > this.maxParticles) {
        // Remover partículas excedentes
        for (let i = currentCount - 1; i >= this.maxParticles; i--) {
          const particle = this.particles[i];
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
          this.particles.splice(i, 1);
        }
      } else if (currentCount < this.maxParticles) {
        // Agregar más partículas
        for (let i = currentCount; i < this.maxParticles; i++) {
          this.createParticle();
        }
      }
    }
    
    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      this.animate();
    }
    
    stop() {
      this.isRunning = false;
    }
    
    animate() {
      if (!this.isRunning) return;
      
      this.updateParticles();
      requestAnimationFrame(() => this.animate());
    }
  }

  // ========================================
  // CURSOR PERSONALIZADO
  // ========================================

  class CustomCursor {
    constructor() {
      this.cursor = document.getElementById('custom-cursor');
      this.isVisible = false;
      
      this.init();
    }
    
    init() {
      if (!this.cursor) return;
      
      // Solo activar en dispositivos no táctiles
      if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());
        
        // Efectos en elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], .card, .project-card');
        
        interactiveElements.forEach(el => {
          el.addEventListener('mouseenter', () => this.addHoverEffect());
          el.addEventListener('mouseleave', () => this.removeHoverEffect());
        });
      } else {
        this.cursor.style.display = 'none';
      }
    }
    
    updatePosition(e) {
      if (!this.cursor) return;
      
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
    }
    
    show() {
      if (this.cursor) {
        this.cursor.classList.add('visible');
        this.isVisible = true;
      }
    }
    
    hide() {
      if (this.cursor) {
        this.cursor.classList.remove('visible');
        this.isVisible = false;
      }
    }
    
    addHoverEffect() {
      if (this.cursor) {
        this.cursor.classList.add('hover');
      }
    }
    
    removeHoverEffect() {
      if (this.cursor) {
        this.cursor.classList.remove('hover');
      }
    }
  }

  // ========================================
  // BARRA DE PROGRESO DE SCROLL
  // ========================================

  function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }

  // ========================================
  // BOTÓN VOLVER ARRIBA
  // ========================================

  function updateScrollToTopButton() {
    const button = document.getElementById('scroll-to-top');
    if (!button) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    showToast('¡Volviendo al inicio! 🔝', 'info', 2000);
  }

  // ========================================
  // PRELOADER
  // ========================================

  function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Ocultar preloader inmediatamente para carga rápida
    setTimeout(() => {
      preloader.classList.add('fade-out');
      
      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.add('loaded');
      }, 200);
    }, 100);
  }

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
      
      // Bloquear scroll del body
      document.body.classList.add('modal-open');
      
      // Ocultar botones flotantes
      hideFloatingButtons();
      
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
      
      // Desbloquear scroll del body
      document.body.classList.remove('modal-open');
      
      // Mostrar botones flotantes
      showFloatingButtons();
      
      if (btnContacto) btnContacto.focus(); // Devolver focus
    }
  }

  // ===== FUNCIONES PARA BOTONES FLOTANTES =====
  function hideFloatingButtons() {
    const floatingElements = [
      document.getElementById('scroll-to-top'),
      document.getElementById('cta-flotante')
    ];
    
    floatingElements.forEach(element => {
      if (element) {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.pointerEvents = 'none';
      }
    });
  }
  
  function showFloatingButtons() {
    const floatingElements = [
      document.getElementById('scroll-to-top'),
      document.getElementById('cta-flotante')
    ];
    
    floatingElements.forEach(element => {
      if (element) {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
        element.style.pointerEvents = 'auto';
      }
    });
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
  
  // Inicializar nuevas funcionalidades avanzadas
  initAdvancedFeatures();
  
  // Ocultar preloader después de cargar
  hidePreloader();
  
  // Inicializar animación del logo
  initLogoAnimation();

  function initAdvancedFeatures() {
    // Sistema de partículas desactivado para mejorar rendimiento
    // const particlesContainer = document.getElementById('particles-container');
    // if (particlesContainer) {
    //   particleSystem = new ParticleSystem(particlesContainer);
    // }
    
    // Cursor personalizado desactivado para mejorar rendimiento
    // customCursor = new CustomCursor();
    
    // Event listeners para scroll
    window.addEventListener('scroll', () => {
      updateScrollProgress();
      updateScrollToTopButton();
    });
    
    // Event listener para botón volver arriba
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Mejorar notificaciones del sistema existente
    enhanceExistingFeatures();
  }

  function enhanceExistingFeatures() {
    // Mejorar feedback del cambio de tema
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        setTimeout(() => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const message = currentTheme === 'dark' ? 
            '🌙 Modo oscuro activado' : 
            '☀️ Modo claro activado';
          showToast(message, 'success', 2000);
        }, 100);
      });
    }
    
    // Sin notificaciones para selección de servicios
    // serviciosBtns.forEach(btn => {
    //   btn.addEventListener('click', () => {
    //     const servicio = btn.dataset.servicio;
    //     showToast(`✨ ${servicio} seleccionado`, 'success', 2000);
    //   });
    // });
  }

  // Animación del logo al hacer clic
  function initLogoAnimation() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
      logo.addEventListener('click', function() {
        // Remover clase si ya existe
        logo.classList.remove('clicked');
        
        // Forzar reflow para reiniciar la animación
        logo.offsetHeight;
        
        // Agregar clase de animación
        logo.classList.add('clicked');
        
        // Crear partículas
        createLogoParticles(logo);
        
        // Remover clase después de la animación
        setTimeout(() => {
          logo.classList.remove('clicked');
        }, 800);
      });
    }
  }

  // Crear partículas al hacer clic en el logo
  function createLogoParticles(logo) {
    const rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Crear 8 partículas
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'logo-particle';
      
      // Posición inicial en el centro del logo
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      
      // Dirección aleatoria
      const angle = (i * 45) * (Math.PI / 180); // 8 direcciones
      const distance = 100 + Math.random() * 50;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      
      particle.style.setProperty('--dx', dx + 'px');
      particle.style.setProperty('--dy', dy + 'px');
      
      // Color aleatorio entre los colores del tema
      const colors = ['var(--primario)', 'var(--secundario)', 'var(--acento)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      document.body.appendChild(particle);
      
      // Remover partícula después de la animación
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  }

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
