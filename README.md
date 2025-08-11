# React Vite TypeScript Tailwind v4 Boilerplate

**Stack completo y configurado**: React 19 + Vite + TypeScript + Tailwind v4 + QA completo

## 🚀 Quick Start

```bash
# Clonar este boilerplate
git clone https://github.com/PachuAI/bambu-react.git tu-nuevo-proyecto
cd tu-nuevo-proyecto

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

**¡Listo!** Servidor corriendo en http://localhost:5173

## 📁 Estructura del Proyecto

```
src/
  components/
    ui/          # Componentes básicos (Button, Input, etc.)
    layout/      # Layouts (Header, Sidebar, etc.)
    feature/     # Componentes específicos
  pages/         # Páginas/rutas
  hooks/         # Custom hooks
  utils/         # Funciones utilitarias
  types/         # Tipos TypeScript
  constants/     # Constantes
  assets/        # Imágenes, fuentes
  test/          # Setup de testing
```

## 🛠 Scripts Disponibles

```bash
pnpm dev        # Servidor de desarrollo (puerto 5173)
pnpm build      # Build de producción
pnpm preview    # Preview del build
pnpm test       # Ejecutar tests
pnpm lint       # Linter
pnpm check      # QA completo (lint + test + verificaciones)
```

## 🎯 Para Nuevos Proyectos

1. **Cambiar nombre del proyecto** en `package.json`
2. **Actualizar** `VITE_API_BASE_URL` en `.env`
3. **Personalizar** constantes en `src/constants/config.ts`
4. **Cambiar** remote origin: `git remote set-url origin tu-nuevo-repo.git`

## ✨ Características

- ✅ **Tailwind v4** correctamente configurado (no más errores de versión!)
- ✅ **ESLint + Prettier** con reglas estrictas
- ✅ **Vitest + React Testing Library** listos
- ✅ **Husky hooks** para commits limpios
- ✅ **Alias `@/`** para imports absolutos
- ✅ **Puerto fijo 5173** (no más puertos aleatorios)
- ✅ **Scripts de QA** que verifican configuración
- ✅ **Estructura profesional** lista para equipos

## 📖 Guías de Desarrollo

Lee `CLAUDE.md` para patrones de código, reglas y mejores prácticas.

## 🔧 Requisitos

- **Node.js** 20+
- **pnpm** 9+ (o npm/yarn)

---

**¡Happy coding!** 🎉