## Objetivo
- Capturar `id_usuario_wc` desde la ruta y mostrar el detalle del usuario Web Closter, consultando el backend por ID.

## Cambios
- Servicio: añadir `getUsuarioWebClosterById(id)` que haga `GET` con `id_usuario_wc` en query y mapee la respuesta a `UsuariosWebClosterInterface` (robusto ante `data` como objeto o arreglo).
- Página `usuario-web-closter`: capturar param `id_usuario_wc` con `ActivatedRoute`, definir señal única `usuario_wc` y cargar detalle usando el nuevo método del servicio. Mantener `ChangeDetectionStrategy.OnPush`.
- Comentarios explicativos: incluir comentarios en el código según la solicitud del usuario.

## Archivos
- `src/app/core/services/usuarios-webcloster.service.ts`
- `src/app/pages/usuario-web-closter/usuario-web-closter.page.ts`

## Exclusiones
- No se tocan rutas (ya existe `usuario-web-closter/:id_usuario_wc`).
- No se modifican plantillas (ya referencian `usuario_wc`).

## Entrega
- Parches aplicados con comentarios explicando propósito y flujo.