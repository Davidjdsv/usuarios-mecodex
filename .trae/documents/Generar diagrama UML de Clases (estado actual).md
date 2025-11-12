## Objetivo
- Crear un diagrama de clases UML que refleje las entidades y servicios implementados actualmente.

## Alcance del Diagrama
- Clases (modelos TS): `UsuariosInterface`, `PaisesInterface`, `DocumentosInterface`, `UsuariosWebClosterInterface`, `LoginResponseInterface`, `UsuariosWebClosterResponseInterface`.
- Servicios: `AuthService`, `UsuariosService`, `UsuariosWebClosterService`, `PaisServicioService`, `DocumentosService`.
- Relaciones:
  - `UsuariosService` usa `UsuariosInterface` (CRUD).
  - `PaisServicioService` retorna `PaisesInterface`; `UsuariosInterface` referencia `id_pais`.
  - `DocumentosService` retorna `DocumentosInterface`; `UsuariosInterface` referencia `id_tipo_documento`.
  - `AuthService` opera sobre `LoginResponseInterface` que contiene `UsuariosWebClosterInterface`.
  - `UsuariosWebClosterService` retorna `UsuariosWebClosterInterface[]`.

## Entregable
- Código Mermaid `classDiagram` en el chat y, si lo apruebas, crearé el archivo en `.trae/documents/diagrama-uml-clases-mermaid.md`.
- Opcional: generar `.png` del diagrama para consulta rápida.

## Exclusiones
- No se modelará `Plan` ni `UsuarioSensei` como clases separadas porque no existen modelos dedicados (solo IDs/cadenas).

## Siguiente Paso
- Tras aprobación, entrego el diagrama en Mermaid y, si quieres, lo guardo y genero imagen en `documents`.