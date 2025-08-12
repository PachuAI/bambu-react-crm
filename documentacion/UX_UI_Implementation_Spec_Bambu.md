# UX/UI Implementation Spec — Bambú CRM (v1)

> **Ámbito:** guía ejecutiva para construir la UI del CRM en React 19 siguiendo el PRD (Sección 8–10) y el Frontend Architecture. Define **patrones, componentes, tokens, atajos y reglas** para que el equipo implemente pantallas consistentes desde el día 1.
>
> **Nota:** Documento alineado con stack React 19 + Vite + TypeScript + Tailwind v4 del proyecto Bambu.
>
> **Stack UI:** React 19 + TypeScript + Vite · Tailwind v4 · shadcn/ui · lucide-react · Recharts

---

## 1) Principios de diseño
- **Operativo y denso.** Predominio de tabla y formularios compactos. Sin “air gaps” innecesarios.
- **Uniformidad.** Mismos patrones de búsqueda, filtros, acciones, estados (empty/loading/error).
- **Teclado primero.** Atajos globales y por flujo crítico (Cotizador/Seguimiento).
- **Responsive real.** Sidebar colapsable, patrones mobile específicos (no solo shrink).
- **Claridad visual sin bordes redondos.** Bordes rectos (`rounded-none`), sombras sutiles, contrastes legibles.
- **Accesibilidad AA.** Foco visible, roles ARIA, orden de tab consistente, lenguaje es-AR.

---

## 2) App Shell y navegación
**Header**
- Izquierda: *Breadcrumbs*.
- Centro: **Búsqueda global** (`Ctrl+K`) con *command palette* (clientes/productos/pedidos).
- Derecha: **Quick Create** (Nueva Cotización), Toggle dark/light, User menu.

**Sidebar** (colapsable)
- Grupos: Dashboard · Ventas (Cotizador, Pedidos) · Clientes · Productos · Logística (Planificación, Seguimiento) · Reportes · Administrador (enlace a Filament).
- Comportamiento:
  - **Desktop ≥ lg:** sidebar fija 280px; colapse recuerda preferencia (localStorage).
  - **< lg:** sidebar como *drawer* (overlay). Icono “hamburger” en header.

**Rutas UI** (no técnicas): `/dashboard`, `/ventas/cotizador`, `/ventas/pedidos`, `/clientes`, `/productos`, `/logistica/planificacion`, `/logistica/seguimiento`, `/reportes`.

---

## 3) Design System (tokens y estilos)
> Sin hardcodear colores; usar tokens y variables basadas en Tailwind.

**Colores (tema base)**
- **Primary:** Indigo (brand Bambú). Uso en CTAs, enlaces activos, badges “en curso”.
- **Neutral:** Slate/Gray para backgrounds, bordes y textos secundarios.
- **Success / Warning / Danger:** Emerald · Amber · Red.
- **Focus ring:** Primary a 40% + 2px.

**Densidad / spacing**
- Base 4px. Stack vertical interno de componentes 8–12px.
- Cards: padding 16–20px; *cardless* en listas densas.

**Tipografía**
- 14px cuerpo (desktop). 13px en tablas densas.
- Jerarquía: H1 20px/semibold · H2 18px · H3 16px.

**Bordes y sombras**
- `rounded-none` por defecto.
- Borde `1px` neutral-200/300; sombra suave en modales y popovers.

**Modo oscuro**
- Sidebar sigue el tema global (claro/oscuro según preferencia del usuario).
- Contraste mínimo AA en primarios y textos.

> **Implementación:** definir variables CSS en `:root` (light) y `.dark` (dark) y mapear a Tailwind theme; no duplicar estilos por componente.

---

## 4) Componentes (shadcn/ui) y usos
- **App chrome:** `Breadcrumb`, `Separator`, `DropdownMenu`, `Tooltip`.
- **Inputs:** `Input`, `Textarea`, `Select`, `Combobox` (Command), `Checkbox`, `Switch`, `RadioGroup`, `DatePicker`.
- **Acciones:** `Button` (variants: primary, secondary, ghost, destructive), `Badge`, `Alert`, `Toast`.
- **Overlay:** `Dialog` (confirmaciones/alta), `Sheet` (panel lateral del Cotizador), `Popover` (filtros ligeros), `Drawer` (mobile).
- **Datos:** `Table` (DataTable), `Tabs`, `Accordion`, `ScrollArea`, `Skeleton`.
- **Navegación:** `Command` (búsqueda global), `Pagination`.
- **Gráficos:** Recharts (`BarChart` KPI semanal).

**Reglas de elección**
- **Dialog** para confirmaciones, creación/edición pequeñas (≤ 1 pantalla).
- **Sheet** lateral para flujos compuestos (Cotizador / vista “Detalle rápido”).
- **Drawer** para mobile.
- **Popover** para filtros y *pickers*.

---

## 5) Patrones comunes
### 5.1 Tablas (DataTable)
- **Columnas**: texto izq · números der · fechas centradas.
- **Filtros**: a la vista (barra superior) + búsqueda rápida. Persisten por ruta (querystring).
- **Acciones fila**: a la derecha (Ver · Editar · “…”). Acciones masivas arriba.
- **Responsive**: prioridad de columnas; secundarias se ocultan < md; fila expandible (sheet) muestra detalles.
- **Estados**: `Skeleton` (10 filas), `Empty` (ilustración + CTA), `Error` (mensaje y reintento).

### 5.2 Formularios
- Etiquetas arriba, ayuda bajo el campo, errores en rojo bajo el campo.
- Botones pegados al formulario (derecha) y `Cancel` como *ghost*.
- Validación *onBlur* y al enviar; *focus ring* visible.

### 5.3 Confirmaciones y toasts
- Toda acción destructiva o con impacto (ajuste de stock, cambio de estado) **confirma** en `Dialog`.
- Notificaciones: `Toast` de éxito/fracaso; *undo* sólo si es técnicamente viable.

### 5.4 Búsqueda global (Ctrl+K)
- Abre `Command` con tabs: Clientes · Productos · Pedidos.
- Resultados con icono, título y metadata; Enter navega a la vista detalle.

---

## 6) Atajos de teclado
**Globales**
- `Ctrl+K`: búsqueda global.
- `Ctrl+N`: nueva cotización (Quick Create).
- `g` luego `d`: ir a Dashboard; `g` luego `p`: a Productos; `g` luego `v`: Ventas.

**Cotizador**
- `Ctrl+1`: foco Cliente → Enter confirma.
- `Ctrl+2`: foco Producto → Enter agrega.
- `Ctrl+3`: cantidad y descuentos (si aplica).
- `Ctrl+4`: Confirmar cotización/pedido.
- `Esc`: cancelar acción actual.

**Seguimiento Logística**
- `1/2/3`: cambiar estado rápido (Planificado/En ruta/Entregado) cuando la tarjeta esté enfocada.
- `?`: ayuda de atajos.

---

## 7) Módulos: pautas específicas
### 7.1 Dashboard
- **Fila 1**: 4 KPIs (Pendientes de armado · Entregas hoy · Pendientes de entrega · Alertas de stock). Click ⇒ vistas filtradas.
- **Fila 2**: gráfico **semanal** (2/3) + **Stock crítico** (1/3, top-5 por cobertura).
- **Fila 3**: **Últimos pedidos** (10 filas).
- **KPIs** usan `Card` simple (sin gráfica embebida), ícono, valor y subtítulo.

### 7.2 Ventas → Cotizador
- **Layout**: 2 paneles (Cliente | Productos) y **Sheet** derecho con resumen.
- **Búsqueda**: `Combobox` con resultados incremental (SKU destacada).
- **Reglas**: validar stock, aplicar niveles de descuento, calcular bultos.
- **Confirmar**: genera Pedido `confirmado` (o `borrador` si el usuario lo elige).

### 7.3 Ventas → Pedidos
- Tabla por estados (tabs): Todos · Confirmados · En preparación · Listos · En ruta · Entregados · No entregados.
- Acciones: imprimir, cambiar estado, asignar a ruta.

### 7.4 Clientes
- Tarjeta resumen (datos + tags) y tabs: Pedidos | Facturación | Notas.

### 7.5 Productos
- Tabla con columna **Stock** y botón **Ajustar** ⇒ `Dialog` (entrada/salida, **motivo obligatorio**, referencia).
- **Historial** (tab) con ledger de movimientos (fecha, tipo, cantidad, motivo, usuario).

### 7.6 Logística
**Planificación**
- Semanario + lista “Pedidos sin asignar” + panel “Vehículos” con capacidad y validación en vivo.
- Modal **Asignar** (vehículo, orden de entrega).

**Seguimiento**
- Lista de paradas con cambio de estado de un toque; KPIs del día arriba.

### 7.7 Reportes
- Tarjetas de filtros arriba (rango fechas, cliente, ciudad); tabla/gráfico abajo.
- Export CSV.

---

## 8) Estados, vacíos y errores
- **Loading**: skeletons predefinidos por tipo (tabla, card, lista).
- **Empty**: icono, mensaje claro, CTA (crear nuevo, ajustar filtros).
- **Error**: mensaje legible + botón reintentar + soporte (si aplica).

---

## 9) Microcopy (es-AR)
- Verbos en infinitivo: “Crear pedido”, “Ajustar stock”.
- Fechas: `DD/MM/YYYY`, hora `HH:mm` (24h). Pesos: `ARS $ 9.999,99`.
- Estados de pedido: **Borrador**, **Confirmado**, **En preparación** (virtual), **Listo para despacho**, **Planificado**, **En ruta**, **Entregado**, **No entregado**, **Cancelado**.

---

## 10) Accesibilidad
- **Foco**: visible y consistente (ring + offset).
- **Tab order**: de izquierda a derecha, arriba/abajo; Sidebar salteable con “Skip to content”.
- **Labels y aria**: `aria-label` en icon buttons, `aria-live="polite"` en toasts.
- **Contraste**: mínimo AA en texto principal y botones primarios.

---

## 11) QA de UX (checklist por pantalla)
- [ ] ¿Hay breadcrumbs y título claro?
- [ ] ¿Búsqueda y filtros visibles?
- [ ] ¿Estados loading/empty/error implementados?
- [ ] ¿Atajos documentados y probados?
- [ ] ¿Focusable + accesible con teclado?
- [ ] ¿Responsive probado en `sm`, `md`, `lg`?
- [ ] ¿Acciones destructivas con confirmación?
- [ ] ¿Mensajes de éxito/error visibles y comprensibles?

---

## 12) Entregables por módulo (DoD)
- Wireframe final + mapping de componentes shadcn.
- Tabla de campos/columnas + reglas de validación/formatos.
- Flujos de error + atajos (si aplica).
- Test de usabilidad con 1 vendedor y 1 operador de logística.

---

## 13) Anexos
### 13.1 Iconografía (lucide-react)
- Pedidos: `Package`, Cotizador: `PlusCircle`, Clientes: `Users`, Productos: `Box`, Logística: `Truck`, Reportes: `BarChart`, Admin: `Shield`.
- Estados: Confirmado `CheckCircle`, En ruta `Navigation`, Entregado `CircleCheck`, No entregado `CircleX`, Listo `ClipboardCheck`.

### 13.2 Prioridad de columnas responsive (ejemplo Pedidos)
1. `#`, Cliente, Total, Estado, Fecha
2. Ciudad, Bultos
3. Acciones secundarias

---

**Implementación sugerida (orden):**
1) App Shell (Header + Sidebar + rutas).  
2) Dashboard (KPIs + gráfico + stock crítico + últimos pedidos).  
3) Ventas (Cotizador + Pedidos).  
4) Productos (Ajuste + Historial).  
5) Logística (Planificación + Seguimiento).  
6) Reportes + pulido de accesibilidad y atajos.

**Stack confirmado:** React 19 + TypeScript + Vite + Tailwind v4 + shadcn/ui (alineado con FRONTEND_ARCHITECTURE.md)
