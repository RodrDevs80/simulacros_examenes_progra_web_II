import Orden from "../models/Orden.js";

const getAllOrdenes = async (req, res) => {
  try {
    const allOrdenes = await Orden.findAll();

    res.status(200).json({
      status: 200,
      message: allOrdenes.length === 0 ? 'No hay ordenes en la base de datos' : 'ordenes obtenidas exitosamente',
      data: allOrdenes,
      total: allOrdenes.length
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener el listado de ordenes",
      message: err.message
    });
  }
}

const getOrdenById = async (req, res) => {
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

    const orden = await Orden.findByPk(id);

    if (!orden) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la orden con el id: ${id}`
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Orden obtenida exitosamente',
      data: orden
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener la orden",
      message: err.message
    });
  }
}

const createOrden = async (req, res) => {
  try {
    const { idUsuario, estado, total, nombreEnvio, direccionEnvio, telefonoEnvio } = req.body;

    // Validación de campos requeridos
    if (!idUsuario || !estado || !total || !nombreEnvio || !direccionEnvio || !telefonoEnvio) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos idUsuario,estado,total,nombreEnvio,direccionEnvio y telefonoEnvio son obligatorios'
      });
    }

    const nuevaOrden = await Orden.create({ idUsuario, estado, total, nombreEnvio, direccionEnvio, telefonoEnvio });

    res.status(201).json({
      status: 201,
      message: 'Orden creada exitosamente',
      data: nuevaOrden
    });

  } catch (err) {
    // Manejo de errores de unicidad
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        status: 409,
        title: 'Conflict',
        message: 'Ya existe una orden con estos datos',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al crear orden",
      message: err.message
    });
  }
}

const updateOrden = async (req, res) => {
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

    const { idUsuario, estado, total, nombreEnvio, direccionEnvio, telefonoEnvio } = req.body;

    // Validación de campos requeridos
    if (!idUsuario || !estado || !total || !nombreEnvio || !direccionEnvio || !telefonoEnvio) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos idUsuario, estado, total, nombreEnvio, direccionEnvio y telefonoEnvio son obligatorios'
      });
    }

    const orden = await Orden.findByPk(id);
    if (!orden) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la orden con el id: ${id}`
      });
    }

    const datosActualizacion = { idUsuario, estado, total, nombreEnvio, direccionEnvio, telefonoEnvio };

    await Orden.update(datosActualizacion, { where: { id } });

    // Obtener la categoría actualizada para devolverla
    const ordenActualizado = await Orden.findByPk(id);

    res.status(200).json({
      status: 200,
      message: `Orden actualizado correctamente`,
      data: ordenActualizado
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
        message: 'Ya existe una orden con estos datos',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al actualizar la orden",
      message: err.message
    });
  }
}

const deleteOrden = async (req, res) => {
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

    const orden = await Orden.findByPk(id);
    if (!orden) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la orden con el id: ${id}`
      });
    }

    await Orden.destroy({ where: { id } });

    res.status(200).json({
      status: 200,
      message: `Orden eliminada correctamente`,
      data: orden
    });

  } catch (err) {
    // Manejo de errores de integridad referencial
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        status: 409,
        title: 'Conflict',
        message: 'No se puede eliminar la orden porque está siendo utilizada por otros registros'
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al eliminar la orden",
      message: err.message
    });
  }
}


export { getAllOrdenes, getOrdenById, createOrden, updateOrden, deleteOrden }