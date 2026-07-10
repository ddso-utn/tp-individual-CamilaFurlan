import { Router } from "express";
import categoriaController from "../controllers/CategoriaController.js";

const router = Router();

router.post("/", categoriaController.crear);

router.get("/", categoriaController.obtenerTodas);

router.get("/:categoriaId", categoriaController.obtenerPorId);

export default router;