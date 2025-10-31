---
title: "ActivaMecodex"
description: "Aplicación Ionic + Angular para visualizar y gestionar usuarios de Mecodex. Utiliza componentes standalone de Angular y señales (signals) para el estado reactivo, con consumo de datos desde un servicio HTTP (UsuariosService) configurado mediante variables de entorno."
---

# Documentación del Proyecto: ActivaMecodex

## Descripción General

Aplicación Ionic + Angular para visualizar y gestionar usuarios de Mecodex. Utiliza componentes standalone de Angular y señales (signals) para el estado reactivo, con consumo de datos desde un servicio HTTP (UsuariosService) configurado mediante variables de entorno.

## Tecnologías Principales

- **Angular 20** con componentes standalone
- **Ionic Angular 8** para componentes UI
- **RxJS** para manejo de Observables
- **Entornos configurables** en `src/environments`

## Rutas y Navegación (`src/app/app.routes.ts`)

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/` | Redirección automática | → `/inicio` |
| `/inicio` | Página de inicio | `InicioPage` |
| `/usuarios` | Listado de usuarios | `UsuariosPage` |
| `/usuario/:id` | Detalle de usuario específico | `UsuarioPage` |
| `**` | Ruta no reconocida | → `/inicio` |

## Páginas

### 1. InicioPage (`src/app/pages/inicio/inicio.page.ts` y `.html`)

**Propósito:** Página de inicio con encabezado y título "Inicio".

**Funciones:**
- `ngOnInit()`: Ciclo de vida inicial (actualmente sin lógica adicional)

**Plantilla:** Encabezado básico con título de la aplicación.

### 2. UsuariosPage (`src/app/pages/usuarios/usuarios.page.ts` y `.html`)

**Propósito:** Mostrar listado de usuarios con funcionalidades de búsqueda, conteos por plan y carga incremental.

**Estado (Signals):**
```typescript
folder: string = "Clientes Mecodex"
usuarios: UsuariosInterface[] = [] // Lista visible
usuariosOriginales: UsuariosInterface[] = [] // Lista completa sin filtros
searchUsers: string = "" // Texto de búsqueda
usuariosLimitados: UsuariosInterface[] = [] // Lista limitada (uso futuro)
indiceActual: number = 0 // Índice para carga incremental
LIMITE_USUARIOS: number = 20 // Máximo por bloque

// Contadores por plan
cont_usuarios_pro_plus: number = 0
cont_usuarios_pro_plus_web: number = 0
cont_usuarios_pro: number = 0
cont_usuarios_lite: number = 0
cont_usuarios_totales: number = 0
```

**Funciones Principales:**

- `ngOnInit()`: Solicita usuarios al servicio, guarda lista original, carga usuarios iniciales y calcula conteos por tipo de plan.

- `cargarUsuariosInicial()`: Toma los primeros `LIMITE_USUARIOS` de la lista original y actualiza la lista visible.

- `contarUsuariosPorTipo()`: Recorre una vez la lista original para contar usuarios por plan (PRO PLUS, PRO PLUS WEB, PRO, LITE) y actualiza las señales de conteo.

- `filterUsers()`: Filtra `usuariosOriginales` según texto de búsqueda en nombre, correo, teléfono o documento (case-insensitive).

- `loadMore(event)`: Implementa carga incremental para Infinite Scroll, añadiendo bloques de usuarios hasta completar el total.

**Plantilla (`usuarios.page.html`):**
- Encabezado con título
- `IonSearchbar` con enlace bidireccional a `searchUsers`
- Bloque visual con conteos por plan usando `IonBadge`
- Listado de usuarios en tarjetas (`IonCard`) con datos clave
- `IonInfiniteScroll` para carga incremental

### 3. UsuarioPage (`src/app/pages/usuario/usuario.page.ts` y `.html`)

**Propósito:** Mostrar información detallada de un usuario específico según ID.

**Estado (Signals):**
```typescript
id: string
nombre: string
segundo_nombre: string
apellido: string
segundo_apellido: string
telefono: string
direccion: string
id_tipo_documento: string
abreviatura: string
estado: string
modo_conexion: string
version_app: string
fecha_clasificacion: string
clasificacion: string
mensaje_clasificacion: string
documento: string
fecha_expedicion: string
correo: string
id_pais: string
pais_nombre: string
PLAN_MECODEX: string
observacion_cliente: string
observacion_comercial: string
observacion_soporte: string
observacion_cuenta: string
fecha_creacion: string
id_usuario_sensei: string
fecha_modificacion: string
```

**Funciones:**
- `ngOnInit()`: Obtiene parámetro `:id` de la ruta y llama a `getUser()`
- `getUser()`: Consulta servicio `UsuariosService`, busca usuario por ID y actualiza todas las señales

**Plantilla (`usuario.page.html`):**
- Botón "Volver" a `/usuarios`
- Secciones organizadas:
  - Información básica (nombre, contacto, email)
  - Documentación (documento, plan, país)
  - Datos adicionales (versión app, modo conexión, estado)
  - Clasificación
  - Observaciones (en acordeón: cliente, cuenta, comercial, soporte)
- Divisores visuales entre secciones

## Componentes

### NotFoundComponent (`src/app/components/not-found/`)

**Propósito:** Componente reutilizable para mostrar mensaje "no encontrado".

**Inputs:**
- `@Input() title: string` - Título contextual (ej: "clientes de Mecodex")
- `@Input() firstValue: string` - Primer valor de búsqueda mostrado

**Funciones:** `ngOnInit()` sin lógica adicional

## Servicios

### UsuariosService (`src/app/services/usuarios.service.ts`)

**Propósito:** Gestionar obtención de usuarios desde API configurada.

**Estado:**
- `api: signal` - URL base desde `environment.api_db`

**Funciones:**
- `getUsuarios()`: Realiza GET a `api_db` y mapea respuesta (`UsuariosResponseInterface → UsuariosInterface[]`), adaptando nombres de campos:
  - `fecha_calificacion` → `fecha_clasificacion`
  - `calificacion` → `clasificacion`
  - Garantiza que todos los campos necesarios estén presentes

## Modelos

### Interfaces (`src/app/models/usuarios-interface.ts`)

**UsuariosInterface:**
```typescript
interface UsuariosInterface {
  // Datos integrados de múltiples tablas (cliente, cuenta, país, tipo_documento, usuario_sensei)
  id?: string
  nombre?: string
  segundo_nombre?: string
  apellido?: string
  // ... demás campos (algunos opcionales)
}
```

**UsuariosResponseInterface:**
```typescript
interface UsuariosResponseInterface {
  success: boolean
  data: UsuariosInterface[]
  total: number
}
```

## Entornos (`src/environments`)

**environment.ts:**
```typescript
export const environment = {
  production: false,
  api_db: "http://localhost/backend-mecodex/cliente.php"
}
```

**environment.prod.ts:**
```typescript
export const environment = {
  production: true
  // api_db se configura según entorno de producción
}
```

**Configuración:** El build reemplaza `environment.ts` por `environment.prod.ts` según configuración en `angular.json`.

## Estilos Relevantes

**usuarios.page.scss:**
```scss
.thumb-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

ion-thumbnail {
  --size: 100%;
}
```

**usuario.page.scss:**
```scss
.break-section {
  border-top: 1px solid var(--ion-color-light-shade);
  margin: 1rem 0;
}

.break-section__text {
  text-align: center;
  border: 1px solid var(--ion-color-light);
  // Estilos adicionales para texto centrado con borde sutil
}
```

## Cómo Ejecutar

```bash
npm install
npm run start
```

La aplicación estará disponible en: `http://localhost:4200/`

## Notas Técnicas

- **Estado Reactivo:** Emplea señales (signals) para gestionar estado en las páginas, facilitando actualizaciones reactivas en la vista.
- **Carga Perezosa:** Las rutas usan componentes standalone cargados de forma perezosa mediante `loadComponent`.
- **Experiencia de Usuario:** Infinite Scroll habilitado en el listado de usuarios para mejorar la experiencia de carga.
- **Arquitectura:** Separación clara entre componentes, servicios y modelos siguiendo mejores prácticas de Angular.

---

*Documentación convertida a formato Markdown manteniendo la integridad técnica del contenido original.*