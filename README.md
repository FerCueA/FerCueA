# FerCueAstro

Portafolio web moderno e interactivo construido con **Astro** y **Tailwind CSS**. Presenta un patrón de hub donde los visitantes pueden explorar diferentes secciones de contenido con transiciones suaves y sin fricciones.

## Características

- Hub Interactivo - Menú central con navegación fluida entre secciones
- Tailwind-First - Estilos únicamente con utilidades de Tailwind CSS
- Responsive Completo - Diseño adaptable a todos los dispositivos
- Estático & Rápido - HTML puro sin overhead de JavaScript
- View Transitions - Animaciones nativas del navegador entre vistas
- Fácil de Mantener - Toda la información centralizada en `portfolio.ts`
- Arquitectura Limpia - Componentes organizados por dominio, no por tipo

## Stack Tecnológico

| Herramienta | Versión | Propósito |
|-----------|---------|----------|
| **Astro** | 6.1.1 | Framework estático |
| **Tailwind CSS** | - | Utilidades de estilos |
| **TypeScript** | - | Type safety |
| **View Transition API** | - | Animaciones nativas |

## Estructura del Proyecto

```
src/
├── pages/
│   └── index.astro              # Página principal
├── layouts/
│   └── MainLayout.astro         # Layout global reutilizable
├── components/
│   ├── front/
│   │   └── PortfolioHub.astro   # Orquestador principal
│   ├── sections/
│   │   ├── profile/             # Sección "Perfil"
│   │   ├── work/                # Sección "Proyectos"
│   │   ├── services/            # Sección "Servicios"
│   │   ├── expertise/           # Sección "Tecnologías"
│   │   ├── credentials/         # Sección "Certificados"
│   │   └── engagement/          # Sección "Contacto"
│   ├── ui/                      # Componentes reutilizables
│   └── layout/                  # Componentes de layout
├── data/
│   └── portfolio.ts             # Toda la información del portafolio
├── utils/
│   └── viewTransitions.ts       # Lógica de transiciones visuales
└── styles/
    └── global.css               # Estilos globales y variables
```

## Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:4321`

### Producción

```bash
# Compilar para producción
npm run build

# Preview local del build
npm run preview
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build` | Compila el proyecto a `./dist/` |
| `npm run preview` | Preview del build compilado |

## Personalizar el Portafolio

### 1. Cambiar Información Personal

Edita `src/data/portfolio.ts`:

```typescript
export const profile = {
  name: 'Tu Nombre',
  role: 'Tu Profesión',
  intro: 'Brevemente quién eres...',
};
```

### 2. Agregar Proyectos

```typescript
export const projects = [
  {
    title: 'Mi Proyecto',
    description: 'Lo que hace...',
    category: 'Web',
    status: 'Publicado',
    stack: ['Astro', 'Tailwind'],
    liveUrl: 'https://proyecto.com',
    repoUrl: 'https://github.com/...',
    outcome: 'Resultado esperado...',
  },
  // Más proyectos...
];
```

### 3. Cambiar Colores de Tema

En `src/styles/global.css`, edita la sección `@theme`:

```css
@theme {
  --color-gold-main: #c99b45;      /* Acentos principales */
  --color-violet-deep: #5f4b78;    /* Acentos secundarios */
  --color-ink: #1f2433;            /* Texto */
  --color-paper: #f7f3eb;          /* Fondo claro */
  /* ... más colores */
}
```

### 4. Agregar Nueva Sección Navegable

1. Crear carpeta: `src/components/sections/mi-area/`
2. Crear componente: `MiSection.astro`
3. Agregar a `portfolio.ts`:
   ```typescript
   export const hubSections = [
     // ...
     { id: 'miseccion', label: 'Mi Sección' },
   ];
   ```
4. Importar en `PortfolioHub.astro` y agregar el panel correspondiente

Para detalles completos, consulta [src/components/ARCHITECTURE.md](src/components/ARCHITECTURE.md)

## Documentación

- [ARCHITECTURE_GUIDE.md](ARCHITECTURE_GUIDE.md) - Guía de arquitectura y decisiones técnicas
- [src/components/ARCHITECTURE.md](src/components/ARCHITECTURE.md) - Documentación detallada de componentes y patrones

## Conceptos Clave

### Hub Pattern

El portafolio funciona como un hub central:
```
Pantalla inicial         Pantalla con sección
┌──────────────────┐    ┌──────────────────┐
│    Nombre        │    │    Nombre        │
│  [Perfil]        │ -> │  [Perfil] ✓      │
│  [Proyectos]     │    │ Contenido de     │
│  [Servicios]     │    │ la sección...    │
│  [Contacto]      │    │ [Volver al menú] │
└──────────────────┘    └──────────────────┘
```

### Tailwind-First

Todos los estilos usan clases de Tailwind. Ejemplo:

```astro
<h1 class="font-serif text-[clamp(1.9rem,6.2vw,5.1rem)] text-ink">
  Título responsive
</h1>
```

### Información Centralizada

Cambiar contenido es editar JSON en `portfolio.ts`:

```typescript
// Editar aquí = portafolio actualizado automáticamente
export const contactLinks = [ ... ]
export const services = [ ... ]
export const certificates = [ ... ]
```

## Deploy

El proyecto genera HTML estático puro. Puedes deployar en cualquier servicio:

- Netlify: Connect repo → build `npm run build` → publish `dist/`
- Vercel: Seleccionar framework "Other"
- GitHub Pages: Usar Actions para compilar y publicar
- Tu host: Subir carpeta `dist/` vía FTP/SFTP

## Contribuir

Este es un proyecto personal. Para mejoras, fork y experimenta libremente.

## Licencia

Proyecto personal. Usa como base para tu portafolio.

---

Creado con Astro + Tailwind CSS

Última actualización: 27 de marzo de 2026
