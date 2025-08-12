# ARQUITECTURA FRONTEND - SISTEMA BAMBU CRM

**Versión**: 1.0  
**Fecha**: 2025-08-12  
**Stack**: React 19 + TypeScript + Vite + Tailwind v4  
**Estado**: Documento consolidado y alineado con Backend Laravel

---

## 1. OBJETIVOS DE ARQUITECTURA

### Principios Fundamentales
- **Velocidad y UX**: App-shell con render inmediato (skeletons) y navegación client-side
- **Predecible**: Contratos de datos estables, manejo unificado de errores y paginación
- **Testable**: Capa de datos mockeable (MSW) para desarrollar antes que exista el backend
- **Escalable**: Layout, routing y features desacoplados; componentes reutilizables y tipados

### Metas de Rendimiento
- **Tiempo de respuesta**: Máximo 2 segundos para operaciones normales
- **Búsquedas**: Resultados en menos de 500ms
- **Carga inicial**: Menos de 3 segundos
- **Interactividad**: TTI (Time to Interactive) < 2 segundos

---

## 2. STACK TECNOLÓGICO FRONTEND

### Core Framework
```yaml
Framework: React 19 ✅
Build Tool: Vite 7+ ✅  
Language: TypeScript strict ✅
Styling: Tailwind v4 PostCSS ✅
```

### Librerías Principales
```yaml
UI Components: shadcn/ui + custom components
State Management: 
  - Zustand (estado UI local)
  - React Query (server state/cache)
Forms: React Hook Form + Zod validation
Router: React Router v6 (lazy loading)
HTTP Client: Axios + React Query
Icons: Lucide React
```

### Desarrollo y QA
```yaml
Testing: Vitest + React Testing Library + Playwright
Linting: ESLint + Prettier + Tailwind class sorting
Type Checking: TypeScript strict mode
Mock Data: MSW (Mock Service Worker)
Bundle Analysis: Vite bundle analyzer
```

---

## 3. ESTRUCTURA DE CARPETAS

### Arquitectura de `src/`
```
src/
├── components/               # Componentes reutilizables
│   ├── ui/                  # shadcn/ui (Button, Input, Card, etc.)
│   ├── layout/              # Header, Sidebar, Shell, Breadcrumbs
│   ├── feature/             # Componentes específicos de features
│   └── shared/              # Tablas, modales, Empty/Error states
│
├── pages/                   # Páginas/rutas principales  
│   ├── HomePage.tsx         # Dashboard principal
│   ├── clientes/           # Módulo clientes
│   ├── productos/          # Módulo productos
│   ├── pedidos/            # Módulo pedidos/cotizaciones
│   ├── logistica/          # Planificación y seguimiento
│   └── reportes/           # Reportes y analytics
│
├── hooks/                  # Custom React hooks
├── utils/                  # Utilidades puras (formatters, helpers)
├── types/                  # Tipos TypeScript compartidos
├── constants/              # Constantes de la app
├── lib/                    # Configuraciones (http, storage, dates)
├── stores/                 # Zustand slices (estado UI)
├── mocks/                  # MSW handlers + fixtures
├── assets/                 # Imágenes, íconos
└── styles/                 # tailwind.css, tokens CSS
```

### Alias de Imports (tsconfig)
```typescript
// Configuración recomendada
"@/*": ["src/*"]
"@components/*": ["src/components/*"]  
"@pages/*": ["src/pages/*"]
"@utils/*": ["src/utils/*"]
"@types/*": ["src/types/*"]
"@stores/*": ["src/stores/*"]
```

---

## 4. NAVEGACIÓN Y ROUTING

### Estructura de Rutas (React Router v6)
```typescript
// Mapa lógico de rutas principales
/dashboard                    // Dashboard principal
/ventas/cotizador            // Nueva cotización
/ventas/pedidos              // Lista pedidos
/ventas/pedidos/:id          // Detalle pedido
/clientes                    // Lista clientes  
/clientes/:id                // Perfil cliente
/productos                   // Catálogo productos
/productos/:id               // Detalle producto
/logistica/planificacion     // Planificación repartos
/logistica/seguimiento       // Seguimiento entregas
/reportes                    // Reportes y analytics
/admin                       // Enlace a Filament (Laravel)
```

### App Shell
```typescript
// Estructura de layout principal
<AppShell>
  <Header>
    <QuickCreate />
    <GlobalSearch />
    <ThemeToggle />
    <UserMenu />
  </Header>
  
  <Sidebar collapsible>
    <Navigation />
  </Sidebar>
  
  <Main>
    <Breadcrumbs />
    <Outlet /> {/* Contenido dinámico */}
  </Main>
</AppShell>
```

### Guardas de Ruta
```typescript
// Protección por roles (tipos centralizados)
export type Role = 'admin' | 'operador' | 'logistica';

requireAuth()             // Usuario autenticado
requireRole("admin")      // Solo administradores  
requireRole("operador")   // Operadores comerciales
requireRole("logistica")  // Personal logística

// Helper para validar roles
export const hasRole = (user: User, role: Role) => 
  user.roles?.includes(role) ?? false;
```

---

## 5. ESTADO Y GESTIÓN DE DATOS

### Estrategia de Estado
- **React Query**: Para *server state* (cache, reintentos, invalidación automática)
- **Zustand**: Para estado *UI local* (filtros, paneles abiertos, wizard state)
- **React Hook Form**: Para estado de formularios

### Configuración React Query
```typescript
// Stale time por recurso
const queryConfig = {
  dashboardKPIs: { staleTime: 30_000 },      // 30 segundos
  productList: { staleTime: 60_000 },        // 1 minuto  
  clientList: { staleTime: 60_000 },         // 1 minuto
  staticData: { staleTime: 30 * 60_000 },    // 30 minutos
}

// Configuración global
refetchOnWindowFocus: true  // Excepto en formularios activos
retry: 3                    // 3 reintentos en errores de red
```

### Patrón de Custom Hooks
```typescript
// Ejemplo: useClientes
export const useClientes = (filters?: ClienteFilters) => {
  return useQuery({
    queryKey: ['clientes', filters],
    queryFn: () => clientesApi.getList(filters),
    staleTime: 60_000,
  });
};

// Ejemplo: useCreatePedido  
export const useCreatePedido = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pedidosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['pedidos']);
      queryClient.invalidateQueries(['dashboard']);
    },
  });
};
```

---

## 6. CONTRATOS FRONTEND ⟷ BACKEND

### Autenticación (Laravel Sanctum)
```typescript
// Opción preferida: Sanctum SPA (cookies stateful)
const authConfig = {
  baseURL: process.env.VITE_API_BASE_URL,
  withCredentials: true,  // Para cookies de sesión
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // 'X-XSRF-TOKEN' se incluye automáticamente
  }
};

// Flujo de autenticación
1. GET /sanctum/csrf-cookie  // Bootstrap CSRF  
2. POST /api/v1/auth/login   // Iniciar sesión
3. GET /api/v1/auth/me       // Validar usuario actual
4. POST /api/v1/auth/logout  // Cerrar sesión
```

### Convenciones API
```typescript
// Base URL y versionado
VITE_API_BASE_URL=http://localhost:8000
API_VERSION=/api/v1

// Formato de respuestas
interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    perPage: number; 
    currentPage: number;
  };
  links?: {
    next: string | null;
    prev: string | null;
  };
}

// Formato de errores  
interface ApiError {
  error: {
    code: string;           // 'VALIDATION_ERROR'
    message: string;        // Mensaje descriptivo
    details?: Record<string, string>; // Errores por campo
  };
}
```

### Estados y Mapeos
```typescript
// Estados de pedidos (backend → frontend)
const pedidoStates = {
  'borrador': 'Borrador',
  'confirmado': 'Confirmado', 
  'listo_envio': 'Listo para despacho',
  'en_transito': 'En ruta',
  'entregado': 'Entregado',
  'fallido': 'No entregado',
  'cancelado': 'Cancelado',
} as const;

// Estados de repartos (backend → frontend)
const repartoStates = {
  'programado': 'Planificado',
  'en_ruta': 'En ruta', 
  'entregado': 'Entregado',
  'fallido': 'No entregado',
} as const;
```

---

## 7. FORMULARIOS Y VALIDACIÓN

### Patrón con React Hook Form + Zod
```typescript
// Schema de validación
const clienteSchema = z.object({
  razonSocial: z.string().min(3, "Mínimo 3 caracteres"),
  direccion: z.string().min(5, "Dirección requerida"),
  telefono: z.string().regex(/^[0-9\-\+\(\)\s]+$/, "Teléfono inválido"),
  email: z.string().email("Email inválido").optional(),
});

type ClienteFormData = z.infer<typeof clienteSchema>;

// Componente de formulario
const ClienteForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
  });
  
  const createMutation = useCreateCliente();
  
  const onSubmit = (data: ClienteFormData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input 
        {...register("razonSocial")}
        error={errors.razonSocial?.message}
      />
      {/* ... más campos */}
    </form>
  );
};
```

### Estrategia de UI Optimista
- **Optimistic UI**: Solo para operaciones de bajo riesgo (notas, favoritos)
- **Confirmar tras servidor**: Para operaciones críticas (pedidos, stock, precios)

---

## 8. COMPONENTES UI Y DESIGN SYSTEM

### Tema y Colores (Tailwind v4)
```css
/* tokens base en src/styles/tailwind.css */
@import "tailwindcss";

/* Tema oscuro (Slate) - heredado del backend */
:root {
  --background: 222.2 84% 4.9%;        /* slate-900 */
  --foreground: 210 40% 98%;           /* slate-50 */
  --card: 222.2 84% 4.9%;             /* slate-900 */
  --card-foreground: 210 40% 98%;      /* slate-50 */
  --border: 217.2 32.6% 17.5%;        /* slate-800 */
  --input: 217.2 32.6% 17.5%;         /* slate-800 */
}

/* Colores semánticos */
.status-success { @apply bg-green-500/20 text-green-400; }
.status-warning { @apply bg-orange-500/20 text-orange-400; }
.status-error { @apply bg-red-500/20 text-red-400; }
.status-info { @apply bg-blue-500/20 text-blue-400; }
```

### Componentes shadcn/ui Base
```bash
# Componentes esenciales a instalar
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input  
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add skeleton
```

### Patrones de Componentes
```typescript
// Componente tabla estándar
<DataTable
  data={pedidos}
  columns={pedidosColumns}
  searchKey="cliente"
  filters={<PedidoFilters />}
  actions={<PedidoActions />}
  loading={isLoading}
  error={error}
  empty={<EmptyPedidos />}
/>

// Estados de carga unificados
<TableSkeleton rows={5} />
<EmptyState 
  icon={Package}
  title="No hay productos"
  description="Comienza agregando tu primer producto"
  action={<Button>Agregar producto</Button>}
/>
<ErrorState 
  title="Error al cargar datos"
  description="Intenta recargar la página" 
  action={<Button onClick={refetch}>Reintentar</Button>}
/>
```

---

## 9. ACCESIBILIDAD Y EXPERIENCIA DE USUARIO

### Atajos de Teclado (Hotkeys)
```typescript
// Cotizador (módulo crítico)
'Ctrl+1' | 'F1'  → Posicionar en búsqueda de cliente
'Ctrl+2' | 'F2'  → Posicionar en búsqueda de productos  
'Ctrl+3' | 'F3'  → Ir a modificar cantidades
'Ctrl+4' | 'F4'  → Confirmar cotización
'Enter'          → Confirmar selección actual
'Escape'         → Cancelar operación actual

// Navegación global
'Ctrl+K'         → Búsqueda global (cmdk)
'Ctrl+N'         → Nueva cotización
'Ctrl+D'         → Ir a dashboard
'Ctrl+/'         → Mostrar ayuda de atajos
```

### Implementación con react-hotkeys-hook
```typescript
const CotizadorPage = () => {
  const [searchFocus, setSearchFocus] = useState<'cliente' | 'producto' | null>(null);
  
  useHotkeys('ctrl+1, f1', () => setSearchFocus('cliente'));
  useHotkeys('ctrl+2, f2', () => setSearchFocus('producto')); 
  useHotkeys('escape', () => setSearchFocus(null));
  
  // ... resto del componente
};
```

### Estándares de Accesibilidad
- **ARIA labels**: En todos los controles interactivos
- **Foco visible**: Outline claro en navegación por teclado  
- **Contraste**: Mínimo 4.5:1 en textos
- **Screen readers**: Semántica HTML correcta
- **Skip links**: Para navegación rápida

---

## 10. TESTING Y CALIDAD

### Estrategia de Testing
```typescript
// Pruebas unitarias (Vitest + React Testing Library)
describe('CotizadorForm', () => {
  it('calcula descuentos automáticamente', async () => {
    render(<CotizadorForm />);
    
    const cantidadInput = screen.getByLabelText(/cantidad/i);
    await user.type(cantidadInput, '100');
    
    expect(screen.getByText(/descuento 5%/i)).toBeInTheDocument();
  });
});

// Pruebas de integración (MSW)
beforeEach(() => {
  server.use(
    rest.get('/api/v1/productos', (req, res, ctx) => {
      return res(ctx.json({ data: mockProductos }));
    })
  );
});

// Pruebas E2E (Playwright)  
test('flujo completo de cotización', async ({ page }) => {
  await page.goto('/ventas/cotizador');
  await page.fill('[data-testid="cliente-search"]', 'Almacén Central');
  await page.keyboard.press('Enter');
  
  await page.fill('[data-testid="producto-search"]', 'Detergente');
  await page.keyboard.press('Enter');
  
  await expect(page.locator('[data-testid="total"]')).toContainText('$');
});
```

### Cobertura y Métricas
- **Cobertura mínima**: 80% en utils y hooks críticos
- **Performance**: Bundle size < 500KB gzipped inicial
- **Performance budgets por ruta**:
  - Chunk inicial: < 180KB gzipped
  - Feature chunks: < 120KB gzipped cada uno
  - Verificación con `vite-bundle-visualizer` en CI
- **Lighthouse**: Score > 90 en Performance y Accessibility

---

## 11. MOCKS Y DESARROLLO SIN BACKEND

### Mock Service Worker (MSW)
```typescript
// src/mocks/handlers.ts
export const handlers = [
  rest.get('/api/v1/clientes', (req, res, ctx) => {
    const q = req.url.searchParams.get('q') || '';
    const filtered = mockClientes.filter(c => 
      c.razonSocial.toLowerCase().includes(q.toLowerCase())
    );
    
    return res(
      ctx.delay(200), // Simular latencia de red
      ctx.json({
        data: filtered,
        meta: { total: filtered.length, currentPage: 1, perPage: 20 }
      })
    );
  }),
  
  rest.post('/api/v1/pedidos', async (req, res, ctx) => {
    const pedido = await req.json();
    const nuevoPedido = {
      id: Date.now(),
      ...pedido,
      estado: 'confirmado',
      fechaCreacion: new Date().toISOString(),
    };
    
    return res(
      ctx.delay(300),
      ctx.status(201),
      ctx.json({ data: nuevoPedido })
    );
  }),
];
```

### Fixtures Realistas
```typescript  
// src/mocks/fixtures/clientes.ts
export const mockClientes: Cliente[] = [
  {
    id: 1,
    razonSocial: 'Almacén Central',
    direccion: 'Av. Roca 1234, General Roca',
    telefono: '0298-442-1234',
    email: 'almacencentral@email.com',
    activo: true,
  },
  {
    id: 2, 
    razonSocial: 'Supermercado Norte',
    direccion: 'Belgrano 567, Cipolletti', 
    telefono: '0299-477-5678',
    email: 'compras@supernorte.com',
    activo: true,
  },
  // ... más fixtures
];
```

---

## 12. INTEGRACIÓN CON BACKEND LARAVEL

### Variables de Entorno
```env
# .env para desarrollo
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCKS=true
VITE_APP_VERSION=1.0.0

# .env.production  
VITE_API_BASE_URL=https://api.bambu.com
VITE_USE_MOCKS=false
VITE_APP_VERSION=1.0.0
```

### Cliente HTTP con Axios
```typescript
// src/lib/http.ts
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  withCredentials: true, // Para cookies Sanctum
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Interceptor para CSRF token
api.interceptors.request.use(async (config) => {
  if (['post', 'put', 'delete'].includes(config.method || '')) {
    await ensureCsrfToken();
  }
  return config;
});

const ensureCsrfToken = async () => {
  if (!document.cookie.includes('XSRF-TOKEN')) {
    await axios.get('/sanctum/csrf-cookie');
  }
};
```

### Integración con Filament (Admin)
- **Enlace directo**: `/admin` abre Filament en nueva pestaña
- **SSO**: Cookies Sanctum compartidas si mismo dominio
- **Sin duplicación**: FE no gestiona funciones administrativas

---

## 13. DEPLOYMENT Y OPTIMIZACIÓN

### Build de Producción
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
```

### Optimizaciones de Rendimiento
- **Code splitting**: Por ruta y por feature usando React.lazy()
- **Tree shaking**: Automático con Vite + ES modules
- **Image optimization**: WebP + lazy loading  
- **Bundle analysis**: `npm run build:analyze`
- **Prefetching**: Rutas probables con `<link rel="prefetch">`

### Estrategia de Caching
```typescript
// Service Worker: evitar hardcodear assets con hash de Vite
// Opción A: Usar vite-plugin-pwa para generar manifest automáticamente
// Opción B: Confiar en React Query + HTTP caching (recomendado)
const CACHE_NAME = 'bambu-crm-v1';
// STATIC_ASSETS se genera dinámicamente con vite-plugin-pwa o se omite

// React Query para cache de datos de servidor
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos por defecto
      cacheTime: 10 * 60 * 1000, // 10 minutos en cache
    },
  },
});
```

---

## 14. MONITOREO Y OBSERVABILIDAD

### Error Tracking
```typescript  
// Error boundary personalizado
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log a endpoint opcional /api/v1/front-logs
    if (!import.meta.env.DEV) {
      logError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### Performance Monitoring
```typescript
// Custom hook para métricas de performance
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Medir First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
    
    return () => observer.disconnect();
  }, []);
};
```

---

## 15. ROADMAP DE IMPLEMENTACIÓN

### Fase 1: Fundaciones (Semanas 1-2)
- [x] Configuración inicial: React + Vite + TypeScript + Tailwind
- [x] App Shell: Header, Sidebar, Layout base
- [x] Sistema de routing básico con React Router
- [x] Configuración de shadcn/ui y tema
- [ ] Autenticación: Login, logout, middleware de rutas
- [ ] Error boundaries y estados de loading globales

### Fase 2: Core Features (Semanas 3-6) 
- [ ] Dashboard: KPIs básicos + skeletons
- [ ] Módulo Clientes: CRUD completo con búsqueda
- [ ] Módulo Productos: Catálogo + gestión de stock
- [ ] MSW: Mocks de todos los endpoints críticos
- [ ] Formularios: Validación con Zod + React Hook Form

### Fase 3: Ventas y Cotizaciones (Semanas 7-10)
- [ ] Cotizador: Interfaz optimizada con hotkeys
- [ ] Sistema de descuentos automático
- [ ] Gestión de pedidos: Estados + flujo completo
- [ ] Integración real con API Laravel
- [ ] Testing: Cobertura de componentes críticos

### Fase 4: Logística (Semanas 11-14)
- [ ] Planificación: Vista calendario + asignación vehículos  
- [ ] Seguimiento: Dashboard tiempo real
- [ ] Hojas de ruta: Generación e impresión
- [ ] Estados de entrega: Actualización desde móvil

### Fase 5: Optimización (Semanas 15-16)
- [ ] Reportes y analytics básicos
- [ ] Performance: Code splitting + lazy loading
- [ ] Testing E2E: Flujos críticos con Playwright
- [ ] Accesibilidad: Audit completo + mejoras
- [ ] Deployment: Pipeline de producción

---

## 16. CRITERIOS DE ÉXITO

### Métricas Técnicas
- **Performance**: Lighthouse > 90 en todas las categorías
- **Bundle size**: < 500KB inicial gzipped
- **TTI**: < 2 segundos en conexión 3G lenta
- **Error rate**: < 0.1% de errores JS no manejados

### Métricas de Negocio  
- **Tiempo de cotización**: Reducir de 15min a 3min
- **Adopción**: 100% de usuarios en 30 días
- **Satisfacción**: Score > 4/5 en encuestas UX
- **Errores**: Eliminar errores de cálculo manual

### Criterios de Calidad
- **Testing**: > 80% cobertura en utils críticos
- **Accesibilidad**: WCAG 2.1 AA compliance  
- **TypeScript**: 0 errores de tipado en build
- **Linting**: 0 warnings en build de producción

---

## ANEXOS

### A. Comandos de Desarrollo

```bash
# Desarrollo
npm run dev              # Servidor desarrollo (puerto 5173)
npm run build           # Build producción
npm run preview         # Preview build local

# Calidad
npm run lint            # ESLint
npm run lint:fix        # Fix automático
npm run type-check      # Verificar tipos TS
npm run test            # Tests unitarios
npm run test:e2e        # Tests end-to-end
npm run test:coverage   # Cobertura de tests

# shadcn/ui  
npx shadcn-ui@latest add [component]
npx shadcn-ui@latest add --all
```

### B. Estructura de Commits

```bash
# Conventional commits
feat(ui): agregar componente DataTable
fix(auth): corregir logout con Sanctum  
refactor(hooks): extraer lógica de useClientes
test(cotizador): agregar tests de descuentos
docs(readme): actualizar guía de instalación
```

### C. Variables de Entorno

```env
# Desarrollo local
VITE_API_BASE_URL=http://localhost:8000
VITE_USE_MOCKS=true
VITE_APP_VERSION=1.0.0-dev
VITE_LOG_LEVEL=debug

# Staging
VITE_API_BASE_URL=https://api-staging.bambu.com  
VITE_USE_MOCKS=false
VITE_APP_VERSION=1.0.0-rc
VITE_LOG_LEVEL=warn

# Producción
VITE_API_BASE_URL=https://api.bambu.com
VITE_USE_MOCKS=false  
VITE_APP_VERSION=1.0.0
VITE_LOG_LEVEL=error

# Backend Laravel .env (para Sanctum)
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:5173
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

---

**Documento creado**: 2025-08-12  
**Autor**: Equipo BAMBU  
**Estado**: Documento consolidado - Listo para implementación  
**Próxima revisión**: Al completar Fase 1