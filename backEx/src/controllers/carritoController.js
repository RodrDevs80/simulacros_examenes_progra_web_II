import Carrito from "../models/Carrito.js";

const getAllCarritos = async (req, res) => {
  try {
    const allCarritos = await Carrito.findAll();

    res.status(200).json({
      status: 200,
      message: allCarritos.length === 0 ? 'No hay carritos en la base de datos' : 'carritos obtenidas exitosamente',
      data: allCarritos,
      total: allCarritos.length
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener el listado de carritos",
      message: err.message
    });
  }
}

const getCarritoById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido. Debe ser un número entero positivo'
      });
    }

    const carrito = await Carrito.findByPk(id);

    if (!carrito) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe el carrito con el id: ${id}`
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Carrito obtenido exitosamente',
      data: carrito
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener la carrito",
      message: err.message
    });
  }
}

const createCarrito = async (req, res) => {
  try {
    const { idUsuario } = req.body;

    // Validación de campos requeridos
    if (!idUsuario) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'El campos idUsuario es obligatorio'
      });
    }

    const nuevoCarrito = await Carrito.create({ idUsuario });

    res.status(201).json({
      status: 201,
      message: 'Carrito creada exitosamente',
      data: nuevoCarrito
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
      status: 500,
      error: "Error al crear carrito",
      message: err.message
    });
  }
}

const updateCarrito = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido. Debe ser un número entero positivo'
      });
    }

    const { idUsuario } = req.body;

    if (!idUsuario) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'El campo es idUsuario obligatorio'
      });
    }

    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe el carrito con el id: ${id}`
      });
    }

    const datosActualizacion = { idUsuario };

    await Carrito.update(datosActualizacion, { where: { id } });

    // Obtener la categoría actualizada para devolverla
    const carritoActualizado = await Carrito.findByPk(id);

    res.status(200).json({
      status: 200,
      message: `Carrito actualizado correctamente`,
      data: carritoActualizado
    });

  } catch (err) {
    // Manejo específico de errores
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        status: 400,
        title: 'Validation Error',
        message: 'Error de validación',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 409,
        title: 'Conflict',
        message: 'Ya existe un carrito con estos datos',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al actualizar la carrito",
      message: err.message
    });
  }
}

const deleteCarrito = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validación del ID
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'ID inválido. Debe ser un número entero positivo'
      });
    }

    const carrito = await Carrito.findByPk(id);
    if (!carrito) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe el carrito con el id: ${id}`
      });
    }

    await Carrito.destroy({ where: { id } });

    res.status(200).json({
      status: 200,
      message: `Carrito eliminada correctamente`,
      data: carrito
    });

  } catch (err) {
    // Manejo de errores de integridad referencial
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        status: 409,
        title: 'Conflict',
        message: 'No se puede eliminar el carrito porque está siendo utilizada por otros registros'
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al eliminar el carrito",
      message: err.message
    });
  }
}

export { getAllCarritos, getCarritoById, createCarrito, updateCarrito, deleteCarrito };