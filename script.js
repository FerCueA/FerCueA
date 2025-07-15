document.addEventListener("DOMContentLoaded", functi}

// ...existing code...nContacto = document.getElementById("btn-contacto");
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

  // Sistema de tracking privado mejorado
  initPrivateTracking();
});

// Sistema de analytics mejorado (Umami + CountAPI backup)
async function initPrivateTracking() {
  try {
    // CountAPI como backup silencioso
    const namespace = 'aleixo-portfolio-2025';
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/visits`);
    const data = await response.json();
    
    // Log solo para debug (comentar en producción)
    // console.log(`Backup counter: ${data.value}`);
    
  } catch (error) {
    console.error('Error en tracking backup:', error);
  }
}

// Función para enviar datos a un webhook (opcional)
async function sendToWebhook(data) {
  try {
    await fetch('TU_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error('Error enviando a webhook:', error);
  }
}

// Panel de admin mejorado (Ctrl+Shift+A)
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'A') {
    showAdminPanel();
  }
});

async function showAdminPanel() {
  try {
    const response = await fetch('https://api.countapi.xyz/get/aleixo-portfolio-2025/visits');
    const data = await response.json();
    
    const info = `📊 Analytics Portfolio Aleixo
    
🔢 Contador backup: ${data.value}
📅 Fecha: ${new Date().toLocaleString()}
🌐 URL: ${window.location.href}

💡 Tip: Ve a https://cloud.umami.is para ver estadísticas completas de Umami`;
    
    alert(info);
  } catch (error) {
    alert('❌ Error al cargar estadísticas backup');
  }
}

// ...existing code...
