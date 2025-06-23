# Backend E-commerce - Vital CrossFit

Este es el backend para un sistema de e-commerce diseñado para una tienda online de productos deportivos de crossfit.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize (ORM para MySQL)
- MySQL
- Bcrypt (para hashing de contraseñas)
- CORS
- Morgan (logging)
- Dotenv (variables de entorno)

## Estructura del proyecto

```
backEx/
├── src/
│   ├── config/
│   │   └── db/
│   │       └── connection.js
│   ├── controllers/
│   │   ├── carritoController.js
│   │   ├── categoriaController.js
│   │   ├── cuponesDesController.js
│   │   ├── itemCarritoController.js
│   │   ├── itemOrdenController.js
│   │   ├── ordenController.js
│   │   ├── productoController.js
│   │   └── usuarioController.js
│   ├── models/
│   │   ├── Carrito.js
│   │   ├── Categoria.js
│   │   ├── CuponDescuento.js
│   │   ├── index.js
│   │   ├── ItemCarrito.js
│   │   ├── ItemOrden.js
│   │   ├── Orden.js
│   │   ├── Producto.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── carritoRoutes.js
│   │   ├── categoriaRoutes.js
│   │   ├── cuponDescuentoRoutes.js
│   │   ├── itemCarritoRoutes.js
│   │   ├── itemOrdenRoutes.js
│   │   ├── ordenRoutes.js
│   │   ├── productoRoutes.js
│   │   └── usuarioRoutes.js
│   └── servicios/
│       └── pruebaGenerica.js
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

## Modelos de datos

El sistema cuenta con los siguientes modelos principales:

1. **Usuario**: Maneja los datos de los usuarios del sistema (clientes y administradores)
2. **Producto**: Contiene la información de los productos a la venta
3. **Categoría**: Clasificación de productos
4. **Carrito**: Carritos de compra de los usuarios
5. **ItemCarrito**: Productos dentro de un carrito
6. **Orden**: Pedidos realizados por los usuarios
7. **ItemOrden**: Productos dentro de una orden
8. **CuponDescuento**: Cupones de descuento para productos

## Características principales

- Autenticación y autorización de usuarios
- CRUD completo para todos los modelos
- Validación de datos en modelos y controladores
- Manejo de errores detallado
- Eliminación lógica (soft delete) para varios modelos
- Scopes de Sequelize para consultas comunes
- Hashing seguro de contraseñas con bcrypt
- Sistema de cupones de descuento con validación
- Relaciones complejas entre modelos

## Configuración

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Crear un archivo `.env` basado en `.env.example` con tus credenciales de MySQL
4. Configurar la base de datos MySQL
5. Ejecutar el servidor: `npm run dev` (modo desarrollo) o `npm start` (producción)

Variables de entorno requeridas:

```
DB_NAME=nombre_bd
DB_USER=usuario_bd
DB_PASSWORD=contraseña_bd
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
PORT=3000
API_RAIZ=/api/v1
```

## Endpoints disponibles

El API sigue la convención RESTful y tiene los siguientes grupos de endpoints:

- `/usuarios` - Gestión de usuarios
- `/productos` - Gestión de productos
- `/categorias` - Gestión de categorías
- `/carritos` - Gestión de carritos
- `/itemsCarrito` - Gestión de items en carritos
- `/ordenes` - Gestión de órdenes
- `/itemsOrden` - Gestión de items en órdenes
- `/cupones` - Gestión de cupones de descuento

Cada grupo tiene endpoints para CRUD básico y operaciones específicas.

## Ejemplos de uso

### Crear un usuario

```
POST /api/v1/usuarios
Body:
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "contrasena": "Password123",
  "rol": "cliente"
}
```

### Obtener productos activos

```
GET /api/v1/productos/activos
```

### Validar un cupón de descuento

```
GET /api/v1/cupones/validar/DESCUENTO20
```

## Consideraciones

- Las contraseñas se almacenan hasheadas con bcrypt
- Algunos endpoints tienen eliminación lógica (cambia estado activo) y otros eliminación física
- Se implementaron scopes para consultas comunes (ej: usuarios activos)
- Las relaciones entre modelos están bien definidas en `src/models/index.js`

## Licencia

MIT
