import { Router } from "express";
import pedidoController from "../controllers/pedido.controller.js";

const router = Router();

router.post("/", pedidoController.crear);
router.get("/", pedidoController.obtenerTodos);

router.patch("/:pedidoId/cancelacion", pedidoController.cancelar);

router.patch("/:pedidoId/confirmacion", pedidoController.marcarEnProgreso);

router.patch("/:pedidoId/revision", pedidoController.marcarEnRevision);

router.patch("/:pedidoId/entrega", pedidoController.entregar);

router.post("/:pedidoId/mensajes", pedidoController.enviarMensaje);

router.post("/:pedidoId/calificacion", pedidoController.calificar);

router.get("/cliente/:clienteId", pedidoController.obtenerPedidosCliente);

router.get("/gig/:gigId", pedidoController.obtenerPedidosPorGig);

router.get("/vendedor/:vendedorId", pedidoController.obtenerPedidosVendedor);

export default router;
