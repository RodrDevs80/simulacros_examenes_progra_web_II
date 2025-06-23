import { Router } from "express";
import { createCategoria, deleteCategoria, deleteLogicoCategoria, getAllCategoriaActivos, getAllCategorias, getCategoriaById, updateCategoria } from "../controllers/categoriaController.js";

const categoriaRouter = Router();

categoriaRouter.get("/categorias/all", getAllCategorias);

categoriaRouter.get("/categorias/activos", getAllCategoriaActivos);

categoriaRouter.get('/categorias/:id', getCategoriaById)

categoriaRouter.post("/categorias", createCategoria);

categoriaRouter.put('/categorias/:id', updateCategoria);

//Eliminación lógica
categoriaRouter.patch("/categorias/:id", deleteLogicoCategoria);

//Eliminación física
categoriaRouter.delete('/categorias/:id', deleteCategoria);

export default categoriaRouter;