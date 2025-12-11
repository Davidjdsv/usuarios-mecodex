---
title: "ActivaMecodex: Documentación técnica integral"
description: "Solución integral de gestión y activación de usuarios para Mecodex"
---

# ActivaMecodex: Gestión integral del ciclo de vida de usuarios

## Introducción

**ActivaMecodex** es una aplicación de gestión administrativa desarrollada por [WebCloster](https://webcloster.com/) que centraliza y automatiza los procesos de registro, activación y seguimiento de usuarios en la plataforma Mecodex.

## El problema: Gestión manual

La administración actual de usuarios de Mecodex presenta los siguientes desafíos operativos:

- **Procedimientos manuales** en activaciones, cobros y renovaciones.
- **Información fragmentada** en hojas de cálculo sin un punto de control centralizado.
- **Errores frecuentes**, como omisiones en activaciones, cobros perdidos y renovaciones vencidas no detectadas.
- **Alta carga administrativa** para equipos de desarrollo y soporte.
- **Falta de visibilidad en tiempo real** sobre el estado de usuarios y suscripciones.
- **Riesgo financiero** debido a ingresos no capturados.
- **Ausencia de reportes automáticos** sobre usuarios activos, vencidos e historial de transacciones.

## Solución: ActivaMecodex

ActivaMecodex es una plataforma centralizada que automatiza el ciclo de vida completo del usuario, diseñada específicamente para administradores internos y líderes de desarrollo.

### Funcionalidades principales

- **Registro y gestión de usuarios** con validación automática de datos.
- **Activación programada** de planes según fechas de pago confirmadas.
- **Seguimiento de suscripciones** con alertas de vencimientos próximos.
- **Reportes automáticos** de usuarios activos, vencidos, historial de pagos y análisis de renovaciones.
- **Historial auditable** de todos los cambios y transacciones para trazabilidad completa.

## Beneficios

- **Eficiencia operativa**: gestión unificada desde una única aplicación.
- **Reducción de errores** mediante la automatización de procesos críticos.
- **Reportes automáticos** que eliminan tareas manuales repetitivas.
- **Escalabilidad** para gestionar el crecimiento de usuarios sin incrementar la carga operativa.
- **Decisiones informadas** basadas en datos en tiempo real.

## Público objetivo

ActivaMecodex está dirigida a:

- **Administradores internos de WebCloster**
- **Líderes de desarrollo de Mecodex**

## Requisitos Funcionales

| Código | Requisito | Descripción |
|--------|-----------|-------------|
| RFUWC001 | Inicio de sesión | Permite a los usuarios registrados acceder al sistema mediante credenciales seguras. |
| RFUWC002 | Registro de usuarios | Permite registrar nuevos usuarios con datos básicos (nombre, correo, teléfono, contraseña). |
| RFUWC003 | Permisos del sistema | Control de acceso basado en roles y permisos asignados. |
| RFUWC004 | Acciones en clientes | CRUD completo de clientes (registrar, editar, eliminar) según permisos. |
| RFUWC005 | Activación de cuentas | Permite activar cuentas de clientes tras la confirmación de pago de sus planes. |
| RFUWC006 | Buscador de clientes | Búsqueda de clientes por nombre, correo electrónico, plan o número de teléfono. |
| RFUWC007 | Seguimiento de suscripciones | Monitoreo en tiempo real de fechas de pago, renovaciones y vencimientos próximos. |
| RFUWC008 | Detalles del cliente | Visualización detallada de la información del cliente, incluyendo datos personales y de cuenta. |
| RFUWC009 | Eliminación de usuarios | Permite a administradores eliminar usuarios de ActivaMecodex y sus datos asociados de la base de datos. |
| RFUWC010 | Visualización de datos | Dashboard con gráficas y métricas clave (total de clientes, planes, distribución por país, evolución mensual). |

## Requisitos No Funcionales

- **Rendimiento**: capacidad para manejar un alto volumen de transacciones sin degradación.
- **Fiabilidad**: gestión precisa de estados de usuarios y alertas oportunas.
- **Seguridad**: cifrado de datos y autenticación robusta.
- **Escalabilidad**: arquitectura diseñada para crecer con la plataforma.
- **Disponibilidad**: operación 24/7 con tiempo de inactividad mínimo.

## Tecnologías utilizadas

### Frontend
- Angular 20 (componentes standalone, Signals, Zoneless)
- Ionic Framework 8 + Ionicons 7
- TypeScript 5.8, RxJS 7.8
- ApexCharts para visualización de gráficas

### Backend
- PHP 8.2 para APIs y lógica de servidor

### Base de datos
- MySQL 8.0, administrada con PHPMyAdmin 5.2

### Híbrido
- Capacitor 7 para empaquetado nativo

### Herramientas de desarrollo
- Angular CLI 20, Ionic CLI 7.2.1
- ESLint 9 con @angular-eslint para análisis de código
- Karma + Jasmine para pruebas

### Documentación
- Docusaurus 3.9 (React 19) con soporte MDX

### Entorno
- Node.js >= 20, npm como gestor de paquetes

## Caracterización de procesos

### RFUWC001: Inicio de sesión
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El usuario debe estar registrado en ActivaMecodex.
- **Flujo principal**: El usuario ingresa credenciales válidas → el sistema verifica y concede acceso → el usuario accede a las funcionalidades según su rol.
- **Flujo alternativo**: Si las credenciales son incorrectas, se muestra un mensaje de error. Si el usuario no está registrado, se le redirige al proceso de registro (RFUWC002).

### RFUWC002: Registro de usuarios
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El administrador debe tener acceso a la funcionalidad de registro.
- **Flujo principal**: El administrador ingresa datos básicos del nuevo usuario → el sistema valida unicidad del correo → registra al usuario → notifica registro exitoso.
- **Flujo alternativo**: Si el correo ya está registrado, el sistema muestra error y solicita correo diferente.

### RFUWC003: Permisos del sistema
- **Actores**: Administrador.
- **Requisito previo**: El usuario a asignar permisos debe estar registrado previamente.
- **Flujo principal**: El administrador selecciona usuario → asigna roles y permisos → guarda → el sistema actualiza permisos.
- **Flujo alternativo**: Si el usuario no está registrado, se le redirige al registro.

### RFUWC004: Acciones en clientes
- **Actores**: Administrador, Soporte técnico.
- **Requisito previo**: El usuario debe tener permisos suficientes para realizar acciones sobre clientes.
- **Flujo principal**: El usuario selecciona un cliente → elige una acción (editar, eliminar) → confirma la acción → el sistema actualiza el estado del cliente en la base de datos.
- **Flujo alternativo**: Si el usuario no tiene permisos suficientes, el sistema deniega la acción. Si el usuario no está registrado, se le redirige al inicio de sesión.

### RFUWC005: Activación de cuentas
- **Actores**: Administrador, Soporte técnico.
- **Requisito previo**: El cliente debe haber confirmado el pago de su suscripción.
- **Flujo principal**: El usuario selecciona al cliente → verifica el pago confirmado → activa el plan asociado → el sistema notifica la activación exitosa.
- **Flujo alternativo**: Si el pago no está confirmado, no se procede con la activación del plan y se notifica al cliente.

### RFUWC006: Buscador de clientes
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El usuario debe tener acceso a la lista de clientes.
- **Flujo principal**: El usuario ingresa criterios de búsqueda (nombre, correo, plan, teléfono) → el sistema filtra y muestra clientes coincidentes.
- **Flujo alternativo**: Si no hay coincidencias, el sistema muestra mensaje indicando que no se encontraron resultados.

### RFUWC007: Seguimiento de suscripciones
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El cliente debe tener una suscripción activa.
- **Flujo principal**: El sistema monitorea fechas de pago y vencimiento → muestra alertas para renovaciones próximas → el usuario visualiza estado de cada suscripción.
- **Flujo alternativo**: Si no hay suscripciones activas, el sistema no muestra alertas.

### RFUWC008: Detalles del cliente
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El cliente debe existir en el sistema.
- **Flujo principal**: El usuario selecciona un cliente → el sistema muestra vista detallada con toda la información del cliente (datos personales, plan, estado, información de cuenta, etc.).
- **Flujo alternativo**: Si el cliente no existe, el sistema redirige a la lista de clientes.

### RFUWC009: Eliminación de usuarios de ActivaMecodex
- **Actores**: Administrador.
- **Requisito previo**: El usuario a eliminar debe existir en el sistema.
- **Flujo principal**: El administrador selecciona usuario → confirma eliminación → el sistema elimina al usuario y sus datos asociados de la base de datos.
- **Flujo alternativo**: Si el usuario no tiene permisos de administrador, no puede acceder a esta funcionalidad.

### RFUWC010: Visualización de datos
- **Actores**: Administrador, Soporte técnico, Ejecutivo comercial.
- **Requisito previo**: El usuario debe tener permisos para ver el dashboard.
- **Flujo principal**: El usuario accede al dashboard → el sistema muestra gráficas y métricas clave (total de clientes, planes, distribución por país, evolución mensual).
- **Flujo alternativo**: Si no hay datos, el sistema muestra gráficas vacías o mensajes indicando ausencia de datos.

## Diagramas UML

### Diagrama de Casos de Uso

![Diagrama de Casos de Uso](./img/diagrama_casos_de_uso.jpeg)

### Diagrama de Secuencia

![Diagrama de Secuencia](./img/diagrama_de_secuencia.jpeg)

## Diseño de Base de Datos

### Modelo Entidad-Relación (MER)

![MER de Mecodex](./img/mer_mecodex.png)

Para ver interactivamente: [MER en dbdiagram.io](https://dbdiagram.io/d/mer_mecodex-6905190d6735e11170b84c4d)

## API y Endpoints

> *Sección en desarrollo. Incluirá:*
> - Base URL, autenticación (Bearer Token)
> - Endpoints para clientes, cuentas, métricas
> - Ejemplos de solicitud y respuesta

## Diseño de Interfaz de Usuario

> *Sección en desarrollo. Incluirá:*
> - Wireframes de login, dashboard, listados, detalle
> - Navegación con menú lateral responsivo
> - Componentes Ionic y directrices de accesibilidad

## Configuración y Despliegue

> *Sección en desarrollo. Incluirá:*
> - Requisitos de entorno (Node, Angular, BD)
> - Variables de entorno críticas
> - Comandos de instalación, build y despliegue
> - Configuración de Docker, Nginx, CORS

## Mantenimiento y Operaciones

> *Sección en desarrollo. Incluirá:*
> - Políticas de backup, monitoreo, logs
> - Plan de actualizaciones y rollback

## Plan de Pruebas

> *Sección en desarrollo. Incluirá:*
> - Estrategia de pruebas (unitarias, integración, E2E)
> - Cobertura objetivo, casos de prueba críticos
> - Pruebas de rendimiento y carga

## Seguridad

> *Sección en desarrollo. Incluirá:*
> - Autenticación JWT, manejo de tokens
> - Autorización por roles, guards de Angular
> - Protección de datos, sanitización, OWASP

## Glosario de Términos

| Término | Definición |
|---------|------------|
| Cliente | Persona o empresa registrada en Mecodex |
| Cuenta | Acceso a la aplicación asociado a un cliente (correo, plan, país). Un cliente puede tener una o mas cuentas. |
| Plan/Licencia | Nivel de suscripción (LITE, PRO, PRO PLUS) |
| Métricas | KPIs y agregaciones para el dashboard |
| Signal | Primitiva reactiva de Angular para gestión de estado |
| Zoneless | Modo de Angular sin Zone.js para mejor rendimiento |

## Referencias y Anexos

> *Sección en desarrollo. Incluirá:*
> - Contratos de API, esquemas SQL
> - Diagramas de arquitectura y despliegue
> - Guías de estilo y componentes