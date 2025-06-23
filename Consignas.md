# Exámenes Simulacro - Desarrollo Web 2

Profesor: Pablo Aronna

---

## Examen Simulacro 1 - Desarrollo Web 2 (Categorías)

**Fecha: 9 Jun 2025**

Utilizándo tu proyecto en desarrollo, realizar las siguientes modificaciones en el back y front.

**Descripción del requerimiento:**
Se requiere agregar categorías en el backend (si ya tenes este modelo, revisar que cumpla con los atributos solicitador, sino crear el modelo).

### Backend

**1. Modelo de Datos:**

- Definir un modelo Sequelize llamado `Categoria` (para la tabla) con los siguientes campos:
  - **id:** Autoincremental, Llave Primaria (gestionado por Sequelize).
  - **nombre:** Tipo String, no nulo.
  - **imagenUrl:** Tipo Text (URL de una imagen), no nulo.
  - **activa:** Tipo Boolean, no nulo, con un valor por defecto (ej. true).

**2. Rutas y Controladores:**

- Implementar una ruta `GET /api/categorias` (o la ruta que coincida con las que venis utilizando). Esta ruta, a través de su controlador, deberá:

  - Consultar la base de datos utilizando Sequelize.
  - Devolver en formato JSON un listado de **todas las categorías que tengan el campo `activa` en true**.

- Implementar una ruta `GET /api/categoria/:id` (o similar, pero que conténgales el parámetro `:id`). Esta ruta, a través de su controlador, deberá:
  - Recibir un `id` como parámetro en la URL.
  - Consultar la base de datos utilizando Sequelize.
  - Devolver en formato JSON la información completa de la categoría que coincida con el `id` proporcionado. Si no se encuentra, devolver un estado apropiado (ej. 404).

### Frontend

**Agregar a tus rutas existentes:**

**1. Componente de Listado de Categorías (`/categorias`):**

- Crear un componente React que se renderice cuando el usuario navegue a la ruta `/categorias`.
- Al montarse el componente, utilizar axios para realizar una petición GET al endpoint del backend que devuelve todas las categorías activas.
- Mostrar el listado de categorías recibidas. Cada categoría debe visualizarse como una "card" o un elemento distintivo que muestre:
  - El nombre de la categoría.
  - La imagen de la categoría (utilizando `imagenUrl`).
- Al hacer clic sobre una "card" de categoría, la aplicación debe navegar (utilizando react-router-dom) a la ruta `/categoria/:id`, donde `:id` es el identificador de la categoría seleccionada.

**2. Componente de Detalle de Categoría (`/categoria/:id`):**

- Crear un componente React que se renderice cuando el usuario navegue a la ruta `/categoria/:id`.
- Este componente debe obtener el `id` de la categoría desde los parámetros de la ruta (utilizando react-router-dom).
- Al iniciar el componente, utilizar axios para realizar una petición GET al endpoint del backend que devuelve la información de una categoría específica por su id.
- Mostrar en esta vista, como mínimo, el nombre de la categoría como un título principal (ej. `<h1>Nombre de la Categoría</h1>`).

**Consideraciones Adicionales:**

- Se valorará la claridad del código y el cumplimiento de los requisitos.
- No es necesario implementar funcionalidades de creación, actualización o eliminación (CRUD completo), solo las especificadas (GET).
- No es necesario implementar estilos complejos, en caso necesario utilizar tailwindcss; la funcionalidad es prioritaria.

---

## Examen Simulacro 2 - Desarrollo Web 2 (Ofertas y Descuentos)

**Fecha: 14 Jun 2025**

Utilizándo tu proyecto en desarrollo, realizar las siguientes modificaciones en el back y front.

**Descripción del requerimiento:**
Se requiere modificar la entidad "Producto" existente en el backend para incluir información sobre ofertas y descuentos. Posteriormente, el frontend deberá reflejar estos cambios en la visualización de los productos.

### Backend

**1. Modelo de Datos:**

Se asume que ya cuentas con un modelo Producto (o similar). Deberás modificarlo para agregar los siguientes campos:

- **oferta:**
  - Tipo: Boolean
  - No nulo (allowNull: false).
  - Valor por defecto: false.
- **descuento:**
  - Tipo: Integer (representará un porcentaje, ej: 10 para 10%).
  - No nulo (allowNull: false).
  - Valor por defecto: 0.
  - Validación (opcional, pero recomendada): debe ser un valor entre 0 y 100.

**2. Rutas y Controladores:**

- Modificar las rutas existentes que devuelven información de productos para que incluyan los nuevos campos `oferta` y `descuento`.

### Frontend

**Agregar/Modificar en tus vistas existentes:**

**1. Componente de Listado de Productos (ej. `/productos` o página de inicio):**

Se asume que ya tienes un componente React que muestra un listado de productos, usualmente como "cards".

- **Modificar la visualización de cada "card" de producto:**
  - **Indicador de Oferta:**
    - Si el campo `producto.oferta` es `true`, la card del producto deberá mostrar un indicador visual distintivo. Puede ser un pequeño ícono (ej. una estrella, un tag de "Oferta!"), un texto destacado, o un borde de color diferente.
  - **Visualización de Precio con Descuento:**
    - Si el campo `producto.descuento` es mayor que 0 (y `producto.oferta` es `true`, opcionalmente, aunque el descuento solo tiene sentido si hay oferta):
      - Mostrar el precio original del producto tachado.
      - Calcular y mostrar el nuevo precio con el descuento aplicado.

---

## Examen Simulacro 3 - Desarrollo Web 2 (Cupones)

**Fecha: 14 Jun 2025**

Utilizándo tu proyecto en desarrollo, realizar las siguientes modificaciones en el back y front.

**Descripción del requerimiento:**
Se requiere implementar un sistema de cupones de descuento. Los usuarios podrán ingresar un código de cupón en el frontend. Si el cupón es válido y está activo, se aplicará un descuento general a todos los precios de los productos mostrados. Este descuento de cupón prevalecerá sobre cualquier descuento individual que un producto pueda tener.

### Backend

**1. Nuevo Modelo de Datos:**

Definir un nuevo modelo llamado `CuponDescuento` (o `CuponesDescuento`) con los siguientes campos:

- **id:** Autoincremental, Llave Primaria (gestionado por Sequelize).
- **nombreCupon:**
  - Tipo: STRING
  - No nulo (allowNull: false).
  - Descripción: Un nombre descriptivo para el cupón (ej. "Descuento Bienvenida", "Oferta Verano").
- **codigoCupon:**
  - Tipo: STRING
  - No nulo (allowNull: false).
  - Único (unique: true).
  - Descripción: El código que el usuario ingresará (ej. "BIENVENIDO10", "VERANO2024").
- **porcentajeDescuento:**
  - Tipo: INTEGER
  - No nulo (allowNull: false).
  - Descripción: El porcentaje de descuento a aplicar (ej. 10 para 10%, 25 para 25%).
  - Validación (recomendada): debe ser un valor entre 0 y 100.
- **activo:**
  - Tipo: BOOLEAN
  - No nulo (allowNull: false).
  - Valor por defecto: true.
  - Descripción: Indica si el cupón puede ser utilizado.

**2. Rutas y Controladores:**

- Implementar los endpoints CRUD completos para el modelo `CuponDescuento`. La ruta base podría ser `/api/cupones` (o la que coincida con tu nomenclatura).
- Adicionalmente, implementar un endpoint específico para validar un cupón por su código: `GET /api/cupones/validar/:codigoCupon` (o similar, ej. `POST /api/cupones/validar` recibiendo el código en el body).

### Frontend

**Modificar/Agregar funcionalidades en tus vistas existentes:**

**1. Componente de Entrada de Cupón:**

Crear o integrar en una vista existente (ej. cerca del listado de productos) un área para que el usuario ingrese un código de cupón. Esta área debe contener:

- Un campo de texto (`<input type="text">`) para que el usuario escriba el `codigoCupon`.
- Un botón ("Aplicar Cupón" o similar).
- Un espacio para mostrar mensajes al usuario (ej. "Cupón aplicado: [nombreCupon] ([porcentajeDescuento]%)", "Código de cupón inválido o inactivo.").

**2. Lógica de Aplicación de Cupón:**

- **Estado Global (Recomendado):** Considera usar el Contexto de React para almacenar la información del cupón activo. Esto facilitará el acceso al descuento del cupón desde diferentes componentes (listado de productos, detalle de producto, etc.).
- **Al hacer clic en "Aplicar Cupón":**
  1.  Obtener el valor del campo de texto del cupón.
  2.  Realizar una petición GET (usando axios) al endpoint del backend `/api/cupones/validar/:codigoCupon` (reemplazando `:codigoCupon` con el valor ingresado).
  3.  **Manejo de la respuesta:**
      - **Si el cupón es válido y activo:**
        - Almacenar la información del cupón (al menos `porcentajeDescuento` y `nombreCupon`) en el estado global.
        - Mostrar un mensaje de éxito al usuario (ej. `Cupón "${respuesta.nombreCupon}" (${respuesta.porcentajeDescuento}%) aplicado con éxito.`).
      - **Si el cupón no es válido, no existe, o no está activo:**
        - Asegurarse de que no haya ningún cupón activo en el estado global (establecerlo a `null`).
        - Mostrar un mensaje de error/informativo al usuario (ej. "El código de cupón ingresado no es válido o ha expirado.").
- **Opcional:** Añadir un botón "Quitar Cupón" si ya hay uno aplicado, que limpie el cupón del estado global y actualice los precios.

**3. Visualización de Precios con Descuento de Cupón:**

En el Componente de Listado de Productos (ej. ProductCard) y en el Componente de Detalle de Producto:

1.  Acceder al `porcentajeDescuento` del cupón activo desde el estado global.
2.  **Si hay un cupón activo con `porcentajeDescuento > 0`:**
    - Calcular el precio final del producto aplicando el descuento del cupón sobre el precio original del producto.
      - `precioConDescuentoCupon = producto.precioOriginal - (producto.precioOriginal * cupon.porcentajeDescuento / 100)`
      - (Asume que tienes `producto.precioOriginal` o `producto.precio` como base).
    - Mostrar el precio original del producto tachado.
    - Mostrar el `precioConDescuentoCupon` de forma prominente.
    - **Importante:** Según el requerimiento, "Si un producto tiene un descuento [propio], este no se tendrá en cuenta, solo se aplica el descuento del cupón." Esto significa que el descuento del cupón reemplaza cualquier otro descuento que el producto pudiera tener (como el campo `oferta` y `descuento` del simulacro anterior).
3.  **Si NO hay un cupón activo (o su descuento es 0):**
    - Mostrar el precio del producto aplicando la lógica de descuento propia del producto (si la tuviera, basada en `producto.oferta` y `producto.descuento` del simulacro anterior).
    - Si no tiene descuento propio, mostrar el precio normal.
