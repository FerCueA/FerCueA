# FerCueAstro - Guía de Arquitectura

## Resumen Ejecutivo

**FerCueAstro** es un portafolio web moderno construido con **Astro** y **Tailwind CSS**, diseñado con un patrón de hub interactivo donde los visitantes exploran diferentes secciones de contenido con transiciones suaves.

### Stack Principal
- **Framework**: Astro 6.1.1
- **Estilos**: Tailwind CSS
- **Lenguaje**: TypeScript
- **Animaciones**: View Transition API

---

## Arquitectura General

### Capas

```
┌─────────────────────────────────────┐
│     Pages (src/pages/)              │  ← Puntos de entrada
├─────────────────────────────────────┤
│  Layouts (src/layouts/)             │  ← Envoltorio global
├─────────────────────────────────────┤
│  Components (src/components/)       │
│  ├─ front/   (PortfolioHub)         │  ← Orquestador
│  ├─ sections/                       │
│  │  └─ [domain]/                    │  ← Contenido por dominio
│  ├─ ui/      (Components comunes)   │  ← Reutilizables
│  └─ layout/  (Layout components)    │  ← Estructura base
├─────────────────────────────────────┤
│  Data (src/data/)                   │  ← Configuración
│       └─ portfolio.ts               │     Fuente de verdad
├─────────────────────────────────────┤
│  Utils (src/utils/)                 │  ← Funciones helpers
│       └─ viewTransitions.ts         │     Lógica de transiciones
├─────────────────────────────────────┤
│  Styles (src/styles/)               │  ← Estilos globales
│       └─ global.css                 │     Temas y variables
└─────────────────────────────────────┘
```

### Flujo de Datos

```
portfolio.ts (fuente única de verdad)
    ↓
├─ PortfolioHub (distribuye a secciones)
│    ↓
│    ├─ Sections
│    │  ├─ HeroSection (profile/)
│    │  ├─ ProjectsSection (work/)
│    │  ├─ ServicesSection (services/)
│    │  ├─ TechnologiesSection (expertise/)
│    │  ├─ CertificatesSection (credentials/)
│    │  └─ ContactSection (engagement/)
│    └─ UI Components (SectionIntro, etc.)
│
└─ Layout Components
   ├─ SiteHeader
   ├─ SiteFooter
   └─ BackgroundGlow
```

---

## Patrones Clave

### 1. Hub Pattern (Interactividad)
El portafolio funciona como un hub central:
- **Estado Inicial**: Nombre + menú de secciones
- **Al Hacer Click**: Transición suave a sección seleccionada
- **Volver**: Botón regresa al menú inicial

**Implementación**: `src/components/front/PortfolioHub.astro`

### 2. Domain-Driven Organization (Estructura)
Secciones agrupadas por área de contenido, no por tipo técnico:
```
sections/
├── profile/      (Información personal)
├── work/         (Proyectos realizados)
├── services/     (Servicios ofrecidos)
├── expertise/    (Habilidades técnicas)
├── credentials/  (Formación y certificados)
└── engagement/   (Canales de contacto)
```

### 3. Configuration as Code (Mantenibilidad)
Todo el contenido y configuración en `src/data/portfolio.ts`:
```typescript
// Editar aquí = actualizar portafolio
export const profile = { ... }
export const projects = [ ... ]
export const services = [ ... ]
export const hubSections = [ ... ]
```

### 4. Utility-First Styling (Visual)
Tailwind CSS primero, valores arbitrarios cuando sea necesario:
```astro
<h1 class="font-serif text-[clamp(1.9rem,6.2vw,5.1rem)]">
  Título responsive complejo
</h1>
```

---

## Guardrails Técnicos

### Tailwind CSS como Estándar
Do: Todos los estilos deben usar clases de Tailwind  
Dont: Nunca agregar bloques `<style>` a componentes  
Tip: Usar valores arbitrarios para casos especiales: `text-[14px]`

### Composición sobre Herencia
Do: Componentes pequeños y reutilizables (SectionIntro)  
Dont: No copiar código entre secciones  
Do: Props configurables en vez de variantes duplicadas

### Datos Centralizados
Do: portfolio.ts es la fuente única de verdad  
Dont: No hardcodear textos en componentes  
Do: Cambios de contenido = editar JSON/arrays en `portfolio.ts`

---

## Guía Rápida (Tareas Comunes)

### Cambiar el nombre del portafolio
```typescript
// src/data/portfolio.ts
export const profile = {
  name: 'Tu Nombre Aquí',  // ← editar
  role: '...',
  // ...
};
```

### Agregar un nuevo proyecto
```typescript
// src/data/portfolio.ts
export const projects = [
  {
    title: 'Mi nuevo proyecto',
    description: 'Lo que hace',
    // ... más campos
  },
  // ... proyectos existentes
];
```

### Cambiar colores de tema
```css
/* src/styles/global.css */
@theme {
  --color-gold-main: #nuevo-color;
  --color-violet-deep: #nuevo-color;
  /* ... */
}
```

### Agregar nueva sección navegable
1. Crear carpeta: `src/components/sections/mi-area/`
2. Crear componente: `MiSection.astro`
3. Agregar a `portfolio.ts`:
   ```typescript
   export const hubSections = [
     // ...
     { id: 'miseccion', label: 'Mi Sección' },
   ];
   ```
4. Importar en `PortfolioHub.astro` y agregar panel

Más detalles en [ARCHITECTURE.md](src/components/ARCHITECTURE.md)

---

## Estructura por Carpeta

```
FerCueAstro/
├── src/
│   ├── pages/
│   │   └── index.astro              # Página principal
│   ├── layouts/
│   │   └── MainLayout.astro         # Layout wrapper global
│   ├── components/
│   │   ├── front/
│   │   │   └── PortfolioHub.astro   # Orquestador central
│   │   ├── sections/
│   │   │   ├── profile/
│   │   │   ├── work/
│   │   │   ├── services/
│   │   │   ├── expertise/
│   │   │   ├── credentials/
│   │   │   └── engagement/
│   │   ├── ui/
│   │   │   └── SectionIntro.astro
│   │   ├── layout/
│   │   │   ├── BackgroundGlow.astro
│   │   │   ├── SiteHeader.astro
│   │   │   └── SiteFooter.astro
│   │   └── ARCHITECTURE.md          # Documentación detallada
│   ├── data/
│   │   └── portfolio.ts             # Base de datos del portafolio
│   ├── utils/
│   │   └── viewTransitions.ts       # Lógica de transiciones
│   ├── styles/
│   │   └── global.css               # Estilos y temas globales
│   └── layouts.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── ARCHITECTURE_GUIDE.md             # Este archivo
```

---

## Decisiones Arquitectónicas

| Decisión | Razón |
|----------|-------|
| **Tailwind sobre CSS Module** | Velocidad de desarrollo, consistencia, facilidad de mantenimiento |
| **Portfolio.ts centralizado** | Cambios de contenido sin tocar componentes |
| **Sections por dominio** | Escalabilidad, claridad, separación de responsabilidades |
| **View Transition API** | Animaciones suaves, experiencia moderna, soporte progresivo |
| **Astro Static Output** | Performance, simplicidad, facilidad de deploy |
| **Components en carpetas** | Mejor navegación, escalabilidad de la codebase |

---

## Ciclo de Vida

```
npm run dev          # Desarrollo local (localhost:4321)
npm run build        # Compilación para producción
npm run preview      # Preview de build estático
```

---

## Recursos

- **Documentación**:  
  Detallada → [src/components/ARCHITECTURE.md](src/components/ARCHITECTURE.md)  
  Esta guía → [ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md)

- **Tecnologías**:  
  [Astro](https://docs.astro.build) | [Tailwind](https://tailwindcss.com) | [TypeScript](https://www.typescriptlang.org/)

- **APIs Utilizadas**:  
  [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

---

## Características Especiales

### View Transitions Suaves
Cambios entre secciones con animación nativa del navegador

### Responsive Completo
Tailwind + clamp() = diseño que escala automáticamente

### Accesibilidad
ARIA labels, navegación por teclado, semántica HTML correcta

### Sin Dependencias de Runtime
Todo es estático compilado a HTML/CSS/JS vanilla

---

## Próximos Pasos para Extender

1. Estructura lista - Agregar nuevas secciones fácilmente
2. Estilos consistentes - Sistema basado en Tailwind
3. Datos centralizados - Mantenimiento simple
4. Animations - Considerar más transiciones personalizadas
5. Dark Mode - Agregar soporte de tema oscuro
6. i18n - Internacionalización para múltiples idiomas

---

Última actualización: 27 de marzo de 2026  
Versión: 1.0.0
