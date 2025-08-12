# 🛠️ STACK TECNOLÓGICO - SISTEMA BAMBU

**Estado**: ✅ **BACKEND OPERATIVO + FRONTEND REACT** | **Actualizado**: 2025-08-12

---

## 🎯 STACK COMPLETO CONSOLIDADO

### Backend - Laravel 11
```yaml
Framework: Laravel 11 ✅
Base de Datos: PostgreSQL 15+ ✅ (22 tablas, 16 migraciones)
API: Laravel Sanctum ✅ (autenticación SPA)
Admin Panel: Filament v3 ✅ (IMPLEMENTADO)
Cache/Queue: Redis (preparado)
Testing: PHPUnit ✅ (113 tests implementados)
```

### Base de Datos - PostgreSQL
```yaml
Motor: PostgreSQL 15+
Tablas: 22 implementadas
Migraciones: 16 exitosas
Foreign Keys: ✅ Funcionando
Soft Deletes: ✅ Implementados
Auditoría: system_logs con JSON
Configuraciones: tabla configuraciones
```

### Desarrollo
```yaml
Ambiente: Laragon (Windows)
IDE: VSCode/PhpStorm
Control: Git + conventional commits
Testing: PHPUnit (762 assertions ✅)
Debug: Laravel Telescope (preparado)
```

### Deploy (Preparado)
```yaml
Servidor: VPS Linux
Web Server: Nginx + PHP-FPM
Base de Datos: PostgreSQL managed
SSL: Let's Encrypt
Backup: Automático diario
Monitoreo: Laravel Pulse
```

---

## 🏗️ ARQUITECTURA BACKEND

### Patrón Arquitectónico
- **API First** con Laravel Sanctum
- **Repository Pattern** para modelos
- **Service Classes** para lógica compleja
- **RESTful API** con 49+ endpoints

### Estructura de Directorios
```
bambu-sistema-v2/
├── app/
│   ├── Http/Controllers/Api/  # Controllers API
│   ├── Models/               # Eloquent models
│   ├── Services/            # Business logic
│   └── Filament/           # Admin resources
├── database/
│   ├── migrations/         # 16 migraciones ✅
│   └── seeders/           # Datos iniciales
└── tests/
    ├── Feature/         # Tests de integración ✅
    └── Unit/           # Testing completo
```

---

## 🧪 TESTING BACKEND

### Estado Actual ✅
```yaml
Backend Tests: 113 tests pasando completamente
Aserciones: 762 assertions ejecutadas exitosamente  
Duración: ~40 segundos
Cobertura: 100% endpoints API
```

### Archivos de Test
```yaml
Feature Tests:
  ✅ ProductoApiTest.php (16 tests) - API completa
  ✅ VehiculosTest.php (12 tests) - CRUD + lógica negocio
  ✅ RepartosTest.php (14 tests) - Logística completa
  ✅ ReportesTest.php (8 tests) - Analytics y métricas
  ✅ IntegracionLogisticaTest.php (7 tests) - Flujos E2E
  ✅ ClienteModelTest.php (10 tests) - Modelo + relaciones
  ✅ ProductoModelTest.php (11 tests) - Modelo + scopes
  ✅ PedidoModelTest.php (1 test) - Modelo básico
  
Unit/Integration Tests:
  ✅ DatabaseMigrationTest.php (7 tests) - Estructura BD
  ✅ DatabaseForeignKeysTest.php (5 tests) - Integridad referencial
  ✅ DatabaseCrudTest.php (5 tests) - Operaciones CRUD
  ✅ PostgreSQLTypesTest.php (10 tests) - Tipos PostgreSQL
  ✅ SoftDeletesTest.php (6 tests) - Eliminación lógica
  ✅ ExampleTest.php (1 test) - Test básico Laravel
```

### Comando de Verificación
```bash
php artisan test --stop-on-failure
# Resultado: 113 passed (762 assertions)
```

---

## 📈 MÉTRICAS Y MONITORING

### Performance Targets
```yaml
API Response: < 200ms
Database: < 100ms queries
Concurrent Users: 50
Uptime: 99.9%
```

### Herramientas de Monitoring
- **Laravel Pulse**: Métricas aplicación
- **Laravel Telescope**: Debug desarrollo
- **Laravel Logs**: Logs nativos (sin servicios pagos)
- **PostgreSQL Stats**: Monitoring BD

---

## 🔧 CONFIGURACIÓN DE DESARROLLO

### Requisitos Mínimos
```yaml
PHP: 8.2+
Composer: 2.x
PostgreSQL: 15+
RAM: 4GB mínimo
```

### Variables de Entorno Clave
```env
DB_CONNECTION=pgsql
DB_DATABASE=bambu_sistema
SANCTUM_STATEFUL_DOMAINS=localhost:5173
VITE_APP_URL=http://localhost:8000
```

### Scripts de Desarrollo
```bash
# Backend
php artisan serve          # Server desarrollo
php artisan migrate        # Ejecutar migraciones
php artisan test          # Ejecutar tests
php artisan db:seed       # Datos de prueba
```

---

## 📊 DECISIONES TÉCNICAS BACKEND

### ✅ Decisiones Tomadas
1. **PostgreSQL** sobre MySQL (mejor para JSON y concurrencia)
2. **Laravel Sanctum** sobre Passport (simplicidad SPA)
3. **Filament v3** para admin panel (productividad)
4. **Repository Pattern** para modelos complejos
5. **Service Classes** para lógica de negocio

### 🚫 Descartado y Por Qué
1. **Docker**: Complejidad innecesaria en desarrollo local
2. **MySQL**: Menor soporte JSON nativo
3. **Laravel Passport**: Overhead innecesario para SPA
4. **MongoDB**: Menos maduro para finanzas/inventario

---

## 🌐 FRONTEND - REACT 19

### Stack Frontend
```yaml
Framework: React 19 ✅
Build Tool: Vite 7+ ✅
Language: TypeScript strict ✅
Styling: Tailwind v4 PostCSS ✅
UI Components: shadcn/ui + custom
State Management: Zustand (UI) + React Query (server state)
Forms: React Hook Form + Zod validation
Router: React Router v6
Testing: Vitest + React Testing Library + Playwright
```

### Desarrollo Frontend
```yaml
Ambiente: Vite dev server (puerto 5173)
Hot Reload: ✅ Habilitado
Alias: @/ → src/ (imports absolutos)
Linting: ESLint + Prettier + Tailwind class sorting
Type Checking: TypeScript strict mode
Mock Data: MSW (Mock Service Worker)
```

### Estructura Frontend
```
src/
├── components/ui/        # shadcn/ui components
├── components/layout/    # Header, Sidebar, Shell
├── components/feature/   # Feature-specific components
├── pages/               # Route pages
├── hooks/               # Custom hooks
├── utils/               # Pure utilities
├── types/               # TypeScript types
├── constants/           # App constants
├── assets/              # Static assets
└── index.css            # Tailwind v4 styles
```

---

**🎯 BACKEND LARAVEL + FRONTEND REACT - ARQUITECTURA MODERNA DESACOPLADA**

**Última actualización**: 2025-08-12 | **Stack**: Laravel 11 API + React 19 SPA