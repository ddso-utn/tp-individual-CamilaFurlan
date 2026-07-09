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

        const cambioEstadoPedido = new CambioEstadoPedido(pedido, pedido.estado, cliente);
        this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);

        return nuevoPedido;
    }

    async cancelarPedido(pedidoId, usuarioId) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);
        pedido.cancelar();
        await this.pedidoRepository.actualizar(pedido);
        
        new CambioEstadoPedido(pedido, pedido.estado, usuario);
        await this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);
    }
    
    async marcarEnProgreso(pedidoId, usuarioId) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        const usuario = await this.usuarioRepository.buscarPorId(usuarioId);
        pedido.marcarEnProgreso();
        await this.pedidoRepository.actualizar(pedido);
        
        new CambioEstadoPedido(pedido, EstadoPedido.EN_PROGRESO, usuario);
        await this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);
    }

    async entregarPedido(pedidoId, usuario) {
        const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
        pedido.entregar();
        await this.pedidoRepository.actualizar(pedido);
        
        new CambioEstadoPedido(pedido, EstadoPedido.ENTREGADO, usuario);
        await this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);
    }

    //enviarMensaje(){}

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

        if(pedido.estaCalificado()){
            throw new Error("El pedido ya ha sido calificado.");
        }

        const opinion = new Opinion(
            null,
            usuario,
            pedido.gig,
            detalle,
            puntuacion
        );
        
        pedido.calificar();
        await this.pedidoRepository.actualizar(pedido);
        await this.OpinionRepository.guardar(opinion);
        return opinion;
    }

}
