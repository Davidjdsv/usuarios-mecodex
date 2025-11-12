## Objetivo
- Elaborar un diagrama UML de casos de uso basado únicamente en funcionalidades ya presentes en la app (Angular/Ionic) y su backend PHP de referencia.

## Alcance del Diagrama
- Actores: Administrador interno (WebCloster), Soporte técnico, Líder de desarrollo.
- Casos de uso incluidos (implementados):
  - Autenticación (iniciar/cerrar sesión).
  - Gestión de clientes (listar, ver detalle, crear, editar, eliminar).
  - Usuarios internos (listar).
  - Soporte (consultar clientes/estados, consultar planes, referenciar guías).
  - Liderazgo (supervisar estados/planes, coordinar usuarios internos).
- Relaciones: asociaciones actor↔caso y `include` para agrupar "Gestionar clientes" con CRUD y consultas.

## Entregable
- Código PlantUML listo para renderizar (texto en el chat) sin modificar archivos del repositorio.

## Exclusiones
- No se incluyen automatizaciones de activación, reportes automáticos ni auditorías, ya que no están implementados en la UI actual.

## Siguiente Paso
- Tras aprobación, entregar el código PlantUML del diagrama en el chat.