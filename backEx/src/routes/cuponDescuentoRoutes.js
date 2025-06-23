import { Router } from "express";
import CuponDescuento from "../models/CuponDescuento.js";
import { createCupon, deleteFisicoCupon, deleteLogicoCupon, getAllCuponesActivos, getCuponById, updateCupon, validarCupon } from "../controllers/cuponesDesController.js";

const cuponDescuentoRouter = Router();

//Traer todos los cupones activos
cuponDescuentoRouter.get("/cupones/activos", getAllCuponesActivos);

cuponDescuentoRouter.get('/cupones/:id', getCuponById);

cuponDescuentoRouter.post("/cupones", createCupon);

cuponDescuentoRouter.put('/cupones/:id', updateCupon);

//Eliminación física
cuponDescuentoRouter.delete('/cupones/:id', deleteFisicoCupon);

//Eliminación Lógica
cuponDescuentoRouter.patch("/cupones/:id", deleteLogicoCupon)

//Validar cupón por código
cuponDescuentoRouter.get("/cupones/validar/:codigoCupon", validarCupon);


export default cuponDescuentoRouter;