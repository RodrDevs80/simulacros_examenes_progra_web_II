import { Router } from "express";
import { createUsuario, deleteLogicoUsuario, deleteUsuario, getAllUsuario, getAllUsuariosActivos, getAllUsuariosAdministradores, getUsuarioById, updateUsuario } from "../controllers/usuarioController.js";

const usuarioRouter = Router();

usuarioRouter.get("/usuarios/all", getAllUsuario);

usuarioRouter.get("/usuarios/activos", getAllUsuariosActivos);

usuarioRouter.get("/usuarios/administradores", getAllUsuariosAdministradores);

usuarioRouter.get('/usuarios/:id', getUsuarioById);

usuarioRouter.post("/usuarios", createUsuario);

usuarioRouter.put('/usuarios/:id', updateUsuario);

//Eliminación física
usuarioRouter.delete('/usuarios/:id', deleteUsuario);

// Eliminación lógica
usuarioRouter.patch("/usuarios/:id", deleteLogicoUsuario);

export default usuarioRouter;