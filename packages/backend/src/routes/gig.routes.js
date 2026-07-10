import { Router } from "express";
import gigController from "../controllers/gig.controller.js";

const router = Router();

router.post("/", gigController.crear);

router.get("/", gigController.obtenerTodos);

router.get("/busqueda", gigController.buscar);

router.get("/:gigId", gigController.obtenerPorId);

router.get("/vendedor/:vendedorId", gigController.buscarPorVendedor);

router.get("/:gigId/paquetes", gigController.obtenerPaquetes);

router.put("/:gigId", gigController.actualizar);

router.delete(":/gigId", gigController.eliminar);

export default router;