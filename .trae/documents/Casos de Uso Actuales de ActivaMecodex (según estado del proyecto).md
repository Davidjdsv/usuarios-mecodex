## Alcance Actual
- Aplicación Angular/Ionic con autenticación JWT y gestión de clientes.
- Rutas principales: `inicio`, `usuarios`, `usuario/:id`, `usuarios-web-closter`, `login` (`src/app/app.routes.ts`).
- Servicios: `AuthService`, `UsuariosService`, `UsuariosWebClosterService`, `PaisServicioService`, `DocumentosService`.
- Backend PHP de referencia para login/listado (JWT) y CRUD.
- Diagrama de casos de uso referenciado en `Mecodex docs/docs/Documentacion software ActivaMecodex/documento-oficial-ActivaMecodex.md:144`.

## Actores
- Administrador interno (WebCloster).
- Soporte técnico.
- Líder de desarrollo.
- Perfiles generales de la plataforma Mecodex (Administrador, Vendedor, Cajero, Supervisor) — documentado, no implementado en esta app.

## Entidades Clave
- Cliente/Usuario Mecodex (con país, tipo de documento, plan `PLAN_MECODEX`).
- Usuario interno WebCloster (credenciales y roles).
- Catálogos: Países y Tipos de Documento.

## Casos de Uso por Actor

### Administrador interno (WebCloster)
1. Iniciar sesión
   - Precondiciones: usuario interno existente con credenciales válidas.
   - Flujo básico: ingresar usuario/clave → API login → recibir y almacenar JWT → acceso a rutas protegidas.
   - Postcondiciones: sesión activa; guard habilita navegación.
   - Alternativas: credenciales inválidas; error de API.
2. Listar clientes
   - Precondiciones: sesión activa.
   - Flujo básico: acceder a `Usuarios` → obtener listado con búsqueda y conteos por plan → paginación/infinite scroll.
   - Postcondiciones: visualización actualizada.
   - Alternativas: filtros sin resultados; error de red.
3. Ver detalle de cliente
   - Precondiciones: cliente existente; sesión activa.
   - Flujo básico: seleccionar cliente → cargar perfil completo.
   - Postcondiciones: datos visibles para decisión/soporte.
   - Alternativas: cliente no encontrado.
4. Crear cliente
   - Precondiciones: sesión activa; catálogos disponibles.
   - Flujo básico: abrir modal → completar formulario (país/documento/plan) → guardar vía API.
   - Postcondiciones: cliente creado; listado se actualiza.
   - Alternativas: validación fallida; error de servidor.
5. Editar cliente
   - Precondiciones: cliente existente; sesión activa.
   - Flujo básico: abrir modal de edición → actualizar campos → guardar.
   - Postcondiciones: cambios persistidos; detalle/listado reflejan actualización.
   - Alternativas: conflicto de datos; validación fallida.
6. Eliminar cliente
   - Precondiciones: cliente existente; sesión activa.
   - Flujo básico: abrir modal de confirmación → eliminar vía API.
   - Postcondiciones: cliente removido del listado.
   - Alternativas: restricción de referencialidad; error de API.
7. Listar usuarios internos (WebCloster)
   - Precondiciones: sesión activa.
   - Flujo básico: acceder a página de usuarios internos → cargar listado.
   - Postcondiciones: visibilidad de accesos; soporte a administración.
   - Alternativas: error de carga.
8. Cerrar sesión
   - Flujo básico: ejecutar logout → eliminar token → redirigir a `login`.
   - Postcondiciones: rutas protegidas bloqueadas.

### Soporte técnico
1. Consultar clientes y estado
   - Flujo: usar listado y detalle para validaciones, activaciones manuales y seguimiento.
2. Consultar planes y clasificación
   - Flujo: identificar `LITE/PRO/PRO PLUS/PRO PLUS WEB` para orientar procesos.
3. Referenciar guías y PQR
   - Flujo: consultar `manual-soporte.md` y `PQR-mecodex.md` para resolución y comunicación.

### Líder de desarrollo
1. Supervisar estados y planes
   - Flujo: revisar detalle de clientes y métricas básicas en listado.
2. Coordinar usuarios internos
   - Flujo: revisar listado de usuarios WebCloster (gestión avanzada de roles se contempla a nivel de backend/documentación).

## Notas de Alcance vs Implementación
- Automatizaciones de activación, reportes automáticos y auditorías están planteadas en documentación pero aún no visibles en la app.
- Permisos por rol existen en el backend; la UI actual expone listado, no gestión granular.

## Próximos Ajustes (si se desea ampliar el diagrama)
- Desglosar casos de uso de automatización de activaciones por plan.
- Incorporar casos de uso de reportes (generar/exportar) y auditoría.
- Agregar gestión de roles/permisos en UI.
- Añadir estados de suscripción y flujos de renovación/cancelación.
