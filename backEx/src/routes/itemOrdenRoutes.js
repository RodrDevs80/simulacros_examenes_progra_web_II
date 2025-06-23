import { Router } from "express";
import { getAllItemsOrden, getItemOrdenById, createItemOrden, updateItemOrden, deleteItemOrden } from "../controllers/itemOrdenController.js";


const itemOrdenRouter = Router();

itemOrdenRouter.get("/itemsOrden", getAllItemsOrden);

itemOrdenRouter.get('/itemsOrden/:id', getItemOrdenById);

itemOrdenRouter.post("/itemsOrden", createItemOrden);


itemOrdenRouter.put('/itemsOrden/:id', updateItemOrden);

//Eliminación física
itemOrdenRouter.delete('/itemsOrden/:id', deleteItemOrden);


export default itemOrdenRouter;