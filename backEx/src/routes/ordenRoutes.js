import { Router } from "express";
import { getAllOrdenes, getOrdenById, createOrden, updateOrden, deleteOrden } from "../controllers/ordenController.js";


const ordenRouter = Router();

ordenRouter.get("/ordenes", getAllOrdenes);

ordenRouter.get('/ordenes/:id', getOrdenById);

ordenRouter.post("/ordenes", createOrden);

ordenRouter.put('/ordenes/:id', updateOrden);

//Eliminación física
ordenRouter.delete('/ordenes/:id', deleteOrden);

export default ordenRouter;