import Categoria from "../models/Categoria.js";


const getAllCategorias = async (req, res) => {
  try {
    const allCategorias = await Categoria.findAll();

    res.status(200).json({
      status: 200,
      message: allCategorias.length === 0 ? 'No hay categorías en la base de datos' : 'Categorías obtenidas exitosamente',
      data: allCategorias,
      total: allCategorias.length
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener el listado de categorías",
      message: err.message
    });
  }
};

const getAllCategoriaActivos = async (req, res) => {
  try {
    const categoriasActivas = await Categoria.scope("activos").findAll();

    res.status(200).json({
      status: 200,
      message: categoriasActivas.length === 0 ? 'No hay categorías activas en la base de datos' : 'Categorías activas obtenidas exitosamente',
      data: categoriasActivas,
      total: categoriasActivas.length
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener el listado de categorías activas",
      message: err.message
    });
  }
}

const getCategoriaById = async (req, res) => {
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

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la categoría con el id: ${id}`
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Categoría obtenido exitosamente',
      data: categoria
    });

  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Error al obtener la categoría",
      message: err.message
    });
  }
}


const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, imagenUrl } = req.body;

    // Validación de campos requeridos
    if (!nombre || !descripcion || !imagenUrl) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripcion e imagenUrl son obligatorios'
      });
    }

    // Validación de tipos
    if (typeof nombre !== 'string' || typeof descripcion !== 'string' || typeof imagenUrl !== 'string') {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripcion e imagenUrl deben ser strings'
      });
    }

    const nuevaCategoria = await Categoria.create({ nombre, descripcion, imagenUrl });

    res.status(201).json({
      status: 201,
      message: 'Categoría creada exitosamente',
      data: nuevaCategoria
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
      error: "Error al crear la categoría",
      message: err.message
    });
  }
};

const updateCategoria = async (req, res) => {
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

    const { nombre, descripcion, imagenUrl } = req.body;

    if (!nombre || !descripcion || !imagenUrl) {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripcion e imagenUrl son obligatorios'
      });
    }

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la categoría con el id: ${id}`
      });
    }

    // Validación de tipos
    if (typeof nombre !== 'string' || typeof descripcion !== 'string' || typeof imagenUrl !== 'string') {
      return res.status(400).json({
        status: 400,
        title: 'Bad Request',
        message: 'Los campos nombre, descripcion e imagenUrl deben ser strings'
      });
    }

    const datosActualizacion = { nombre, descripcion, imagenUrl };

    await Categoria.update(datosActualizacion, { where: { id } });

    // Obtener la categoría actualizada para devolverla
    const categoriaActualizada = await Categoria.findByPk(id);

    res.status(200).json({
      status: 200,
      message: `Categoría actualizada correctamente`,
      data: categoriaActualizada
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
        message: 'Ya existe una categoría con estos datos',
        errors: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al actualizar la categoría",
      message: err.message
    });
  }
};

const deleteLogicoCategoria = async (req, res) => {
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

    const categoria = await Categoria.findByPk(id);

    if (categoria === null) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: 'No existe la categoría buscado'
      });
    }

    await Categoria.update(
      { activo: !categoria.activo },
      { where: { id } }
    );

    res.status(200).json({
      status: 200,
      message: `Estado de la categoría ${categoria.activo ? 'desactivado' : 'activado'} correctamente`
    });
  } catch (err) {
    res.status(500).json({
      error: "Error al intentar modificar el estado de la categoría",
      message: err.message
    });
  }
};

const deleteCategoria = async (req, res) => {
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

    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({
        status: 404,
        title: 'Not Found',
        message: `No existe la categoría con el id: ${id}`
      });
    }

    await Categoria.destroy({ where: { id } });

    res.status(200).json({
      status: 200,
      message: `Categoría eliminada correctamente`,
      data: categoria
    });

  } catch (err) {
    // Manejo de errores de integridad referencial
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        status: 409,
        title: 'Conflict',
        message: 'No se puede eliminar la categoría porque está siendo utilizada por otros registros'
      });
    }

    res.status(500).json({
      status: 500,
      error: "Error al eliminar la categoría",
      message: err.message
    });
  }
};

export { getAllCategorias, getAllCategoriaActivos, createCategoria, updateCategoria, deleteCategoria, deleteLogicoCategoria, getCategoriaById }


