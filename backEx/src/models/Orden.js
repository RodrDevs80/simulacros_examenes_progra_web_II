import { DataTypes } from "sequelize";
import sequelize from "../config/db/connection.js";


const Orden = sequelize.define("Orden", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        unique: true
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "usuarios", // Nombre de la TABLA
            key: "id",
        },
    },
    fechaOrden: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
        validate: {
            isDate: true,
        }
    },
    estado: {
        type: DataTypes.ENUM,
        values: ["pendiente", "confirmada", "enviada", "cancelada"],
        defaultValue: "pendiente",
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0],
                msg: 'El precio no puede ser negativo'
            },
            max: {
                args: [99999999.99],
                msg: 'El precio excede el límite máximo'
            }
        }
    },
    nombreEnvio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccionEnvio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    telefonoEnvio: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, { tableName: "ordenes", timestamps: false })

export default Orden;