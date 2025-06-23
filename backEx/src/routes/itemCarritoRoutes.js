import { Router } from "express";
import { createItemCarrito, deleteItemCarrito, getAllItemsCarrito, getItemCarritoById, updateItemCarrito } from "../controllers/itemCarritoController.js";


const itemCarritoRouter = Router();

itemCarritoRouter.get("/itemsCarrito", getAllItemsCarrito);

itemCarritoRouter.get('/itemsCarrito/:id', getItemCarritoById);

itemCarritoRouter.post("/itemsCarrito", createItemCarrito);

itemCarritoRouter.put('/itemsCarrito/:id', updateItemCarrito);

//Eliminación física
itemCarritoRouter.delete('/itemsCarrito/:id', deleteItemCarrito);




export default itemCarritoRouter;