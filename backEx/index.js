import express from "express";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./src/models/index.js";
import usuarioRouter from "./src/routes/usuarioRoutes.js"
import categoriaRouter from "./src/routes/categoriaRoutes.js";
import productoRoutes from "./src/routes/productoRoutes.js";
import carritoRouter from "./src/routes/carritoRoutes.js";
import itemCarritoRouter from "./src/routes/itemCarritoRoutes.js";
import itemOrdenRouter from "./src/routes/itemOrdenRoutes.js";
import ordenRouter from "./src/routes/ordenRoutes.js";
import cuponDescuentoRouter from "./src/routes/cuponDescuentoRoutes.js";

const app = express();
const PORT = process.env.PORT;
const Raiz = process.env.API_RAIZ;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(Raiz, usuarioRouter);
app.use(Raiz, categoriaRouter);
app.use(Raiz, productoRoutes);
app.use(Raiz, carritoRouter);
app.use(Raiz, itemCarritoRouter);
app.use(Raiz, itemOrdenRouter);
app.use(Raiz, ordenRouter);
app.use(Raiz, cuponDescuentoRouter)

app.get('/', (req, res) => {
    res.send("¡API funcionando!🎉");
})

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "✅ Conexión a la base de datos establecida correctamente."
        );

        // Sincroniza los modelos con la base de datos.
        // force: false (default) - No borra tablas si existen.
        // force: true - Borra y recrea tablas. ¡PELIGROSO en producción!
        // alter: true - Intenta modificar tablas existentes.
        await sequelize.sync({ force: false }); // Cambia bajo tu propio riesgo
        console.log("🔄 Modelos sincronizados con la base de datos.");

        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
}



startServer();



