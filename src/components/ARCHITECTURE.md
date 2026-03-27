# Arquitectura de Componentes

Documentación sobre la estructura de componentes del portafolio y cómo extenderla.

## Estructura General

```
src/
├── components/
│   ├── front/              # Componentes específicos del hub
│   │   └── PortfolioHub.astro
│   ├── sections/           # Secciones de contenido por dominio
│   │   ├── profile/        # Sección de perfil/introducción
│   │   │   └── HeroSection.astro
│   │   ├── work/           # Sección de proyectos/trabajos
│   │   │   └── ProjectsSection.astro
│   │   ├── services/       # Sección de servicios
│   │   │   └── ServicesSection.astro
│   │   ├── expertise/      # Sección de tecnologías/habilidades
│   │   │   └── TechnologiesSection.astro
│   │   ├── credentials/    # Sección de certificados/credenciales
│   │   │   └── CertificatesSection.astro
│   │   └── engagement/     # Sección de contacto
│   │       └── ContactSection.astro
│   ├── ui/                 # Componentes UI reutilizables
│   │   └── SectionIntro.astro
│   └── layout/             # Componentes de layout global
│       ├── BackgroundGlow.astro
│       ├── SiteHeader.astro
│       └── SiteFooter.astro
├── data/
│   └── portfolio.ts        # Configuración centralizada
├── layouts/
│   └── MainLayout.astro    # Layout base reutilizable
├── utils/
│   └── viewTransitions.ts  # Utilidades para transiciones visuales
└── styles/
    └── global.css          # Estilos globales y temas
```

## Principios de Diseño

### 1. **Organización por Dominio**
Las secciones están organizadas por área de negocio/contenido, no por tipo técnico:
- `profile/` - Todo sobre el perfil del desarrollador
- `work/` - Proyectos y trabajos realizados
- `services/` - Servicios ofrecidos
- `expertise/` - Habilidades y tecnologías
- `credentials/` - Certificaciones y formación
- `engagement/` - Canales de contacto

### 2. **Tailwind-First Approach**
- Todos los estilos se escriben usando clases de utilidad de Tailwind
- Uso de valores arbitrarios cuando sea necesario: `text-[clamp(1.9rem,6.2vw,5.1rem)]`
- Los `@theme` variables en `global.css` definen el color scheme del proyecto
- Evitar bloques `<style>` en componentes

### 3. **Configuración Centralizada**
- `src/data/portfolio.ts` contiene:
  - Información del perfil
  - Lista de navegación
  - Configuración de secciones del hub
  - Datos de proyectos, servicios, certificados, etc.
- Los componentes importan y consumen estos datos
- Cambios de contenido = editar `portfolio.ts`

### 4. **Reutilización de Componentes**
- `SectionIntro.astro` - Encabezado estándar para secciones
- `MainLayout.astro` - Layout base con props configurables:
  - `showHeader` - Mostrar/ocultar encabezado
  - `showFooter` - Mostrar/ocultar pie de página
  - `mainClass` - Personalizar clases del contenedor principal

### 5. **Separación de Responsabilidades**
- **PortfolioHub** - Maneja la visualización del hub y transiciones entre secciones
- **Sections** - Cada sección es responsable de su contenido y lógica
- **utils/viewTransitions** - Abstrae la lógica de transiciones visuales
- **data/portfolio** - Fuente única de verdad para el contenido

## Hub Pattern

El `PortfolioHub.astro` implementa un patrón de hub interactivo:

1. **Estado Inicial**: Muestra solo el nombre y menú de secciones
2. **Interacción**: Clic en sección activa transiciones suave a su contenido
3. **Gestión de Estado**: Usa View Transition API para animaciones fluidas
4. **Accesibilidad**: 
   - Botones con `aria-pressed` para estado activo
   - Panel con `aria-live` para anuncios dinámicos
   - Acceso por teclado completo

### Flujo de Transiciones
```
menu-cerrado          menu-abierto
    ↓                    ↑
[nombre]          [nombre + panel]
  [nav]    ←→       [panel contenido]
           click
```

## Componentes de Sección

### Estructura Básica

```astro
---
import { data } from '../../../data/portfolio';
import SectionIntro from '../../ui/SectionIntro.astro';
---

<section id="seccion-id" class="py-12 lg:py-16">
  <SectionIntro
    kicker="Palabra clave"
    title="Título Principal"
    description="Descripción breve"
  />
  
  {/* Contenido específico */}
</section>
```

### Rutas de Importación
Ajustar según la profundidad:
- Desde `sections/` → `../data/portfolio` (2 niveles)
- Desde `sections/dominio/` → `../../../data/portfolio` (3 niveles)

## Agregar una Nueva Sección

### Paso 1: Crear el Componente
```bash
mkdir -p src/components/sections/nueva-area/
# Crear NuevaSection.astro
```

### Paso 2: Implementar la Sección
```astro
---
import { datosNueva } from '../../../data/portfolio';
import SectionIntro from '../../ui/SectionIntro.astro';
---

<section id="nueva" class="py-12 lg:py-16">
  <SectionIntro
    kicker="Nueva"
    title="Mi nueva sección"
  />
  {datosNueva.map(item => (
    <div>{item.name}</div>
  ))}
</section>
```

### Paso 3: Agregar a Portfolio Data
En `src/data/portfolio.ts`:
```typescript
export const nuevaData = [
  { name: 'Item 1', ... },
];

// Agregar a hubSections si necesita que sea navegable
export const hubSections = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'nueva', label: 'Nueva Seccion' }, // ← agregar aquí
  // ...
];
```

### Paso 4: Conectar al Hub
En `src/components/front/PortfolioHub.astro`:
```astro
import NuevaSection from '../sections/nueva-area/NuevaSection.astro';

// En la sección #view-stage:
<div class="view-panel animate-[fadeIn_280ms_ease]" data-panel="nueva" hidden>
  <NuevaSection />
</div>
```

## View Transitions Utility

Ubicado en `src/utils/viewTransitions.ts`, proporciona:

### Funciones Principales
- `initializeViewState()` - Recolecta referencias DOM
- `updateView(state, targetId)` - Actualiza vista activa
- `runWithTransition(callback)` - Ejecuta con animación suave
- `setMenuButtonState(button, selected)` - Actualiza estado visual de botones
- `setOpenStateClasses(state, isOpen)` - Maneja cambios de flexibilidad del hub

### Uso
```typescript
import { initializeViewState, updateView, runWithTransition } from '../../utils/viewTransitions';

const viewState = initializeViewState();
menuButton.addEventListener('click', () => {
  runWithTransition(() => updateView(viewState, 'target-id'));
});
```

## Guía de Estilos

### Colores (CSS Variables)
Definidos en `src/styles/global.css`:
```css
--color-ink: #1f2433          /* Texto principal */
--color-violet-deep: #5f4b78  /* Acentos primarios */
--color-gold-main: #c99b45    /* Acentos secundarios */
--color-paper: #f7f3eb        /* Fondo claro */
--color-surface: #fffaf2      /* Superficie */
```

### Tipografía
- **Sans**: Space Grotesk (espaciado, información)
- **Serif**: Fraunces (títulos, énfasis)

### Espaciado
- Usar Tailwind: `py-12 lg:py-16`, `px-5 sm:px-8`
- Responsive: `text-[clamp(1rem, 2vw, 1.2rem)]`

### Bordes y Sombras
- Bordes: `border border-ink/8` (sutiles)
- Sombras activas: `shadow-lg shadow-black/8`
- Transiciones: `transition duration-300`

## Mejores Prácticas

✅ **Hacer:**
- Usar clases de Tailwind como primera opción
- Centralizar datos en `portfolio.ts`
- Reutilizar `SectionIntro` y componentes comunes
- Mantener componentes pequeños y enfocados
- Documentar extensiones con comentarios

❌ **Evitar:**
- Valores hardcodeados en componentes
- Bloques `<style>` sin justificación
- Copiar/pegar código entre secciones
- Modificar `MainLayout` para casos específicos (usar props en su lugar)
- Ignorar la semántica HTML y accesibilidad

## Debugging

### Issue: Imports no se resuelven
- Verificar el nivel correcto de `../` según la profundidad
- Usar `console.log()` en el compilador de Astro: `astro build`

### Issue: Estilos no se aplican
- Asegurar que Tailwind está compilado (ejecutar `npm run build`)
- Verificar que las clases están en la lista blanca de Tailwind
- Revisar que no hay conflictos de espaciado con bordes

### Issue: Transiciones no funcionan
- Verificar que el navegador soporta View Transition API
- Usar DevTools para confirmar que la API se está invocando
- Revisar `viewTransitions.ts` para la lógica correcta

## References

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
