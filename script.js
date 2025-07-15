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

  // Sistema de tracking mejorado con Umami + fallback local
  initAnalytics();
});

// Sistema de analytics con múltiples opciones
function initAnalytics() {
  // Intentar cargar Umami Analytics
  loadUmamiAnalytics();

  // Siempre ejecutar tracking local como backup
  initSimpleTracking();
}

// Cargar Umami con manejo de errores
function loadUmamiAnalytics() {
  try {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://cloud.umami.is/script.js";
    script.setAttribute(
      "data-website-id",
      "1e5617ab-8abc-4d70-8ebd-c8a44efdc9cf"
    );

    script.onload = function () {
      console.log("✅ Umami Analytics cargado correctamente");
    };

    script.onerror = function () {
      console.log("⚠️ Umami no disponible, usando solo tracking local");
      // Intentar CDN alternativo
      loadUmamiAlternative();
    };

    document.head.appendChild(script);
  } catch (error) {
    console.log("⚠️ Error cargando Umami:", error);
  }
}

// CDN alternativo para Umami
function loadUmamiAlternative() {
  try {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://umami.is/script.js";
    script.setAttribute(
      "data-website-id",
      "1e5617ab-8abc-4d70-8ebd-c8a44efdc9cf"
    );

    script.onload = function () {
      console.log("✅ Umami Analytics (CDN alternativo) cargado correctamente");
    };

    script.onerror = function () {
      console.log(
        "⚠️ Umami CDN alternativo también falló, solo tracking local activo"
      );
    };

    document.head.appendChild(script);
  } catch (error) {
    console.log("⚠️ Error con CDN alternativo de Umami:", error);
  }
}

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

    // Debug: mostrar que funciona
    console.log(`✅ Tracking local: Visita #${visits.length} registrada`);
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

    // Verificar si Umami está cargado
    const umamiStatus = window.umami ? "✅ Activo" : "❌ No disponible";

    const info = `📊 Analytics Portfolio Aleixo

🔢 Visitas locales: ${totalVisits}
📅 Última visita: ${lastVisit}
🌐 URL actual: ${window.location.href}
📱 Sesión actual: ${new Date().toLocaleString()}

📈 Umami Analytics: ${umamiStatus}
💾 Tracking local: ✅ Activo

💡 Si Umami está activo, ve a https://cloud.umami.is para estadísticas completas`;

    alert(info);
  } catch (error) {
    alert("❌ Error al cargar estadísticas locales");
  }
}
