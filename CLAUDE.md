# CLAUDE.md - Reglas de Desarrollo

> **Stack**: React 19 + Vite + TypeScript + Tailwind v4 + Vitest + Playwright  
> **QA activo**: ESLint (flat config), Stylelint, Husky + lint-staged, scripts de verificación, Vite strictPort

---

## 📁 Arquitectura y Estructura

### REGLA: Organización de carpetas
```
src/
  components/     # Componentes reutilizables
    ui/          # UI atómica (Button, Input, Card) – puede incluir shadcn/ui
    layout/      # Layouts (Header, Sidebar, Shell)
    feature/     # Componentes específicos de features
  pages/         # Rutas/páginas (vistas de alto nivel)
  hooks/         # Custom hooks (useXxx)
  utils/         # Utilidades puras (formatters, helpers)
  types/         # Tipos TS compartidos (DTOs, dominios)
  constants/     # Constantes de la app
  assets/        # Imágenes, fuentes estáticas
  test/          # Setup de testing
  index.css      # ÚNICA hoja de estilos (Tailwind v4)
  main.tsx       # Bootstrap React
```

### REGLA: Alias y paths
- **Alias obligatorio** `@` → `src/*` para imports absolutos
- **NO usar** imports relativos quebrados (`../../../`)
- **Mantener imports ordenados** (plugin simple-import-sort)

### REGLA: Subcarpetas
- **Máximo 3 niveles** de profundidad
- **Crear subcarpetas** solo cuando existan ≥3 archivos afines

### REGLA: Archivos de estilo
- **SOLO** `src/index.css` con Tailwind v4 (`@import "tailwindcss";`)
- **PROHIBIDO** `App.css`, `*.module.css`, `global.css` adicionales
- **Componentes**: estilos EN CLASES TAILWIND, no CSS aparte

### ❌ NUNCA:
- Mezclar UI genérica con lógica de negocio en `components/ui`
- Importar hojas `.css` desde componentes
- Anidar carpetas sin necesidad

### ✅ SIEMPRE:
- Co-ubicar archivos relacionados (componente + tests + tipos)
- Usar imports con alias `@/`
- Mantener estructura simétrica entre `components/feature` y `pages/`

---

## 🔧 Desarrollo React/TypeScript

### REGLA: Componentes (forma y export)
```typescript
// ✅ FORMATO PREFERIDO
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "primary", className, ...rest }: ButtonProps) => {
  return (
    <button 
      className={`base-styles ${variant === 'primary' ? 'primary-styles' : 'secondary-styles'} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
```

### REGLA: Estado y efectos
- **useState** para estado local simple
- **useReducer** para lógica con múltiples transiciones
- **useEffect** sin efectos colaterales en render; limpiar con `return`
- **Dependencias completas** en useEffect (ESLint lo exige)

### REGLA: Hooks y separación de lógica
- **Extraer** lógica reutilizable a custom hooks cuando:
  - La lógica cruza componentes
  - Hace IO (fetch), subscripciones o sincroniza con el exterior
- **Mantener componentes presentacionales** livianos

### REGLA: Tipado
- **Preferir** `type` para props simples, `interface` cuando se extienda/mergee
- **Usar** `React.ComponentProps<typeof Button>` para reusar props
- **Imports de tipos** como type (`import type { X } from '...'`)

### ❌ NUNCA:
- Usar `any` (salvo migraciones puntuales justificadas)
- Usar `useEffect` para computar valores (usar `useMemo`)
- Crear componentes de >200 líneas (extraer subcomponentes)

### ✅ SIEMPRE:
- Memorizar callbacks pasados a child memoizados (`useCallback`)
- Key estable en listas (id), NO index de array
- Manejar errores de render con Error Boundaries si aplica

---

## 🎨 Reglas específicas de Tailwind CSS

### REGLA: Uso de utilidades
- **Primer recurso**: utilidades Tailwind en el JSX
- **Crear componentes reutilizables** cuando la combinación se repite ≥3 veces
- **Usar variants**: para size/variant/state usar `clsx` o `tailwind-merge`

### REGLA: Orden mental de clases
1. **Layout** (flex, grid, gap, container)
2. **Espaciado** (p-*, m-*)
3. **Tamaño** (w-*, h-*)
4. **Tipografía** (text-*, font-*, leading-*)
5. **Color** (bg-*, text-*, border-*)
6. **Interacción** (hover:, focus:, aria-*, disabled:)
7. **Responsive** (sm:, md:, lg:, xl:)
8. **Dark mode** (dark:)

### REGLA: Responsive y dark mode
- **Usar prefijos** `sm:/md:/lg:/xl:` y `dark:` directamente
- **NO crear** media queries manuales

### REGLA: Clases custom
- **Evitarlas**. Si son necesarias: prefijo `tw-`, documentadas y mínimas
- **NADA** de `!important`

### ❌ NUNCA:
- Añadir frameworks CSS adicionales (Bootstrap, etc.)
- Escribir CSS "global" que compita con Tailwind
- Usar clases ajenas (`btn btn-primary`)

### ✅ SIEMPRE:
- Mantener `postcss.config.js` con `@tailwindcss/postcss`
- Verificar QA (`pnpm qa:verify`) tras cambios de build

---

## 🧪 Reglas de Testing

### REGLA: Qué testear
- **Unit**: render básico, props, estados visibles, lógica pura
- **Integration**: interacción de componentes, flujos de usuario
- **E2E**: rutas principales y flujos críticos

### REGLA: Estructura
- **Nombre**: `*.test.tsx` (o `.test.ts` en utils)
- **Ubicación**: junto al archivo probado (`Button.tsx` ↔ `Button.test.tsx`)

### REGLA: Patrones
```typescript
// ✅ EJEMPLO DE TEST
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("<Button />", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

### REGLA: Queries y mocks
- **Queries por rol/texto** (`getByRole`, `findByText`) - no por clases
- **Mock local** al test; para suites grandes usar MSW
- **No mockear** lo que quieras verificar

### ❌ NUNCA:
- Testear implementaciones internas (solo comportamiento observable)
- Usar `data-testid` si hay alternativa por rol/texto

### ✅ SIEMPRE:
- `pnpm test` debe pasar antes de commits
- Al menos un test por componente público en `components/ui`

---

## ⚡ Performance y Best Practices

### REGLA: Memoización
- **React.memo** en componentes puros con props estables
- **useMemo** para cálculos costosos o arrays grandes
- **useCallback** para handlers pasados a child memoizados

### REGLA: Carga diferida
- **lazy() + Suspense** para rutas/páginas pesadas
- **Dividir bundles** por ruta o feature

### REGLA: Assets
- **Imágenes optimizadas** (formatos modernos si aplica)
- **Evitar inliners gigantes** en JSX

### ❌ NUNCA:
- Calcular en render valores que no cambian
- Pasar objetos/funciones inline a child memoizados sin useCallback/useMemo

### ✅ SIEMPRE:
- Medir (Lighthouse/Bundle Analyzer) antes de optimizar
- Reutilizar componentes de `components/ui`

---

## 📝 Git y Versionado

### REGLA: Commits (Conventional Commits)
- `feat(ui): agrega Button con variantes`
- `fix(layout): corrige gap en Header`
- `chore: actualiza deps`
- `refactor(feature): extrae hook de paginado`
- `test(Button): agrega tests básicos`

### REGLA: Frecuencia
- **Commits atómicos**; PRs pequeños (100-300 líneas netas)
- **Un commit** por intención, no "todo junto"

### REGLA: Branches
- `feat/<descripcion>`
- `fix/<descripcion>`
- `chore/<descripcion>`

### ❌ NUNCA:
- Commit directo a `main`
- Mezclar cambios de refactor con features sin explicación

### ✅ SIEMPRE:
- Describir *por qué* en el cuerpo cuando no sea obvio
- Actualizar tests cuando cambie comportamiento

---

## 🚫✅ Do's & Don'ts del Stack

### ❌ NUNCA:
- Usar `eslint-plugin-tailwindcss` (incompatible con Tailwind v4)
- Crear estilos globales fuera de `src/index.css`
- Permitir que Vite cambie de puerto (usar `strictPort`)
- Incluir dependencias sin justificar impacto

### ✅ SIEMPRE:
- Mantener Tailwind v4 con `@tailwindcss/postcss`
- Correr `pnpm check` antes de PR
- Usar `server.port=5173` y `strictPort=true`
- Escribir componentes pequeños, tipados y con props claras

---

## 🧩 Templates de Código

### Template: Componente UI
```typescript
// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "primary", className = "", ...rest }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "bg-neutral-200 hover:bg-neutral-300 text-neutral-900",
    ghost: "bg-transparent hover:bg-neutral-100 text-neutral-900",
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Template: Hook personalizado
```typescript
// src/hooks/useDebouncedValue.ts
import { useEffect, useState } from "react";

export const useDebouncedValue = <T>(value: T, delay = 250) => {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  
  return debounced;
};
```

### Template: Página
```typescript
// src/pages/HomePage.tsx
import Button from "@/components/ui/Button";

const HomePage = () => {
  return (
    <main className="container mx-auto p-6">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Bienvenido</h1>
        <p className="text-neutral-600">
          Base React + Vite + TS + Tailwind v4 configurada correctamente.
        </p>
        <Button variant="primary">Empezar</Button>
      </section>
    </main>
  );
};

export default HomePage;
```

### Template: Test
```typescript
// src/components/ui/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Button from "./Button";

describe("<Button />", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-neutral-200");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole("button"));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## ⚙️ Comandos de Desarrollo

```bash
# Desarrollo
pnpm dev          # Servidor en puerto 5173 (mata puertos colgados)

# Calidad
pnpm check        # Pipeline completo: lint + stylelint + test + qa:verify
pnpm lint         # Solo ESLint
pnpm test         # Solo tests
pnpm qa:verify    # Solo scripts de QA

# Build
pnpm build        # Build de producción
pnpm preview      # Preview del build
```

**Requisito**: `pnpm check` debe pasar antes de cualquier PR.