Decisiones
Estructura de carpetas
Mantener la estructura actual y agregar solo lo faltante ahora: components/ui/, hooks/, utils/, types/, constants/, pages/ y test/.
src/app/ lo dejamos para cuando metamos router/store. No reestructuramos masivo hoy.

Archivos nuevos vs existentes

Reemplazar (overwrite) completos:

eslint.config.js (flat v9)

.prettierrc, .prettierignore, .editorconfig

stylelint.config.cjs

.github/workflows/ci.yml (si no existe; si existe, crear job nuevo ci y mantener el tuyo)

commitlint.config.cjs

Modificar (merge controlado):

vite.config.ts: solo resolve.alias, server/preview (port/strictPort), y bloque test.

package.json: agregar scripts (predev, check, etc.), engines, packageManager; no borrar scripts propios existentes.

tsconfig.json: activar flags estrictos y paths.

.gitignore: añadir entradas sin quitar las que tengan.

Añadir (si faltan):

src/test/setup.ts, playwright.config.ts, .env.example, src/utils/env.ts (si usan Zod).

Dependencias adicionales

Esenciales (instalar ahora):

Lint/format: eslint@^9 @eslint/js globals typescript-eslint@^8 eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-unused-imports eslint-plugin-simple-import-sort prettier

CSS lint: stylelint stylelint-config-standard stylelint-config-tailwindcss

QA util: kill-port

Tests base: vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom

Opcionales (post-setup, cuando las uses):

clsx, tailwind-merge (si empiezan a componer variantes complejas)

zod (si validamos env en runtime)

@playwright/test (si van a correr E2E ahora; si no, más adelante)

Implementación gradual
Opción B) Paso a paso. Orden sugerido:

CLAUDE.md (reglas ya definidas) – confirmar versión final.

Configs esenciales (ESLint flat, Prettier, Stylelint, Vite strictPort/alias, tsconfig estricto).

Scripts QA y Husky.

Vitest (unit/integration).

Opcionales: Playwright, Zod, clsx/tw-merge.

CI (GitHub Actions).

To-Do para el agente (checklist corto)
Desinstalar lo incompatible:
pnpm remove eslint-plugin-tailwindcss

Instalar esenciales (lista del punto 3 “Esenciales”).

Aplicar archivos:

Overwrite y merge según el punto 2.

Confirmar postcss.config.js con @tailwindcss/postcss.

Crear carpetas faltantes:
src/components/ui, src/hooks, src/utils, src/types, src/constants, src/pages, src/test.

Verificar:

pnpm format

pnpm lint

pnpm stylelint

pnpm test

pnpm qa:verify

pnpm dev (puerto 5173 fijo, sin saltos)

(Opcional ahora / luego): agregar zod, clsx, tailwind-merge, Playwright, y el workflow de CI.

Con esto respondemos las 4 dudas y dejamos un camino único de implementación sin sorpresas. 