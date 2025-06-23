import ItemOrden from "../models/ItemOrden.js";

const getAllItemsOrden = async (req, res) => {
    try {
        const allItemsOrden = await ItemOrden.findAll();

        res.status(200).json({
            status: 200,
            message: allItemsOrden.length === 0 ? 'No hay itemsOrden en la base de datos' : 'itemsOrden obtenidas exitosamente',
            data: allItemsOrden,
            total: allItemsOrden.length
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Error al obtener el listado de itemsOrden",
            message: err.message
        });
    }
}

const getItemOrdenById = async (req, res) => {
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

        const itemOrden = await ItemOrden.findByPk(id);

        if (!itemOrden) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemOrden con el id: ${id}`
            });
        }

        res.status(200).json({
            status: 200,
            message: 'ItemOrden obtenido exitosamente',
            data: itemOrden
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Error al obtener el ItemOrden",
            message: err.message
        });
    }
}

const createItemOrden = async (req, res) => {
    try {
        const { idOrden, idProducto, cantidad, precioUnitario } = req.body;

        // Validación de campos requeridos
        if (!idOrden || !idProducto || !cantidad || !precioUnitario) {
            return res.status(400).json({
                status: 400,
                title: 'Bad Request',
                message: 'Los campos idOrden, idProducto, cantidad y precioUnitario son obligatorios'
            });
        }

        const nuevoItemOrden = await ItemOrden.create({ idOrden, idProducto, cantidad, precioUnitario });

        res.status(201).json({
            status: 201,
            message: 'ItemOrden creada exitosamente',
            data: nuevoItemOrden
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
            error: "Error al crear itemOrden",
            message: err.message
        });
    }
}

const updateItemOrden = async (req, res) => {
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

        const { idOrden, idProducto, cantidad, precioUnitario } = req.body;

        // Validación de campos requeridos
        if (!idOrden || !idProducto || !cantidad || !precioUnitario) {
            return res.status(400).json({
                status: 400,
                title: 'Bad Request',
                message: 'Los campos idOrden, idProducto, cantidad y precioUnitario son obligatorios'
            });
        }

        const itemOrden = await ItemOrden.findByPk(id);
        if (!itemOrden) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemOrden con el id: ${id}`
            });
        }

        const datosActualizacion = { idOrden, idProducto, cantidad, precioUnitario };

        await ItemOrden.update(datosActualizacion, { where: { id } });

        // Obtener la categoría actualizada para devolverla
        const itemOrdenActualizado = await ItemOrden.findByPk(id);

        res.status(200).json({
            status: 200,
            message: `ItemOrden actualizado correctamente`,
            data: itemOrdenActualizado
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
                message: 'Ya existe un itemOrden con estos datos',
                errors: err.errors.map(e => ({ field: e.path, message: e.message }))
            });
        }

        res.status(500).json({
            status: 500,
            error: "Error al actualizar el itemOrden",
            message: err.message
        });
    }
}

const deleteItemOrden = async (req, res) => {
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

        const itemOrden = await ItemOrden.findByPk(id);
        if (!itemOrden) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemCarrito con el id: ${id}`
            });
        }

        await ItemOrden.destroy({ where: { id } });

        res.status(200).json({
            status: 200,
            message: `ItemOrden eliminada correctamente`,
            data: itemOrden
        });

    } catch (err) {
        // Manejo de errores de integridad referencial
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                status: 409,
                title: 'Conflict',
                message: 'No se puede eliminar el itemOrden porque está siendo utilizada por otros registros'
            });
        }

        res.status(500).json({
            status: 500,
            error: "Error al eliminar el itemOrden",
            message: err.message
        });
    }
}




export { getAllItemsOrden, getItemOrdenById, createItemOrden, updateItemOrden, deleteItemOrden }