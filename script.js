document.addEventListener("DOMContentLoaded", function () {
  var themeToggle = document.getElementById("theme-toggle");
  var themeIcon = document.getElementById("theme-icon");

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeIcon) themeIcon.className = 'bi bi-moon-fill';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeIcon) themeIcon.className = 'bi bi-sun-fill';
    }
  }

  function toggleTheme() {
    var isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  }

  // Inicializar tema al cargar
  (function initTheme() {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setTheme('dark');
    } else if (saved === 'light') {
      setTheme('light');
    } else {
      // Preferencia del sistema
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
    // Código innecesario eliminado
