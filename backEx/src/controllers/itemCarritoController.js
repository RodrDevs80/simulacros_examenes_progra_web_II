import ItemCarrito from "../models/ItemCarrito.js";

const getAllItemsCarrito = async (req, res) => {
    try {
        const allItemsCarrito = await ItemCarrito.findAll();

        res.status(200).json({
            status: 200,
            message: allItemsCarrito.length === 0 ? 'No hay itemsCarrito en la base de datos' : 'itemsCarrito obtenidas exitosamente',
            data: allItemsCarrito,
            total: allItemsCarrito.length
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Error al obtener el listado de itemsCarrito",
            message: err.message
        });
    }
}

const getItemCarritoById = async (req, res) => {
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

        const itemCarrito = await ItemCarrito.findByPk(id);

        if (!itemCarrito) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemCarrito con el id: ${id}`
            });
        }

        res.status(200).json({
            status: 200,
            message: 'ItemCarrito obtenido exitosamente',
            data: itemCarrito
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            error: "Error al obtener el ItemCarrito",
            message: err.message
        });
    }
}


const createItemCarrito = async (req, res) => {
    try {
        const { idCarrito, idProducto, cantidad, precioUnitario } = req.body;

        // Validación de campos requeridos
        if (!idCarrito || !idProducto || !cantidad || !precioUnitario) {
            return res.status(400).json({
                status: 400,
                title: 'Bad Request',
                message: 'Los campos idCarrito, idProducto, total, cantidad y precioUnitario son obligatorios'
            });
        }

        const nuevoItemCarrito = await ItemCarrito.create({ idCarrito, idProducto, cantidad, precioUnitario });

        res.status(201).json({
            status: 201,
            message: 'ItemCarrito creada exitosamente',
            data: nuevoItemCarrito
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
            error: "Error al crear itemCarrito",
            message: err.message
        });
    }
}

const updateItemCarrito = async (req, res) => {
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

        const { idCarrito, idProducto, cantidad, precioUnitario } = req.body;

        // Validación de campos requeridos
        if (!idCarrito || !idProducto || !cantidad || !precioUnitario) {
            return res.status(400).json({
                status: 400,
                title: 'Bad Request',
                message: 'Los campos idCarrito, idProducto, total, cantidad y precioUnitario son obligatorios'
            });
        }

        const itemCarrito = await ItemCarrito.findByPk(id);
        if (!itemCarrito) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemCarrito con el id: ${id}`
            });
        }

        const datosActualizacion = { idCarrito, idProducto, cantidad, precioUnitario };

        await ItemCarrito.update(datosActualizacion, { where: { id } });

        // Obtener la categoría actualizada para devolverla
        const itemCarritoActualizado = await ItemCarrito.findByPk(id);

        res.status(200).json({
            status: 200,
            message: `ItemCarrito actualizado correctamente`,
            data: itemCarritoActualizado
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
                message: 'Ya existe un itemCarrito con estos datos',
                errors: err.errors.map(e => ({ field: e.path, message: e.message }))
            });
        }

        res.status(500).json({
            status: 500,
            error: "Error al actualizar el itemCarrito",
            message: err.message
        });
    }
}

const deleteItemCarrito = async (req, res) => {
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

        const itemCarrito = await ItemCarrito.findByPk(id);
        if (!itemCarrito) {
            return res.status(404).json({
                status: 404,
                title: 'Not Found',
                message: `No existe el itemCarrito con el id: ${id}`
            });
        }

        await ItemCarrito.destroy({ where: { id } });

        res.status(200).json({
            status: 200,
            message: `ItemCarrito eliminada correctamente`,
            data: itemCarrito
        });

    } catch (err) {
        // Manejo de errores de integridad referencial
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(409).json({
                status: 409,
                title: 'Conflict',
                message: 'No se puede eliminar el itemCarrito porque está siendo utilizada por otros registros'
            });
        }

        res.status(500).json({
            status: 500,
            error: "Error al eliminar el itemCarrito",
            message: err.message
        });
    }
}


export { getAllItemsCarrito, getItemCarritoById, createItemCarrito, updateItemCarrito, deleteItemCarrito }