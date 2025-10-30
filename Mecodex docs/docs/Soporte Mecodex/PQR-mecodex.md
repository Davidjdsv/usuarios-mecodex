---
title: "Preguntas, errores frecuentes sobre funcionalidades de Mecodex"
description: "Guía rápida de como resolver errores frecuentes sobre funcionalidades de Mecodex."
---

# Preguntas, errores frecuentes sobre funcionalidades de Mecodex

## Inventario 📦

### ¿Qué es habilitar un subproducto?

En primera instancia esta opción nos sale según la cantidad de subproductos que tengamos registrados en el apartado de *subproductos*.

Si no tenemos ningún subproducto registrado, esta opción no nos aparecerá.

Un ejemplo de caso de uso podría ser que tenemos registrado **gaseosas** y de esas gaseosas podemos tener diferentes sabores (uva, manzana, mango, etc.)

#### ¿Diferencia entre categoría y subproductos?

Si, una categoría abarca un conjunto de productos que comparten ciertas características o son parte de un mismo grupo.

- Ejemplo: 
  - Categoría: Gaseosas
  - Subproductos: Uva, Manzana, Mango, etc.

### ¿Qué son o como funcionan los impuestos?

Los impuestos se añaden en su debida sección y sirven para aplicarle impuestos o retenciones a los productos o servicios que vamos a vender.

- Ejemplo:
  - Impuesto: IVA (21%)
  - Retención: 10%

### ¿Es producto para la venta?

Por defecto siempre está marcado como *producto para la venta* lo cual indica que el producto se mostrará en las ventas, de lo contrario, es un producto para almacenar en el inventario como materia prima para crear otros productos o insumos a usar en nuestro negocio por lo tanto no se muestran para su venta.

Ejemplo:

| Producto | ¿Es para la venta? |
|------|-------------|
| Gaseosa | Sí |
| Harina | No |

### Existencia ilimitadada

Al poner esta opción como *sí*, el producto no tendrá un límite de existencia, por lo tanto, podremos venderlo cuantas veces queramos y no se descontará del inventario (existencia) ya que es un producto que siempre tenemos a la mano.

## Ventas 🛒

### ¿Cómo se realizan las ventas?

Le damos click al botón ➕ que se encuentra en la parte inferior derecha de la pantalla.

- Agregamos nuestro cliente si lo tenemos registrado en el sistema (Por defecto, le vendemos al cliente general)

- Si el cliente tiene cupo para crédito, se mostrará disponible para cambiar su opción de contado a crédito

- Se elige un método de pago según los que tengamos registrados en nuestro sistema (Efectivo, Tarjeta, Transferencia, etc.)

- Los *[Impuestos](#impuestos)* que tengamos registrados para métodos de pago registrados (Si los tenemos)

## Créditos 💳

### ¿Cómo se realizan los créditos?

Para poder tener un crédito, el **[cliente](#clientes)** debe tener un cupo para crédito. Para poder crear un cliente con cupo de crédito, al momento de registrarlo, debemos ir a la sección de *cupo de crédito*, activar la opción y agregarle el valor que deseemos darle a nuestro cliente para su cupo de crédito.

En la sección de créditos, podemos observar todos nuestros clientes con pagos pendientes en créditos, desde cuando se realizó el crédito, cuando lo debe de pagar y cuánto abonó y su saldo, etc. El sistema nos notifica cuando el cliente debe de pagar y si tiene algún saldo pendiente en mora.

## Gastos 💡🏢

En este modulo podemos registrar todos los gastos en nuestro sistema. Como por ejemplo gastos de servicios, pago de nómina, pago de arriendo, etc.

## Clientes 👥

### ¿Cómo registro un cliente?

Para registrar los clientes se debe de llenar un formulario sencillo con sus datos personales. Aquí podemos registrar clientes para cupo de crédito.

## Reportes 📊

Aquí podemos generar reportes sobre nuestros clientes, ventas, compras, gastos, etc.

### ¿Cómo registro mis códigos de barra?

En la primera sección de reportes, en el apartado de *reporte de productos* podemos imprimir los códigos de barra de nuestro productos ya invetariados. 
Seguidamente podemos elegir si sacar los códigos de barra para todos los productos o para productos en especifico. También podemos editar la escala (Tamaño de los códigos de barra) y la cantidad de códigos por página.

### ¿Cómo hago mi cuadre de caja?

En la sección de reportes, en el apartado de *cuadre de caja* (Última sección) podemos ver el cuadre de caja de nuestro negocio. Aquí podemos ver el total de ventas, compras, gastos, etc. y el balance final. Seleccionando un rango de fechas, podemos ver el cuadre de caja de ese período de tiempo seleccionado. Realizar esta acción nos generará un reporte en formato PDF.

### No me da el cuadre de caja, ¿Qué hago?

Razones por las que esto podría estar sucediendo en la app de Mecodex:

1. **Configuraciones incorrectas:** Revisa las configuraciones de la app para asegurarte de que todo esté ajustado correctamente según tus necesidades.
2. **Sincronización de datos:** Verifica que la app esté sincronizando correctamente los datos con la nube. A veces, una sincronización fallida puede causar problemas.
3. **Actualizaciones pendientes:** Asegúrate de que la app esté actualizada a la última versión. Las actualizaciones pueden corregir errores y mejorar la funcionalidad.
4. **Errores de entrada:** Asegúrate de que todos los datos ingresados sean correctos y completos. Un solo error puede causar un desajuste.

**Resumen de modos de acceso:**
- **Lector:** Se puede tener en los dispositivos que lo necesite (Solo en modo web).
- **Administrador:** Se puede tener en un solo dispositivo sea móvil o web.

**Nota importante:** El registro se inicia por la app descargada en móvil, y al hacer el registro para ingresar **por primera vez en modo web debes de escanear el código QR desde el teléfono.**

## Compras 🛒

### ¿Cómo registro mis compras?

En la sección de compras, podemos registrar las compras que realizamos a proveedores. Para ello, debemos ir a la sección de **compras** y dar click en el botón ➕ que se encuentra en la parte inferior derecha de la pantalla. Aquí nos aparecerá un formulario sencillo para registrar la compra, seleccionando al proveedor y los productos que compramos.

### Entonces los productos que agrego en mi inventario?

Al registrar productos en el inventario, es una manera rápida para hacerlo sin necesidad de agregarlos en el modulo de **compras**. Una vez un producto registrado en el modulo de [Inventario](#inventario), se podrá ver en el modulo de [Ventas](#ventas) y [Compras](#compras) para poder venderlo o comprarlo respectivamente.

## Usuarios y perfiles 👤

### ¿Cómo manejo los permisos de mi aplicación?

En este apartado, podemos crear usuarios a asignarle permisos de acceso a diferentes módulos de la aplicación. Mecodex cuenta con perfiles por defecto (Administrador y cajero), pero podemos agregar más perfiles si deseamos y personalizar sus **permisos**.

Para crear un nuevo usuario, necesitaremos del nombre de la persona a quien será asignado ese usuario. Seguidamente el **nombre de usuario** y su **contraseña**. Ya con esto, el usuario estará creado y podremos asignarle permisos de acceso a diferentes módulos de la aplicación según los permisos otorgados por el administrador.

### Mi trabajador no puede acceder a Mecodex web, ¿Cómo lo soluciono?

Si no puede acceder a Mecodex web, es posible que el usuario no tenga asignado ningún permiso de acceso. Para solucionar este problema, debemos ir a la sección de *usuarios y perfiles* -> **permisos ⚙** y asignarle al usuario el permiso de acceso a Mecodex web.

### Cada vez que cree un nuevo usuario, tengo que obligatoriamente darle otra vez permisos?

No, se puede crear perfiles en la sección de perfiles y tener ya perfiles creados con permisos predefinidos. Y ya después cuando se cree un nuevo usuario, se le puede asignar uno de los perfiles ya creados con antelación.

## Conversiones 🔄

### ¿Cómo registro mis conversiones?

Este modulo funciona para transformar un producto que es materia prima al producto final. Primero se debe de registrar una nueva **regla de conversión**. Aquí debemos de **ingresar el producto o productos que es la materia prima** y el **producto final al** cual se va a convertir. También debemos de ingresar la cantidad de productos que necesitamos para transformar en el producto final.

Por ejemplo:

- **Materia prima**: Cuero, Poliester, etc.
- **Producto final**: Camisa, Pantalón, etc.
- **Cantidad**: 100

Una vez hecho esto, ya tenemos la regla creada para convertir los productos. Se selecciona una regla y a partir de ella, podemos crear un nuevo producto final y este se registra en nuestro inventario.

## Impuestos 🧾

### ¿Cómo registro mis impuestos?

Aquí podemos registrar los impuestos que tengamos registrados para métodos de pago registrados, compras a proveedores o ventas de productos con impuestos (IVA por ejemplo) (Si los tenemos). Y al momento de realizar una venta o compra, podemos aplicarle el impuesto que deseemos.

Los impuestos pueden a aplicar para

- Productos
- Servicios
- Métodos de pago
- Ingresos

Al momento de realizar una venta, compra, ingreso, podemos aplicarle el impuesto que deseemos si aplican.