import { Router } from "express";

import usuarioRoutes from "./usuario.routes.js";
import categoriaRoutes from "./categoria.routes.js";
import gigRoutes from "./gig.routes.js";
import pedidoRoutes from "./pedido.routes.js";

const router = Router();

router.use("/usuarios", usuarioRoutes);
router.use("/categorias", categoriaRoutes);
router.use("/gigs", gigRoutes);
router.use("/pedidos", pedidoRoutes);

export default router;