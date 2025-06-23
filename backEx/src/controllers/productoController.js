import Producto from "../models/Producto.js";

const getAllProductos = async (req, res) => {
  try {
    const allProductos = await Producto.findAll();
    if (allProductos.length === 0) {
      res.status(200).json({ status: 200, message: 'No hay productos en la base de datos!!!' })
    } else {
      res.status(200).json(allProductos);
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el listado de productos", message: err.message });
  }
}

const getAllProductosActivos = async (req, res) => {
  try {
    const allProductosActivos = await Producto.scope("activos").findAll();
    if (allProductosActivos.length === 0) {
      res.status(200).json({ status: 200, message: 'No hay productos activos en la base de datos!!!' })
    } else {
      res.status(200).json(allProductosActivos);
    }
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el listado de Productos activos", message: err.message });
  }
}

const getProductosOfertasAndDescuentos = async (req, res) => {
  try {
    const productosOfertas = await Producto.scope("activos").findAll({
      where: {
        oferta: true
      }
    })

    res.status(200).json({
      status: 200,
      message: productosOfertas.length === 0 ? 'No hay productos con ofertas en la base de datos' : 'Productos con ofertas obtenidos exitosamente',
      data: productosOfertas,
      total: productosOfertas.length
    })

  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Producto", message: err.message });
  }
}


const getProductoById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const ProductoById = await Producto.findByPk(id);
    if (ProductoById === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: `No existe el Producto buscado con el id: ${id}` });
    }

    res.status(200).json({ status: 200, Producto: ProductoById });
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el Producto", message: err.message });
  }
}


const createProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      imagenUrl,
      especificaciones,
      idCategoria,
      calificacion,
      oferta,
      descuento
    } = req.body;

    // Validación básica de campos requeridos
    if (!nombre || !descripcion || !precio || !imagenUrl || !especificaciones || !idCategoria) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripción, precio, imagenUrl, especificaciones y idCategoría son obligatorios'
      });
    }

    const newProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagenUrl,
      especificaciones,
      idCategoria,
      calificacion,
      oferta,
      descuento
    });

    res.status(201).json({
      status: 201,
      message: 'Se creó de manera exitosa un nuevo producto',
      newProducto
    });
  } catch (err) {
    // Manejo específico de errores de validación de Sequelize
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 400,
        title: 'Validation Error',
        message: 'Error de validación',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({
      error: "Error al intentar crear un nuevo Producto",
      message: err.message
    });
  }
};
const updateProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const { nombre, descripcion, precio, imagenUrl, especificaciones, idCategoria, calificacion, oferta, descuento } = req.body;
    const productoAActualizar = await Producto.findByPk(id);

    if (productoAActualizar === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: `No existe el Producto buscado con el id: ${id}` });
    }

    // Crear objeto con solo los campos que se van a actualizar
    const camposAActualizar = {};
    if (nombre !== undefined) camposAActualizar.nombre = nombre;
    if (descripcion !== undefined) camposAActualizar.descripcion = descripcion;
    if (precio !== undefined) camposAActualizar.precio = precio;
    if (imagenUrl !== undefined) camposAActualizar.imagenUrl = imagenUrl;
    if (especificaciones !== undefined) camposAActualizar.especificaciones = especificaciones;
    if (idCategoria !== undefined) camposAActualizar.idCategoria = idCategoria;
    if (calificacion !== undefined) camposAActualizar.calificacion = calificacion;
    if (oferta !== undefined) camposAActualizar.oferta = oferta;
    if (descuento !== undefined) camposAActualizar.descuento = descuento;

    await Producto.update(camposAActualizar, {
      where: { id }
    });

    res.status(200).json({ status: 200, message: `Se actualizó correctamente el producto con el id: ${id}` });
  } catch (err) {
    // Manejo específico de errores de validación
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 400,
        title: 'Validation Error',
        message: 'Error de validación',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    res.status(500).json({ error: "Error al intentar actualizar el Producto", message: err.message });
  }
}

const deleteProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const productoAEliminar = await Producto.findByPk(id);
    if (productoAEliminar === null) {
      return res.status(404).json({ status: 404, title: 'Not Found', message: 'No existe el producto buscado' });
    }

    await Producto.destroy({
      where: { id }
    });

    res.status(200).json({ status: 200, message: `Se eliminó correctamente el producto con el id: ${id}`, ProductoEliminado: productoAEliminar });
  } catch (err) {
    res.status(500).json({ error: "Error al intentar eliminar Producto", message: err.message });
  }
}

const deleteLogicoProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido'
      });
    }

    const producto = await Producto.findByPk(id);

    if (producto === null) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: 'No existe el Producto buscado'
      });
    }

    await Producto.update(
      { activo: !producto.activo },
      { where: { id } }
    );

    res.status(200).json({
      status: 200,
      message: `Estado del Producto ${producto.activo ? 'desactivado' : 'activado'} correctamente`
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar modificar el estado del Producto",
      message: err.message
    });
  }
}

export { getAllProductos, getAllProductosActivos, getProductoById, createProducto, updateProducto, deleteProducto, deleteLogicoProducto, getProductosOfertasAndDescuentos }