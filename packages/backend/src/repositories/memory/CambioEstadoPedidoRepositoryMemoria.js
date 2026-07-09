class CambioEstadoPedidoRepositoryMemoria extends CambioEstadoPedidoRepository {

    constructor() {
        super();
        this.cambiosEstadoPedido = [];
    }

    guardar(cambioEstadoPedido) {
        this.cambiosEstadoPedido.push(cambioEstadoPedido);
    }

    obtenerPorPedido(pedidoId) {
        return this.cambiosEstadoPedido.filter(cambio => cambio.pedido.id === pedidoId);
    }

}

export default CambioEstadoPedidoRepositoryMemoria;