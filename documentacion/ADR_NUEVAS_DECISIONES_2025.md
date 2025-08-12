# Architecture Decision Records (ADR) - Decisiones 2025

**Versión**: 1.0.0 (Decisiones consolidadas)  
**Actualizado**: 2025-08-12 (Migración a React completada)  
**Estado**: Registro oficial de decisiones arquitectónicas  

## Introducción

Este documento registra las decisiones arquitectónicas tomadas el **2025-08-12** durante la migración a React del sistema BAMBU. Estas decisiones reemplazan y actualizan los ADRs previos.

---

## ADR-008: Desarrollo Local Sin Docker

### Estado: ✅ Aceptado
### Fecha: Agosto 2025
### Contexto
El equipo evaluó usar Docker para desarrollo vs desarrollo local directo.

### Decisión
**Desarrollo local directo** usando Laragon en Windows.

### Razones
1. **Equipo pequeño**: 1-2 desarrolladores, no necesitamos portabilidad
2. **Setup más simple**: Laragon ya provee todo lo necesario
3. **Performance**: Sin overhead de virtualización
4. **Debugging**: Más directo y familiar

### Consecuencias
- ✅ Setup más rápido
- ✅ Menos complejidad
- ✅ Mejor performance local
- ❌ Menos portabilidad (pero no la necesitamos)

---

## ADR-009: PostgreSQL como Base de Datos Principal

### Estado: ✅ Aceptado (Decisión Corregida)
### Fecha: Agosto 2025
### Contexto
Evaluación inicial incorrecta sugirió MySQL por conveniencia. Revisión con mentalidad de owner.

### Decisión
**PostgreSQL 15+** como base de datos principal.

### Razones (Arquitectura Correcta)
1. **JSON Support Superior**: Cotizador maneja estructuras complejas
2. **Performance**: Queries complejas y reportes más eficientes
3. **Escalabilidad**: Particionamiento nativo para crecimiento
4. **Data Integrity**: ACID compliance más robusto
5. **Futuro**: Features avanzadas que necesitaremos

### Consecuencias
- ✅ Arquitectura sólida a largo plazo
- ✅ Mejor performance en casos complejos  
- ✅ Escalabilidad nativa
- ❌ Setup inicial ligeramente más complejo (justificado)

---

## ADR-010: React 19 SPA (Cambio de Vue a React)

### Estado: ✅ Aceptado (Actualizado)
### Fecha: Agosto 2025 (Revisado)
### Contexto
Decisión inicial fue Vue.js 3, pero se determinó migrar a React 19 para mejor ecosistema y oportunidades de desarrollo.

### Decisión
**React 19 SPA** + TypeScript + Vite + Tailwind v4, separado del backend Laravel.

### Razones
1. **Ecosistema maduro**: Mayor comunidad y recursos disponibles
2. **shadcn/ui**: Sistema de componentes moderno y escalable
3. **React Query**: Estado de servidor robusto y optimizado
4. **Experiencia de equipo**: Mayor familiaridad con React ecosystem
5. **Separación clara**: API backend + SPA frontend desacoplados

### Consecuencias
- ✅ UX/UI consistente con componentes modernos
- ✅ Separación total de responsabilidades
- ✅ Mejor experiencia de desarrollo (DX)
- ✅ Reutilización del backend Laravel sin cambios
- ❌ Requiere desarrollo completo del frontend desde cero

---

## ADR-011: Deploy Manual (Sin CI/CD)

### Estado: ✅ Aceptado
### Fecha: Agosto 2025
### Contexto
Documentación original incluía CI/CD automático.

### Decisión
**Deploy manual** en VPS cuando el MVP esté listo.

### Razones
1. **Simplicidad**: No necesitamos automation compleja
2. **Control**: Deploy manual permite revisión
3. **Escala**: Para equipo pequeño es suficiente
4. **Foco**: Priorizamos funcionalidad sobre automatización

### Consecuencias
- ✅ Menos complejidad
- ✅ Control total del proceso
- ✅ Foco en desarrollo
- ❌ Deploy más lento (pero poco frecuente)

---

## ADR-012: Sin Herramientas de Monitoreo Pagos

### Estado: ✅ Aceptado
### Fecha: Agosto 2025
### Contexto
Documentación original incluía Sentry y servicios pagos.

### Decisión
**Logs nativos de Laravel** para monitoreo y debugging.

### Razones
1. **Costo**: Evitamos gastos innecesarios
2. **Suficiencia**: Laravel logs cubren nuestras necesidades
3. **Simplicidad**: Una herramienta menos que configurar
4. **Interno**: Sistema interno, no necesita monitoreo 24/7

### Consecuencias
- ✅ Sin costos adicionales
- ✅ Setup más simple
- ✅ Logs centralizados en Laravel
- ❌ Menos features avanzadas (pero no las necesitamos)

---

## ADR-013: Roadmap de 16 Semanas (Confirmado)

### Estado: ✅ Aceptado (Rectificado)
### Fecha: Agosto 2025
### Contexto
Se confirmó que 16 semanas es viable dado que el backend ya está operativo y solo requiere desarrollo del frontend.

### Decisión
**16 semanas (4 meses)** para completar el frontend React.

### Razones
1. **Backend operativo**: Laravel ya completamente funcional
2. **Solo frontend**: React SPA conectando a API existente
3. **PRD alineado**: Timeline original del PRD es correcto
4. **Fases claras**: 4 fases de 4 semanas cada una

### Consecuencias
- ✅ Timeline alineado con PRD
- ✅ Backend reutilizable sin cambios
- ✅ Foco exclusivo en frontend
- ✅ Go-live en tiempo planificado

---

## RESUMEN DE DECISIONES

### Stack Final Confirmado
- **Backend**: Laravel 11 + PostgreSQL + Sanctum
- **Frontend**: React 19 + TypeScript + Vite + Tailwind v4
- **Desarrollo**: Laragon local (no Docker)
- **Deploy**: Manual en VPS
- **Monitoreo**: Laravel logs nativos

### Principios de Desarrollo
1. **Pragmatismo sobre perfección**
2. **Simplicidad sobre complejidad**
3. **Calidad sobre velocidad**
4. **Foco en funcionalidad del negocio**

---

---

## LECCIÓN APRENDIDA - CORRECCIÓN IMPORTANTE

### ⚠️ Error de Perspectiva Inicial
Durante la configuración inicial, se consideró cambiar de PostgreSQL a MySQL por **conveniencia técnica** (disponibilidad en Laragon). 

### ✅ Corrección con Mentalidad de Owner
Se revirtió la decisión priorizando:
1. **Arquitectura correcta** sobre conveniencia
2. **Visión a largo plazo** sobre facilidad inmediata  
3. **Calidad del producto** sobre velocidad de setup

### 📖 Principio Confirmado
> **Owner piensa en el producto y la arquitectura correcta, no en la conveniencia de desarrollo.**

---

**Documento creado**: 2025-08-12  
**Estado**: Decisiones finales aprobadas (React confirmado)  
**Próxima revisión**: Al completar Fase 1 del frontend