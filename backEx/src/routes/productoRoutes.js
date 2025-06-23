import { Router } from "express";
import { createProducto, deleteLogicoProducto, deleteProducto, getAllProductos, getAllProductosActivos, getProductoById, getProductosOfertasAndDescuentos, updateProducto } from "../controllers/productoController.js";


const productoRoutes = Router();

productoRoutes.get("/productos/all", getAllProductos);

productoRoutes.get("/productos/activos", getAllProductosActivos);

productoRoutes.get("/productos/activos/ofertas", getProductosOfertasAndDescuentos)

productoRoutes.get('/productos/:id', getProductoById);

productoRoutes.post("/productos", createProducto);

productoRoutes.put('/productos/:id', updateProducto);

//Eliminación física
productoRoutes.delete('/productos/:id', deleteProducto);

// Eliminación lógica
productoRoutes.patch("/productos/:id", deleteLogicoProducto);

export default productoRoutes;



