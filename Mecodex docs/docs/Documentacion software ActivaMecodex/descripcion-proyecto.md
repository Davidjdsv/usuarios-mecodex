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

## ActivaMecodex usa Zoneless y Signals para una reactividad más eficiente

ActivaMecodex está construida sin Zone.js y aprovecha el modo [Zoneless](https://v20.angular.dev/guide/zoneless) de Angular, lo que reduce sobrecarga y mejora el rendimiento. Además, utiliza Signals para manejar el estado de forma reactiva y precisa, asegurando actualizaciones rápidas y controladas en la interfaz sin procesos innecesarios.

## Rutas y Navegación (`src/app/app.routes.ts`)

| Ruta | Descripción | Componente |
|------|-------------|------------|
| `/` | Redirección automática | → `/inicio` |
| `/inicio` | Página de inicio | `InicioPage` |
| `/usuarios` | Listado de usuarios | `UsuariosPage` |
| `/usuario/:id` | Detalle de usuario específico | `UsuarioPage` |
| `/usuarios-web-closter` | Listado de usuarios de webcloster | `UsuariosWebClosterPage` |
| `/usuarios-web-closter/:id` | Detalle de usuario específico de webcloster | `UsuarioWebClosterPage` |
| `**` | Ruta no reconocida | → `/inicio` |

## Páginas 📄

### 1. InicioPage

<!-- Añadir imagen de la página de inicio proximamente -->

**Propósito:** Página de inicio con encabezado y título "Inicio". Tiene como propósito mostrar información general a tráves de métricas usando gráficos de barras, líneas, pie. etc. Se uso la libreria de [Apexcharts](https://apexcharts.com/)

**Funciones:**
- En la página de inicio se puede encontrar las gráficas de barras, líneas, pie. etc. que muestran información general de los clientes. Estas gráficas se separar por componentes standalone. Es decir, para cada gráfica hay un componente distinto y están ubicados en `src/app/components/charts/`. Cada uno con su respectivo .html, .scss y .ts

#### Visualización inicio de gráficas

![Gráficas de clientes](graficas.png)

#### Estructura de carpetas

![Estructura de carpetas para las gráficas](estructura_carpetas_graficas.png)

- Cada gráfica se configura con opciones específicas y se actualiza dinámicamente cuando cambian los datos de clientes, planes, clientes por país, evolución de clientes por mes.
- Por lo tanto la lógica de cada gráfica se encuentra en cada .ts de cada componente.

### 2. UsuariosPage

**Propósito:** Mostrar listado de clientes con funcionalidades de búsqueda, conteos por plan y carga incremental y un CRUD en el cual se puede registrar nuevos clientes, editar datos y eliminar registros en la plataforma mediante un formulario y agilizar procesos de activación de clientes para Mecodex. Cuenta con vista para mas detalles del cliente y los datos de su cuenta de Mecodex.
- Nota: La página de clientes se llamó en un principio "UsuariosPage", se intentó cambiar a "ClientesPage" pero daba error, así que se quedó como usuarios

#### Visualización página clientes:

![Vista general de la página de clientes](clientes.png)

#### Estructura de la carpeta con componentes de agregar, editar y eliminar

![Estructura de carpetas para la página de clientes](estructura_carpetas_clientes.png)


La aplicación estará disponible en: `http://localhost:4200/`

## Notas Técnicas

- **Estado Reactivo:** Emplea señales (signals) para gestionar estado en las páginas, facilitando actualizaciones reactivas en la vista.
- **Carga Perezosa:** Las rutas usan componentes standalone cargados de forma perezosa mediante `loadComponent`.
- **Experiencia de Usuario:** Infinite Scroll habilitado en el listado de usuarios para mejorar la experiencia de carga.
- **Arquitectura:** Separación clara entre componentes, servicios y modelos siguiendo mejores prácticas de Angular.

---

*Documentación realizada por Jhoan David Sinisterra. - Made with ❤️ -*