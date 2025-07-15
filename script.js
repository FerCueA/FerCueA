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

  // Sistema de tracking simplificado
  initSimpleTracking();
});

// Sistema de tracking local simplificado
function initSimpleTracking() {
  try {
    // Tracking local básico
    const visitData = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || "Direct",
      userAgent: navigator.userAgent.substring(0, 50), // Solo primeros 50 chars
    };

    // Guardar en localStorage
    const visits = JSON.parse(localStorage.getItem("portfolio-visits") || "[]");
    visits.push(visitData);

    // Mantener solo las últimas 100 visitas
    if (visits.length > 100) {
      visits.splice(0, visits.length - 100);
    }

    localStorage.setItem("portfolio-visits", JSON.stringify(visits));
  } catch (error) {
    console.error("Error en tracking local:", error);
  }
}

// Panel de admin mejorado (Ctrl+Shift+A)
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === "A") {
    showAdminPanel();
  }
});

function showAdminPanel() {
  try {
    const visits = JSON.parse(localStorage.getItem("portfolio-visits") || "[]");
    const totalVisits = visits.length;
    const lastVisit =
      visits.length > 0
        ? new Date(visits[visits.length - 1].timestamp).toLocaleString()
        : "N/A";

    const info = `📊 Analytics Portfolio Aleixo (Local)
    
🔢 Total de visitas: ${totalVisits}
📅 Última visita: ${lastVisit}
🌐 URL actual: ${window.location.href}
� Sesión actual: ${new Date().toLocaleString()}

💡 Datos guardados localmente en tu navegador`;

    alert(info);
  } catch (error) {
    alert("❌ Error al cargar estadísticas locales");
  }
}
