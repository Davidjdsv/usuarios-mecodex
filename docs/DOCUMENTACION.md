Documentación del proyecto: usuarios_mecodex

Descripción general
- Aplicación Ionic + Angular para visualizar y gestionar usuarios de Mecodex.
- Utiliza componentes standalone de Angular y señales (signals) para el estado reactivo.
- Consumo de datos desde un servicio HTTP (UsuariosService) con configuración de entorno.

Tecnologías principales
- Angular 20, Ionic Angular 8.
- RxJS para manejo de Observables.
- Entornos en src/environments para configurar la API.

Rutas y navegación (src/app/app.routes.ts)
- /  → redirección a /inicio.
- /inicio → Página de inicio (InicioPage).
- /usuarios → Listado de usuarios (UsuariosPage).
- /usuario/:id → Detalle de usuario (UsuarioPage) según su id.
- Cualquier ruta no reconocida redirige a /inicio.

Páginas
1) InicioPage (src/app/pages/inicio/inicio.page.ts y .html)
- Propósito: página de inicio con encabezado y título “Inicio”.
- Funciones:
  - ngOnInit(): ciclo de vida inicial, actualmente sin lógica adicional.

2) UsuariosPage (src/app/pages/usuarios/usuarios.page.ts y .html)
- Propósito: mostrar el listado de usuarios con búsqueda, conteos por plan y carga incremental.
- Estado (signals):
  - folder: etiqueta del encabezado (“Clientes Mecodex”).
  - usuarios: lista visible de usuarios (inicialmente vacía, luego rellenada).
  - usuariosOriginales: lista original descargada sin filtros.
  - searchUsers: texto de búsqueda (string) enlazado al IonSearchbar.
  - usuariosLimitados: lista de usuarios limitada (preparada para usos futuros).
  - indiceActual: índice para la siguiente carga de usuarios.
  - LIMITE_USUARIOS: número máximo por bloque de carga.
  - cont_usuarios_pro_plus, cont_usuarios_pro_plus_web, cont_usuarios_pro, cont_usuarios_lite, cont_usuarios_totales: contadores por plan y total.
- Funciones:
  - ngOnInit(): solicita usuarios al servicio UsuariosService y, al recibir datos, guarda originales, inicia carga de primeros usuarios y calcula conteos por tipo.
  - cargarUsuariosInicial(): toma los primeros LIMITE_USUARIOS de usuariosOriginales, los coloca en usuarios y ajusta el índice inicial.
  - contarUsuariosPorTipo(): recorre usuariosOriginales una vez para contar usuarios por plan (PRO PLUS, PRO PLUS WEB, PRO, LITE) y el total; actualiza señales de conteo.
  - filterUsers(): filtra usuariosOriginales según el texto de búsqueda en nombre, correo, teléfono o documento (búsqueda insensible a mayúsculas/minúsculas) y actualiza usuarios con el resultado.
  - loadMore(event): implementa carga incremental para Infinite Scroll; añade bloques de usuarios hasta alcanzar el total; deshabilita el scroll cuando no hay más elementos.
- Plantilla (usuarios.page.html):
  - Encabezado y título.
  - IonSearchbar con [(ngModel)] hacia searchUsers y (ionInput) hacia filterUsers.
  - Bloque con conteos por plan usando IonBadge.
  - Listado de usuarios en tarjetas (IonCard) con datos clave (id, nombre, contacto, email, documento, plan, país) y enlace al detalle.
  - IonInfiniteScroll para cargar más usuarios.

3) UsuarioPage (src/app/pages/usuario/usuario.page.ts y .html)
- Propósito: mostrar información detallada de un usuario seleccionado por id.
- Estado (signals):
  - id y múltiples señales para campos: nombre, segundo_nombre, apellido, segundo_apellido, telefono, direccion, id_tipo_documento, abreviatura, estado, modo_conexion, version_app, fecha_clasificacion, clasificacion, mensaje_clasificacion, documento, fecha_expedicion, correo, id_pais, pais_nombre, PLAN_MECODEX, observacion_cliente, observacion_comercial, observacion_soporte, observacion_cuenta, fecha_creacion, id_usuario_sensei, fecha_modificacion.
- Funciones:
  - ngOnInit(): obtiene el parámetro :id de la ruta activa y llama a getUser().
  - getUser(): consume UsuariosService.getUsuarios(), busca el usuario por id y, si lo encuentra, rellena todas las señales con los datos del usuario.
- Plantilla (usuario.page.html):
  - Botón “Volver” hacia /usuarios.
  - Secciones con información: nombre/contacto/email; documento/plan/país; datos adicionales (versión app, modo conexión, estado), clasificación; y observaciones (accordion para cliente, cuenta, comercial y soporte).
  - Divisores visuales agregados entre secciones con texto centrado (por ejemplo, “Más información”, “Clasificación”, “Observaciones”).

Componentes
- NotFoundComponent (src/app/components/not-found/*)
  - Propósito: mostrar un mensaje de “no encontrado” reutilizable cuando no hay resultados.
  - Entradas (@Input):
    - title: título contextual (por ejemplo, “clientes de Mecodex”).
    - firstValue: primer valor de búsqueda mostrado.
  - Funciones: ngOnInit() sin lógica adicional; la presentación está en la plantilla.

Servicios
- UsuariosService (src/app/services/usuarios.service.ts)
  - Propósito: gestionar la obtención de usuarios desde la API configurada.
  - Estado: api (signal) con la URL base desde environment.api_db.
  - Funciones:
    - getUsuarios(): realiza un GET hacia api_db y mapea la respuesta (UsuariosResponseInterface → UsuariosInterface[]), adaptando nombres de ciertos campos (por ejemplo, fecha_calificacion → fecha_clasificacion, calificacion → clasificacion) y garantizando que todos los campos necesarios estén presentes.

Modelos
- UsuariosInterface y UsuariosResponseInterface (src/app/models/usuarios-interface.ts)
  - UsuariosInterface: describe las propiedades de un usuario integrando datos de varias tablas (cliente, cuenta, país, tipo_documento, usuario_sensei). Algunos campos son opcionales.
  - UsuariosResponseInterface: representa la respuesta de la API (succes, data, total).

Entornos (src/environments)
- environment.ts: production=false; api_db apunta a “http://localhost/backend-mecodex/cliente.php”.
- environment.prod.ts: production=true.
- El build reemplaza environment.ts por environment.prod.ts según configuración en angular.json.

Estilos relevantes añadidos recientemente
- usuarios.page.scss: estilos para hacer que la imagen dentro de IonThumbnail (.thumb-cover img) ocupe todo el espacio del contenedor, utilizando width/height: 100% y object-fit: cover; el thumbnail usa --size: 100%.
- usuario.page.scss: estilos para divisores de sección (.break-section y .break-section__text) con líneas grises claras y texto centrado con borde sutil.

Cómo ejecutar
- npm install
- npm run start (levanta la app en http://localhost:4200/)

Notas
- El proyecto emplea señales (signal) para gestionar estado en las páginas, lo que facilita actualizaciones reactivas en la vista.
- Las rutas usan componentes standalone cargados de forma perezosa (loadComponent).
- Infinite Scroll está habilitado en el listado de usuarios para mejorar la experiencia de carga.