import { Router } from "express";
import { getAllCarritos, getCarritoById, deleteCarrito, createCarrito, updateCarrito } from "../controllers/carritoController.js";
import { getAllRecordsService } from "../servicios/pruebaGenerica.js";

import Carrito from "../models/Carrito.js";
//para prueba
const getAllCarritosSer = getAllRecordsService(Carrito, "Carritos");

const carritoRouter = Router();

carritoRouter.get("/carritos", getAllCarritosSer);

carritoRouter.get('/carritos/:id', getCarritoById);

carritoRouter.post("/carritos", createCarrito);

carritoRouter.put('/carritos/:id', updateCarrito);

//Eliminación física
carritoRouter.delete('/carritos/:id', deleteCarrito);

export default carritoRouter;