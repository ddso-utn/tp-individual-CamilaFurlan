import Pedido from "../domain/entities/Pedido.js";
import { EstadoPedido } from "../domain/enums/EstadoPedido.js"; 

import CambioEstadoPedido from "../domain/entities/CambioEstadoPedido.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import PedidoRepository from "../repositories/PedidoRepository.js";
import GigRepository from "../repositories/GigRepository.js";

class PedidoService {
    constructor(pedidoRepository, cambioEstadoPedidoRepository, usuarioRepository, gigRepository) {
        this.pedidoRepository = pedidoRepository;
        this.cambioEstadoPedidoRepository = cambioEstadoPedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.gigRepository = gigRepository;
    }

    async crearPedido(clienteId, gigId, paqueteId, requerimientos) {

        const cliente = await this.usuarioRepository.buscarPorId(clienteId);
        const gig = await this.gigRepository.buscarPorId(gigId);
        const paquete = await this.gigRepository.obtenerPaquetePorId(gigId, paqueteId);
        const id = await this.pedidoRepository.generarId();
        const fechaEntrega = await paquete.calcularFechaEntrega(new Date());

        const pedido = new Pedido(
            id,
            cliente,
            gig,
            paquete,
            paquete.precio,
            requerimientos,
            fechaEntrega
        );

        await this.pedidoRepository.guardar(pedido);

        this.#registrarCambioEstadoPedido(pedido, cliente);

        return pedido;
    }

    async cancelarPedido(pedidoId, usuarioId) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

        pedido.cancelar();
        await this.pedidoRepository.actualizar(pedido);
        
        registrarCambioEstadoPedido(pedido, usuario);
    }
    
    async marcarEnProgreso(pedidoId, usuarioId) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

        pedido.esVendedor(usuario);
        pedido.marcarEnProgreso();
        await this.pedidoRepository.actualizar(pedido);
        
        registrarCambioEstadoPedido(pedido, usuario);
    }

    async entregarPedido(pedidoId, usuarioId) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

        pedido.esVendedor(usuario);
        pedido.entregar();
        await this.pedidoRepository.actualizar(pedido);
        
        registrarCambioEstadoPedido(pedido, usuario);
    }

    async enviarMensaje(pedidoId, usuarioId, mensaje){
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

        const nuevoMensaje = new Mensaje(null, usuario, mensaje);
        pedido.agregarMensaje(nuevoMensaje);
        await this.pedidoRepository.actualizar(pedido);
    }

    async obtenerPedidosCliente(clienteId){
        const cliente = await this.usuarioRepository.buscarPorId(clienteId);
        return await this.pedidoRepository.buscarPorCliente(clienteId);
    }

    async obtenerPedidosPorGig(gigId){
        const gig = await this.gigRepository.buscarPorId(gigId);
        return await this.pedidoRepository.buscarPorGig(gigId);
    }

    async calificarPedido(pedidoId, usuarioId, puntuacion, detalle) {

        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);

        pedido.esCliente(usuario);
        pedido.sePuedeCalificar();

        const opinion = new Opinion(
            null,
            usuario,
            pedido.gig,
            detalle,
            puntuacion
        );
        await this.OpinionRepository.guardar(opinion);
        
        pedido.calificar();
        await this.pedidoRepository.actualizar(pedido);
        return opinion;
    }

    #registrarCambioEstadoPedido(pedido, usuario) {
        const cambioEstadoPedido = new CambioEstadoPedido(pedido, pedido.estado, usuario);
        this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);
    }
}
