import Pedido from "../domain/entities/Pedido.js";
import Mensaje from "../domain/entities/Mensaje.js"
import Opinion from "../domain/entities/Opinion.js"
import CambioEstadoPedido from "../domain/entities/CambioEstadoPedido.js";
import { randomUUID } from "crypto";

export class PedidoService {
    constructor(pedidoRepository, cambioEstadoPedidoRepository, usuarioRepository, gigRepository, opinionRepository) {
        this.pedidoRepository = pedidoRepository;
        this.cambioEstadoPedidoRepository = cambioEstadoPedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.gigRepository = gigRepository;
        this.opinionRepository = opinionRepository;
    }

    async obtenerTodos() {
        return await this.pedidoRepository.obtenerTodos();
    }

    async crearPedido(payload) {

        const pedido = await this.#crearEntidadPedido(payload);
        await this.pedidoRepository.guardar(pedido);

        this.#registrarCambioEstadoPedido(pedido, pedido.cliente); 

        return pedido;
    }

    #crearEntidadPedido(payload) {

        const {
            clienteId,
            gigId,
            paqueteId,
            requerimientos
        } = payload;

        const cliente = this.#buscarUsuario(clienteId);
        const gig = this.#buscarGig(gigId);
        const paquete = this.#buscarPaquete(gig, paqueteId);

        const fechaEntrega = this.#calcularFechaEntrega(paquete);

        return new Pedido(
            randomUUID(),
            cliente,
            gig,
            paquete,
            paquete.precio,
            requerimientos,
            fechaEntrega
        );
    }

    async cancelarPedido(pedidoId, usuarioId) {
        const pedido =this.#buscarPedido(pedidoId);;
        const usuario = this.#buscarUsuario(usuarioId);

        pedido.cancelar();
        await this.pedidoRepository.actualizar(pedido);
        
        this.#registrarCambioEstadoPedido(pedido, usuario);

        return pedido;
    }
    
    async marcarEnProgreso(pedidoId, usuarioId) {
        const pedido =this.#buscarPedido(pedidoId);;
        const usuario =this.#buscarUsuario(usuarioId);

        pedido.esVendedor(usuario);
        pedido.confirmar();
        await this.pedidoRepository.actualizar(pedido);
        
        this.#registrarCambioEstadoPedido(pedido, usuario);

        return pedido;
    }

    async marcarEnRevision(pedidoId, usuarioId) {
        const pedido = this.#buscarPedido(pedidoId);
        const usuario = this.#buscarUsuario(usuarioId);

        pedido.esCliente(usuario);
        pedido.marcarEnRevision();
        await this.pedidoRepository.actualizar(pedido);

        this.#registrarCambioEstadoPedido(pedido, usuario);

        return pedido;
    }

    async entregarPedido(pedidoId, usuarioId) {
        const pedido =this.#buscarPedido(pedidoId);;
        const usuario =this.#buscarUsuario(usuarioId);

        pedido.esVendedor(usuario);
        pedido.entregar();
        await this.pedidoRepository.actualizar(pedido);
        
        this.#registrarCambioEstadoPedido(pedido, usuario);

        return pedido;
    }

    async enviarMensaje(pedidoId, payload) {

        const pedido =this.#buscarPedido(pedidoId);;
        const mensaje = this.#crearMensaje(payload);

        pedido.agregarMensaje(mensaje);
        await this.pedidoRepository.actualizar(pedido);

        return pedido;
    }

    #crearMensaje(payload) {

    const autor = this.#buscarUsuario(payload.usuarioId);

    return new Mensaje(
        randomUUID(),
        autor,
        payload.mensaje
    );
}
    async obtenerPedidosCliente(clienteId){
        const cliente = await this.#buscarUsuario(clienteId);
        return await this.pedidoRepository.buscarPorCliente(cliente);
    }

    async obtenerPedidosPorGig(gigId){
        const gig = await this.#buscarGig(gigId);
        return await this.pedidoRepository.buscarPorGig(gig);
    }

    async obtenerPedidosVendedor(vendedorId) {

        const vendedor = this.#buscarUsuario(vendedorId);
        return await this.pedidoRepository.buscarPorVendedor(vendedor);
    }

    async calificarPedido(pedidoId, payload) {

        const pedido = this.#buscarPedido(pedidoId);
        pedido.sePuedeCalificar();
        pedido.calificar();

        const opinion = this.#crearOpinion(pedido, payload);
        pedido.gig.agregarOpinion(opinion);
        await this.opinionRepository.guardar(opinion);
        await this.pedidoRepository.actualizar(pedido);
        await this.gigRepository.actualizar(pedido.gig);

        return opinion;
    }

    #crearOpinion(pedido, payload) {

        return new Opinion(
            pedido.cliente,
            pedido.gig,
            payload.detalle,
            payload.puntuacion
        );
    }

    #registrarCambioEstadoPedido(pedido, usuario) {
        const cambioEstadoPedido = new CambioEstadoPedido(pedido, pedido.estado, usuario);

        this.cambioEstadoPedidoRepository.guardar(cambioEstadoPedido);
    }

    #calcularFechaEntrega(paquete){
        return paquete.calcularFechaEntrega(new Date());
    }

    #buscarPedido(pedidoId){
        return this.pedidoRepository.buscarPorId(pedidoId);
    }
    
    #buscarUsuario(id){
        return this.usuarioRepository.buscarPorId(id);
    }

    #buscarGig(gigId){
        return  this.gigRepository.buscarPorId(gigId);
    }
    #buscarPaquete(gig, paqueteId) {
        return this.gigRepository.obtenerPaquetePorId(
            gig.id,
            paqueteId
        );
}
}

export default PedidoService;
