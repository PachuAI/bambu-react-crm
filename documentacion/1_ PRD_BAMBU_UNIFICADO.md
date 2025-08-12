# PRD - Documento de Requerimientos del Producto
## Sistema de Gestión Integral BAMBU

**Versión:** 2.0  
**Fecha:** Enero 2025  
**Estado:** Documento Unificado Final  

---

## 1. RESUMEN EJECUTIVO

### 1.1 Visión del Producto
Sistema de gestión integral web que centraliza y automatiza todos los procesos operativos de BAMBU, empresa dedicada a la fabricación y distribución mayorista de productos químicos de limpieza en el Alto Valle de Río Negro y Neuquén, Argentina.

### 1.2 Problema a Resolver
La empresa actualmente opera con múltiples herramientas fragmentadas (hojas de cálculo independientes) que generan:
- Duplicación de esfuerzos en carga de datos
- Errores manuales frecuentes
- Falta de visibilidad integral del negocio
- Ineficiencia en procesos de cotización y logística
- Ausencia de control de stock en tiempo real

### 1.3 Objetivos del Sistema
- **Unificación**: Consolidar todas las operaciones en una única plataforma web
- **Automatización**: Eliminar procesos manuales y cálculos repetitivos
- **Control**: Gestión integral de inventario con trazabilidad completa
- **Eficiencia**: Reducir tiempo de cotización de 15 minutos a 3 minutos
- **Precisión**: Eliminar errores humanos en cálculos y transcripciones
- **Escalabilidad**: Sentar bases para crecimiento futuro del negocio

### 1.4 Alcance
**Incluye:**
- Gestión completa de clientes, productos e inventario
- Sistema de cotizaciones con cálculos automáticos
- Gestión de pedidos y órdenes de compra
- Planificación y seguimiento logístico
- Reportes operativos básicos

**No incluye en esta versión:**
- Facturación electrónica
- Contabilidad integrada
- Aplicación móvil
- Integración con sistemas externos
- E-commerce o portal de clientes

---

## 2. CONTEXTO DEL NEGOCIO

### 2.1 Descripción de la Empresa
BAMBU es una empresa regional que:
- Fabrica productos químicos de limpieza bajo marca propia
- Distribuye al por mayor en ciudades del Alto Valle
- Comercializa principalmente en bidones de 5 litros
- Complementa con accesorios de limpieza (mopas, trapos, baldes, guantes)
- Opera con flota propia para distribución

### 2.2 Modelo Operativo Actual

#### Proceso de Venta Típico:
1. Cliente solicita cotización (teléfono/WhatsApp)
2. Vendedor consulta precios en planilla Excel
3. Calcula manualmente descuentos según volumen
4. Envía cotización al cliente
5. Si acepta, registra pedido en otra planilla
6. Transfiere datos a planilla de logística
7. Coordina reparto según zona y día

#### Problemas Identificados:
- Sin validación de stock al cotizar
- Cálculos manuales propensos a error
- Múltiple transcripción de mismos datos
- Sin trazabilidad de operaciones
- Planificación logística ineficiente
- Si el cliente modifica el pedido a último momento, se requieren cambios manuales en distintos lugares propensos al error

### 2.3 Mercado Objetivo

#### Clientes Principales:
- **Comercios minoristas**: Almacenes, supermercados, despensas (40%)
- **Empresas de limpieza**: Servicios profesionales de mantenimiento (25%)
- **Instituciones**: Escuelas, hospitales, municipalidades (20%)
- **Consumidores finales**: Consorcios, oficinas, hogares (15%)

#### Área de Cobertura:
- **Río Negro**: General Roca, Allen, Villa Regina, Chichinales, Mainqué
- **Neuquén**: Neuquén Capital, Cipolletti, Plottier, Centenario, Cinco Saltos, Fernández Oro

### 2.4 Volumen Operativo
- **Clientes activos**: ~200+
- **Pedidos diarios**: 10-20
- **Productos en catálogo**: Muchos, no hay número exacto (30+)
- **Entregas semanales**: 50-80
- **Vehículos de reparto**: 3-4

---

## 3. USUARIOS DEL SISTEMA

### 3.1 Tipos de Usuario

#### Vendedor/Operador Comercial
**Descripción:** Personal de ventas y secretaría que maneja la operación diaria.

**Responsabilidades:**
- Gestionar base de clientes
- Generar cotizaciones
- Confirmar pedidos
- Consultar disponibilidad de stock
- Modificar cantidades en pedidos

**Accesos:**
- Módulo de clientes (completo)
- Módulo de cotizaciones (completo)
- Módulo de pedidos (completo)
- Módulo de productos (solo consulta de stock)
- Reportes básicos

**Necesidades específicas:**
- Proceso de cotización ultra-rápido con atajos de teclado
- Búsqueda predictiva instantánea
- Visibilidad inmediata de stock
- Generación rápida de resúmenes

**Frecuencia de uso:** 8 horas diarias

#### Administrador/Dueño
**Descripción:** Propietarios del negocio (2 personas) con acceso total al sistema.

**Responsabilidades:**
- Todas las funciones del Vendedor/Operador
- Gestionar catálogo de productos y stock
- Configurar parámetros del sistema
- Supervisar logs de seguridad
- Gestionar vehículos y categorías
- Controlar integridad del sistema

**Accesos adicionales:**
- Panel de configuración global
- Logs de auditoría y seguridad (cambios manuales de stock)
- Gestión de vehículos/fletes
- Gestión de categorías de productos
- Configuración de umbrales de descuento
- Todos los módulos con permisos de escritura

**Controles específicos:**
- Visualización de log anti-fraude con:
  - Usuario que realizó el cambio
  - Fecha y hora exacta
  - Tipo de modificación (ajuste manual de stock)
  - Cantidad modificada
  - Justificación del cambio

**Frecuencia de uso:** Variable, acceso permanente

#### Operador de Logística/Repartidor
**Descripción:** Personal encargado de los repartos y entregas.

**Responsabilidades:**
- Consultar pedidos asignados
- Actualizar estados de entrega
- Registrar novedades de ruta
- Confirmar entregas realizadas

**Accesos:**
- Módulo de repartos (vista y actualización de estados)
- Vista de pedidos del día asignados
- Actualización de estado de entrega
- Registro de observaciones

**Necesidades:**
- Interfaz simple y clara
- Optimizada para uso móvil
- Actualización rápida de estados
- Funcionamiento offline básico

**Frecuencia de uso:** Durante horario de reparto

### 3.2 Características de Usuarios
- **Nivel técnico**: Básico a intermedio
- **Edad promedio**: 25-45 años
- **Dispositivos principales**: PC de escritorio, notebooks, smartphones (para repartidores)
- **Horario de uso**: Lunes a Sábado, 8:00 a 18:00

---

## 4. REQUERIMIENTOS FUNCIONALES

### 4.1 Módulo de Gestión de Clientes

#### RF-001: Registro de Clientes
**Descripción:** El sistema debe permitir registrar nuevos clientes con información completa.

**Campos requeridos:**
- Nombre/Razón Social
- Dirección completa (usado como identificador principal)
- Teléfono principal
- Email (opcional)
- Observaciones

**Validaciones:**
- Dirección única por cliente
- Formato válido de teléfono
- Formato válido de email si se proporciona

#### RF-002: Búsqueda de Clientes
**Descripción:** Búsqueda rápida y predictiva de clientes.

**Características:**
- Búsqueda por cualquier campo (nombre, dirección, teléfono)
- Resultados en tiempo real mientras se escribe
- Sugerencias predictivas
- Historial de clientes recientes

#### RF-003: Gestión de Clientes
**Descripción:** Operaciones completas sobre registros de clientes.

**Operaciones:**
- Editar información de cliente
- Visualizar historial de pedidos
- Marcar clientes como inactivos (sin eliminar)
- Agregar notas y observaciones
- Ver estadísticas del cliente (compras, frecuencia)

### 4.2 Módulo de Gestión de Productos

#### RF-004: Catálogo de Productos
**Descripción:** Gestión completa del catálogo de productos.

**Campos de producto:**
- Código/SKU (único)
- Nombre del producto
- Descripción detallada
- Precio base (L1)
- Stock actual
- Stock mínimo
- Unidad de medida
- Peso/Volumen por unidad
- Categoría (seleccionable de lista configurable)
- Estado (activo/inactivo)

**Gestión de categorías:**
- Sistema flexible de categorías
- Administrador puede crear/editar/eliminar categorías
- Categorías sugeridas iniciales:
  - Productos químicos líquidos
  - Accesorios de limpieza
  - Combos/Promociones
  - Otros

#### RF-005: Control de Inventario
**Descripción:** Gestión integral del stock con trazabilidad completa.

**Funcionalidades:**
- Visualización de stock en tiempo real
- Alertas de stock bajo mínimo
- Registro de todos los movimientos
- Ajustes manuales con justificación
- Historial completo por producto

**Tipos de movimientos:**
- Entrada por producción/compra
- Salida por venta
- Ajuste por inventario
- Devolución de cliente
- Baja por vencimiento/daño

### 4.3 Módulo de Cotizaciones

#### RF-006: Creación de Cotización
**Descripción:** Interfaz optimizada para generar cotizaciones con máxima velocidad.

**Flujo de trabajo:**
1. Seleccionar o crear cliente
2. Agregar productos con cantidades
3. Sistema calcula automáticamente:
   - Subtotales por línea
   - Descuento aplicable según monto
   - Total final
4. Generar vista previa
5. Opciones de acción:
   - Guardar como borrador
   - Confirmar como pedido
   - Generar resumen para compartir

**Atajos de teclado (hotkeys) obligatorios:**
- **F1 o Ctrl+1**: Posicionar cursor en búsqueda de cliente
- **Enter**: Confirmar selección y pasar al siguiente campo
- **Tab**: Navegar entre campos
- **F2 o Ctrl+2**: Posicionar cursor en búsqueda de productos
- **Enter en producto**: Agregar a lista y volver a búsqueda de productos
- **Flechas arriba/abajo**: Navegar en resultados de búsqueda
- **F3 o Ctrl+3**: Ir a modificar cantidades
- **F4 o Ctrl+4**: Confirmar cotización
- **Esc**: Cancelar operación actual

**Comportamiento optimizado:**
- Al seleccionar cliente con Enter, foco pasa automáticamente a productos
- Al agregar producto con Enter:
  - Producto se agrega a la lista
  - Cantidad por defecto = 1
  - Cursor permite modificar cantidad inmediatamente
  - Nuevo Enter confirma cantidad y vuelve a búsqueda de productos
- Flujo continuo sin necesidad de usar mouse

#### RF-007: Sistema de Descuentos Automático
**Descripción:** Cálculo automático de descuentos según volumen de compra.

**Reglas de negocio:**
- **Nivel L1**: Precio base (0% descuento) - Montos hasta X
- **Nivel L2**: 5% descuento - Montos entre X y Y  
- **Nivel L3**: 10% descuento - Montos entre Y y Z
- **Nivel L4**: 15% descuento - Montos superiores a Z

**Consideraciones:**
- Descuento se aplica sobre precio base L1
- Productos marcados como "combo" pueden excluirse del cálculo
- Los umbrales deben ser configurables
- Aplicación automática sin intervención manual

#### RF-008: Validación de Disponibilidad
**Descripción:** Verificación de stock antes de confirmar cotización.

**Comportamiento:**
- Validación en tiempo real al agregar productos
- Alerta visual si cantidad excede stock
- Bloqueo de confirmación si no hay stock suficiente
- Sugerencia de alternativas si producto no disponible

#### RF-009: Generación de Resumen
**Descripción:** Crear resumen formateado para compartir con cliente.

**Formato de salida:**
```
COTIZACIÓN - BAMBU
Cliente: [Nombre]
Dirección: [Dirección completa]
Teléfono: [Teléfono]
Fecha: [Fecha actual]

PRODUCTOS:
- [Cantidad] x [Producto] - $[Subtotal]
- [Cantidad] x [Producto] - $[Subtotal]

Subtotal: $[Monto]
Descuento ([X]%): $[Monto descuento]
TOTAL: $[Total final]

Validez: 7 días
```

**Opciones de compartir:**
- Copiar al portapapeles
- Generar PDF
- Enviar por email (futuro)

### 4.4 Módulo de Gestión de Pedidos

#### RF-010: Confirmación de Pedidos
**Descripción:** Conversión de cotización a pedido confirmado.

**Proceso:**
1. Validar stock disponible nuevamente
2. Confirmar datos del cliente
3. Seleccionar fecha de entrega (opcional, puede definirse después)
4. Agregar observaciones si necesario
5. Confirmar pedido
6. Sistema automáticamente:
   - Descuenta stock
   - Genera número de pedido
   - Registra timestamp
   - Notifica a logística

#### RF-011: Estados de Pedido
**Descripción:** Seguimiento del ciclo de vida del pedido.

**Estados posibles:**
- **Borrador**: Cotización sin confirmar
- **Confirmado**: Pedido confirmado, pendiente de preparación
- **En preparación**: Productos siendo alistados
- **Listo para despacho**: Esperando asignación de transporte
- **En ruta**: Asignado a vehículo, en camino
- **Entregado**: Entrega exitosa confirmada
- **No entregado**: Intento fallido (con motivo)
- **Cancelado**: Pedido cancelado (con justificación)

#### RF-012: Gestión de Pedidos
**Descripción:** Operaciones sobre pedidos existentes.

**Funcionalidades:**
- Ver detalle completo del pedido
- Modificar pedidos en estado borrador
- Cancelar pedidos (con reposición de stock)
- Reimprimir documentos
- Agregar notas y observaciones
- Ver historial de cambios

### 4.5 Módulo de Logística

#### RF-013: Gestión de Vehículos
**Descripción:** Administración de flota de reparto.

**Información de vehículo:**
- Identificador/Patente
- Descripción/Modelo
- Capacidad en bultos
- Capacidad en peso (kg)
- Estado (disponible/en ruta/mantenimiento)
- Conductor asignado

#### RF-014: Planificación de Repartos
**Descripción:** Organización de entregas por día y zona.

**Vista de planificación:**
- Calendario semanal
- Pedidos agrupados por ciudad
- Asignación de vehículos mediante:
  - Opción A: Drag & drop (si es viable)
  - Opción B: Dropdown + botón en cada pedido
- Validación de capacidad en tiempo real
- Vista de capacidad utilizada por vehículo
- Agrupación visual por zonas

**Información mostrada:**
- Total de bultos por ciudad
- Cantidad de paradas
- Capacidad disponible por vehículo
- Tiempo estimado de recorrido

#### RF-015: Hoja de Ruta
**Descripción:** Documento de trabajo para conductor.

**Contenido:**
- Fecha y vehículo asignado
- Lista de entregas ordenada
- Por cada entrega:
  - Cliente y dirección
  - Teléfono de contacto
  - Productos y cantidades
  - Observaciones especiales
  - Espacio para firma/sello

**Formato de salida:**
- Vista para imprimir
- Exportar a PDF
- Versión móvil responsive

#### RF-016: Seguimiento de Entregas
**Descripción:** Monitoreo y registro de entregas.

**Funcionalidades:**
- Actualizar estado de cada entrega
- Registrar motivos de no entrega
- Capturar observaciones del conductor
- Dashboard de seguimiento en tiempo real
- Métricas de efectividad

### 4.6 Módulo de Configuración y Administración

#### RF-017: Panel de Configuración Global
**Descripción:** Configuraciones del sistema accesibles solo para administradores.

**Parámetros configurables:**
- **Umbrales de descuento:**
  - Monto mínimo para L2 (5%)
  - Monto mínimo para L3 (10%)
  - Monto mínimo para L4 (15%)
  - Porcentajes de descuento por nivel
- **Gestión de categorías:**
  - Crear nueva categoría
  - Editar nombre de categoría
  - Eliminar categoría (si no tiene productos)
- **Gestión de vehículos/fletes:**
  - Agregar vehículo (marca, modelo, patente)
  - Capacidad en bultos
  - Capacidad en peso (kg)
  - Estado del vehículo
  - Asignar conductor predeterminado

#### RF-018: Logs de Seguridad y Auditoría
**Descripción:** Sistema de registro anti-fraude para cambios manuales de stock.

**Eventos registrados:**
- Modificaciones directas de stock desde módulo de productos
- Ajustes manuales de inventario
- Cambios en precios base
- Eliminación de registros
- Modificaciones en pedidos confirmados

**Información capturada:**
- Usuario que realizó la acción
- Fecha y hora exacta (timestamp)
- Tipo de operación
- Valores anteriores y nuevos
- Justificación/motivo (si se requiere)
- IP del dispositivo

**Visualización:**
- Solo accesible para administradores
- Filtros por usuario, fecha, tipo de operación
- Exportable para auditorías
- Alertas automáticas para cambios sospechosos

### 4.7 Módulo de Reportes

#### RF-019: Reportes Operativos
**Descripción:** Informes básicos para gestión diaria.

**Reportes disponibles:**
- Ventas por período
- Productos más vendidos
- Clientes más activos
- Efectividad de entregas
- Movimientos de stock
- Pedidos por estado

**Opciones:**
- Filtros por fecha, cliente, producto
- Exportación a Excel/PDF
- Gráficos básicos
- Programación de envío automático

---

## 5. REQUERIMIENTOS NO FUNCIONALES

### 5.1 Usabilidad
- **Interfaz intuitiva**: Aprendizaje en menos de 2 horas
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Retroalimentación clara**: Mensajes de éxito/error comprensibles
- **Navegación consistente**: Mismos patrones en todo el sistema
- **Atajos de teclado**: Para operaciones frecuentes

### 5.2 Rendimiento
- **Tiempo de respuesta**: Máximo 2 segundos para operaciones normales
- **Búsquedas**: Resultados en menos de 500ms
- **Carga de páginas**: Menos de 3 segundos
- **Concurrencia**: Soporte para 20 usuarios simultáneos
- **Volumen de datos**: Manejo eficiente de 100,000+ registros

### 5.3 Confiabilidad
- **Disponibilidad**: 99% durante horario laboral
- **Recuperación**: Máximo 4 horas ante fallas
- **Integridad de datos**: Transacciones ACID
- **Respaldo**: Backup diario automático
- **Auditoría**: Log de todas las operaciones críticas

### 5.4 Seguridad
- **Autenticación**: Usuario y contraseña segura
- **Autorización**: Permisos por rol de usuario
- **Sesiones**: Timeout por inactividad (30 minutos)
- **Encriptación**: Datos sensibles encriptados
- **Auditoría**: Registro de accesos y cambios

### 5.5 Compatibilidad
- **Navegadores**: Chrome, Firefox, Edge (últimas 2 versiones)
- **Sistemas operativos**: Windows 10+, macOS, Linux
- **Resoluciones**: Mínimo 1366x768
- **Conexión**: Funcional con 1 Mbps

### 5.6 Mantenibilidad
- **Modularidad**: Arquitectura por componentes
- **Documentación**: Código y procesos documentados
- **Versionado**: Control de versiones
- **Logs**: Sistema de logging estructurado
- **Monitoreo**: Métricas de salud del sistema

---

## 6. REGLAS DE NEGOCIO

### 6.1 Gestión de Stock

**RN-001: Control de Inventario**
- Todo movimiento de stock debe estar justificado
- No permitir ventas con stock negativo
- Stock mínimo genera alerta automática
- Ajustes manuales requieren motivo y responsable

**RN-002: Reserva de Stock**
- Stock se reserva al confirmar pedido
- Reserva se libera si pedido se cancela
- Tiempo máximo de reserva: 7 días

### 6.2 Sistema de Precios y Descuentos

**RN-003: Cálculo de Descuentos**
- Descuento se determina por monto total
- Se aplica a todos los productos del pedido
- Productos "combo" pueden excluirse del cálculo
- Cambios en umbrales aplican a pedidos nuevos

**RN-004: Vigencia de Cotizaciones**
- Cotizaciones válidas por 7 días
- Precio se congela al confirmar pedido
- Cambios de precio no afectan pedidos confirmados

### 6.3 Logística y Entregas

**RN-005: Asignación de Repartos**
- No exceder capacidad del vehículo
- Priorizar por antigüedad del pedido
- Agrupar por zona geográfica
- Considerar horarios de recepción del cliente

**RN-006: Gestión de Entregas**
- Máximo 2 intentos de entrega
- Registro obligatorio de motivo de no entrega
- Reprogramación automática para siguiente ruta

### 6.4 Gestión de Clientes

**RN-007: Identificación de Clientes**
- Dirección es identificador único
- No eliminar clientes con historial
- Marcar como inactivo preserva datos

---

## 7. FLUJOS DE TRABAJO PRINCIPALES

### 7.1 Flujo de Venta Completo

```
1. INICIO DE COTIZACIÓN
   ├─ Buscar cliente existente
   │  └─ Si no existe → Crear nuevo cliente
   └─ Seleccionar cliente

2. ARMADO DE COTIZACIÓN
   ├─ Agregar productos
   ├─ Especificar cantidades
   ├─ Sistema valida stock
   └─ Sistema calcula descuentos

3. FINALIZACIÓN DE COTIZACIÓN
   ├─ Revisar resumen
   ├─ Generar documento para cliente
   └─ Decisión:
      ├─ Guardar como borrador
      └─ Confirmar como pedido

4. CONFIRMACIÓN DE PEDIDO
   ├─ Validar stock nuevamente
   ├─ Seleccionar fecha entrega (opcional, sino luego se modifica directo desde la vista de pedido)
   ├─ Confirmar pedido
   ├─ Sistema descuenta stock
   └─ Pedido pasa a modulo de pedidos Y a módulo de logística

5. PROCESAMIENTO LOGÍSTICO
   ├─ Pedido aparece en panel logística
   ├─ Asignar a vehículo
   ├─ Generar hoja de ruta
   └─ Despachar

6. ENTREGA
   ├─ Conductor realiza entrega
   ├─ Registra resultado
   └─ Sistema actualiza estado
```

### 7.2 Flujo de Reposición de Stock

```
1. DETECCIÓN DE NECESIDAD
   ├─ Alerta de stock bajo mínimo
   └─ Revisión manual

2. REGISTRO DE ENTRADA
   ├─ Seleccionar producto
   ├─ Indicar cantidad
   ├─ Especificar motivo
   └─ Confirmar entrada

3. ACTUALIZACIÓN
   ├─ Sistema suma al stock
   ├─ Registra movimiento
   └─ Actualiza disponibilidad
```

### 7.3 Flujo de Planificación Logística

```
1. REVISIÓN DIARIA
   ├─ Ver pedidos confirmados
   └─ Agrupar por zona

2. ASIGNACIÓN DE RECURSOS
   ├─ Seleccionar vehículos disponibles
   ├─ Asignar pedidos a vehículos
   └─ Validar capacidades

3. GENERACIÓN DE RUTAS (suele ser manual)
   ├─ Optimizar orden de entrega
   ├─ Generar hojas de ruta
   └─ Imprimir documentación

4. SEGUIMIENTO
   ├─ Monitorear progreso
   ├─ Actualizar estados
   └─ Registrar novedades
```

---

## 8. INTERFAZ DE USUARIO

### 8.1 Principios de Diseño
- **Simplicidad**: Mínima cantidad de clics para completar tareas
- **Consistencia**: Mismos patrones en todas las pantallas
- **Feedback inmediato**: Respuesta visual a cada acción
- **Prevención de errores**: Validaciones y confirmaciones
- **Flexibilidad**: Múltiples formas de realizar tareas comunes

### 8.2 Estructura de Navegación

```
MENÚ PRINCIPAL
├─ Dashboard
├─ Ventas
│  ├─ Nueva Cotización
│  ├─ Cotizaciones
│  └─ Pedidos
├─ Clientes
│  ├─ Listado
│  └─ Nuevo Cliente
├─ Productos
│  ├─ Catálogo
│  ├─ Stock
│  └─ Movimientos
├─ Logística
│  ├─ Planificación
│  ├─ Vehículos
│  └─ Seguimiento
├─ Reportes
└─ Configuración
```

### 8.3 Componentes Principales

#### Dashboard Principal
- Resumen de indicadores clave
- Accesos directos a funciones frecuentes
- Alertas y notificaciones
- Gráficos de tendencias

#### Pantalla de Cotización
- Selector de cliente con búsqueda
- Grilla de productos con autocomplete
- Panel lateral con resumen en tiempo real
- Botones de acción prominentes

#### Panel de Logística
- Vista calendario semanal
- Drag & drop para asignaciones
- Código de colores por estado
- Filtros rápidos

---

## 9. CONSIDERACIONES DE IMPLEMENTACIÓN

### 9.1 Migración de Datos
- Importación de clientes existentes
- Carga inicial de productos
- Histórico de pedidos (opcional)
- Validación y limpieza de datos

### 9.2 Capacitación
- Manual de usuario
- Videos tutoriales
- Sesiones de entrenamiento
- Soporte durante transición

### 9.3 Fases de Implementación

**Fase 1 - Core (Semanas 1-4)**
- Gestión de clientes y productos
- Control básico de stock

**Fase 2 - Ventas (Semanas 5-8)**
- Sistema de cotizaciones
- Gestión de pedidos

**Fase 3 - Logística (Semanas 9-12)**
- Planificación de repartos
- Seguimiento de entregas

**Fase 4 - Optimización (Semanas 13-16)**
- Reportes y métricas
- Ajustes y mejoras

### 9.4 Criterios de Éxito
- Adopción del 100% de usuarios en 30 días
- Reducción 80% en tiempo de cotización
- Eliminación de errores de cálculo
- Mejora 30% en eficiencia de entregas
- Satisfacción de usuarios >4/5

---

## 10. RIESGOS Y MITIGACIONES

### 10.1 Riesgos Operativos

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Resistencia al cambio | Alto | Media | Capacitación intensiva, involucrar usuarios desde el diseño |
| Pérdida de datos | Alto | Baja | Backups automáticos, plan de recuperación |
| Errores en migración | Medio | Media | Validación exhaustiva, período de prueba |
| Caída del sistema | Alto | Baja | Arquitectura redundante, soporte técnico |

### 10.2 Riesgos de Negocio

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Cambios en proceso de negocio | Medio | Media | Diseño flexible, configuración parametrizable |
| Crecimiento no previsto | Medio | Baja | Arquitectura escalable |
| Competencia con mejores sistemas | Bajo | Baja | Mejora continua, feedback de usuarios |

---

## 11. GLOSARIO

- **Bulto**: Unidad de medida para capacidad de transporte
- **Combo**: Conjunto de productos vendidos como unidad
- **Cotización**: Presupuesto no confirmado
- **L1, L2, L3, L4**: Niveles de descuento por volumen
- **Pedido**: Cotización confirmada para entrega
- **Reparto**: Conjunto de entregas asignadas a un vehículo
- **SKU**: Código único de producto (Stock Keeping Unit)
- **Stock mínimo**: Cantidad mínima deseada en inventario

---

## 12. ANEXOS

### 12.1 Ejemplos de Productos
- Detergente BAMBU (Bidón 5L)
- Desinfectante BAMBU (Bidón 5L)
- Limpiador de pisos BAMBU (Bidón 5L)
- Jabón líquido para manos BAMBU (Bidón 5L)
- Suavizante de ropa BAMBU (Bidón 5L)
- Desengrasante concentrado BAMBU (Bidón 5L)
- Cloro BAMBU (Bidón 5L)
- Mopas industriales BAMBU
- Trapos de piso BAMBU
- Baldes plásticos BAMBU
- Guantes de látex BAMBU

### 12.2 Ciudades de Operación
**Río Negro:**
- General Roca
- Allen
- Villa Regina
- Chichinales
- Mainqué

**Neuquén:**
- Neuquén Capital
- Cipolletti
- Plottier
- Centenario
- Cinco Saltos
- Fernández Oro

### 12.3 Métricas Clave (KPIs)
- Tiempo promedio de cotización
- Tasa de conversión cotización/pedido
- Pedidos entregados a tiempo
- Utilización de capacidad vehicular
- Rotación de inventario
- Satisfacción del cliente

---

**Documento preparado por:** Equipo BAMBU  
**Fecha:** Enero 2025  
**Versión:** 2.0 - Unificado y Agnóstico  
**Próxima revisión:** Post-implementación Fase 1