# FerCueAstro

Portafolio web construido con Astro y Tailwind CSS, diseñado como hub interactivo de secciones. El proyecto prioriza rendimiento, claridad visual y mantenimiento sencillo desde una fuente de datos central.

## Qué incluye

- Navegación tipo hub con paneles dinámicos
- Secciones organizadas por dominio: Perfil, Proyectos, Servicios, Tecnologías, Certificados y Contacto
- Diseño responsive con foco en mobile
- Transiciones visuales con fallback para dispositivos pequeños y usuarios con reduced motion
- Contenido centralizado en un único archivo de datos

## Stack

| Herramienta | Versión |
| --- | --- |
| Astro | 6.1.1 |
| Tailwind CSS | 4.2.2 |
| TypeScript | Incluido vía Astro |

## Requisitos

- Node.js >= 22.12.0
- npm

## Inicio rápido

```bash
npm install
npm run dev
```

Aplicación local en http://localhost:4321

## Build y preview

```bash
npm run build
npm run preview
```

## Scripts

| Script | Descripción |
| --- | --- |
| npm run dev | Levanta entorno de desarrollo |
| npm run build | Genera salida estática en dist |
| npm run preview | Sirve localmente la build de dist |

## Estructura principal

```text
src/
  components/
    front/PortfolioHub.astro
    layout/
    sections/
      profile/
      work/
      services/
      expertise/
      credentials/
      engagement/
    ui/
  data/portfolio.ts
  layouts/MainLayout.astro
  pages/index.astro
  styles/global.css
  utils/viewTransitions.ts
```

## Personalización

### 1) Editar contenido

Toda la información editable está en src/data/portfolio.ts:

- profile
- navigationLinks y hubSections
- projects
- services
- skillGroups
- certificates
- contactLinks

### 2) Ajustar estilo visual

Variables de tema global en src/styles/global.css dentro de @theme:

- --color-ink
- --color-violet-deep
- --color-gold-main
- --color-paper

### 3) Añadir nueva sección al menú

1. Crear componente de sección en src/components/sections/
2. Agregar entrada en hubSections en src/data/portfolio.ts
3. Importar y renderizar el panel en PortfolioHub.astro

## Comportamiento UX actual

- Menú principal con acceso a paneles por botones
- Botón Volver al menú dentro del stage de contenido
- Certificados en carrusel horizontal en mobile y grid en tablet/desktop
- Botones de acceso rápido desde Perfil conectados al sistema de paneles

## Despliegue

Proyecto estático apto para Netlify, Vercel, GitHub Pages u hosting tradicional.

Configuración base:

- Comando de build: npm run build
- Carpeta de publicación: dist

## Documentación adicional

- ARCHITECTURE_GUIDE.md
- src/components/ARCHITECTURE.md

## Notas

- Si solo necesitas actualizar textos, no hace falta tocar componentes: modifica src/data/portfolio.ts
- Para cambios de interacción entre paneles, revisar src/utils/viewTransitions.ts y src/components/front/PortfolioHub.astro

---

Última actualización: 28 de marzo de 2026
