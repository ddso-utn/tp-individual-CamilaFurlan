import CategoriaRepositoryMemoria from "./repositories/memory/CategoriaRepositoryMemoria.js";
import GigRepositoryMemoria from "./repositories/memory/GigRepositoryMemoria.js";
import UsuarioRepositoryMemoria from "./repositories/memory/UsuarioRepositoryMemoria.js";
import PedidoRepositoryMemoria from "./repositories/memory/PedidoRepositoryMemoria.js";
import OpinionRepositoryMemoria from "./repositories/memory/OpinionRepositoryMemoria.js";
import CambioEstadoPedidoRepositoryMemoria from "./repositories/memory/CambioEstadoPedidoRepositoryMemoria.js";

import { CategoriaService } from "./services/CategoriaService.js";
import { GigService } from "./services/GigService.js";
import { UsuarioService } from "./services/UsuarioService.js";
import { PedidoService } from "./services/PedidoService.js";

const categoriaRepository = new CategoriaRepositoryMemoria();
const gigRepository = new GigRepositoryMemoria();
const usuarioRepository = new UsuarioRepositoryMemoria();
const pedidoRepository = new PedidoRepositoryMemoria();
const opinionRepository = new OpinionRepositoryMemoria();
const cambioEstadoPedidoRepository = new CambioEstadoPedidoRepositoryMemoria();

const categoriaService = new CategoriaService(categoriaRepository);
const gigService = new GigService(
    gigRepository,
    categoriaRepository,
    usuarioRepository
);
const usuarioService = new UsuarioService(
    usuarioRepository,
    gigRepository
);
const pedidoService = new PedidoService(
    pedidoRepository,
    cambioEstadoPedidoRepository,
    usuarioRepository,
    gigRepository,
    opinionRepository
);

export {
    categoriaRepository,
    gigRepository,
    usuarioRepository,
    pedidoRepository,
    opinionRepository,
    cambioEstadoPedidoRepository,
    categoriaService,
    gigService,
    usuarioService,
    pedidoService
};
