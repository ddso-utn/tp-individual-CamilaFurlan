import pedidoServiceDefault from "../services/PedidoService.js";

export class PedidoController {

    constructor({ pedidoService = pedidoServiceDefault } = {}) {
        this.pedidoService = pedidoService;
    }

    crear = async (req, res, next) => {
        try {
            const pedido = await this.pedidoService.crearPedido(req.body);
            res.status(201).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    cancelar = async (req, res, next) => {
        try {
            const pedido = await this.pedidoService.cancelarPedido(
                req.params.pedidoId,
                req.body.usuarioId
            );

            res.status(200).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    marcarEnProgreso = async (req, res, next) => {
        try {
            const pedido = await this.pedidoService.marcarEnProgreso(
                req.params.pedidoId,
                req.body.usuarioId
            );

            res.status(200).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    entregar = async (req, res, next) => {
        try {
            const pedido = await this.pedidoService.entregarPedido(
                req.params.pedidoId,
                req.body.usuarioId
            );

            res.status(200).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    enviarMensaje = async (req, res, next) => {
        try {
            const pedido = await this.pedidoService.enviarMensaje(
                req.params.pedidoId,
                req.body
            );

            res.status(201).json(pedido);
        } catch (error) {
            next(error);
        }
    };

    calificar = async (req, res, next) => {
        try {
            const opinion = await this.pedidoService.calificarPedido(
                req.params.pedidoId,
                req.body
            );

            res.status(201).json(opinion);
        } catch (error) {
            next(error);
        }
    };

    obtenerPedidosCliente = async (req, res, next) => {
        try {
            const pedidos = await this.pedidoService.obtenerPedidosCliente(
                req.params.clienteId
            );

            res.status(200).json(pedidos);
        } catch (error) {
            next(error);
        }
    };

    obtenerPedidosPorGig = async (req, res, next) => {
        try {
            const pedidos = await this.pedidoService.obtenerPedidosPorGig(
                req.params.gigId
            );

            res.status(200).json(pedidos);
        } catch (error) {
            next(error);
        }
    };

}

export default new PedidoController();