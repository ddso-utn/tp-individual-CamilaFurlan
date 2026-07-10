import { Router } from "express";
import usuarioController from "../controllers/UsuarioController.js";

const router = Router();

router.post("/", usuarioController.crear);

router.get("/:usuarioId", usuarioController.obtenerPorId);

router.get("/:usuarioId/favoritos", usuarioController.obtenerFavoritos);

router.post("/:usuarioId/favoritos/:gigId", usuarioController.agregarFavorito);

router.delete("/:usuarioId/favoritos/:gigId", usuarioController.quitarFavorito);

export default router;