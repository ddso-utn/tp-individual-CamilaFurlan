import PedidoRepository from "../PedidoRepository.js";

class PedidoRepositoryMemoria extends PedidoRepository {

    constructor() {
        super();
        this.pedidos = [];
    }

    guardar(pedido) {
        this.pedidos.push(pedido);
    }

    obtenerTodos() {
        return this.pedidos;
    }

    buscarPorId(id) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        if (!pedido) {
            throw new Error(`Pedido con id ${id} no encontrado`);
        }
        return pedido;
    }
    buscarPorCliente(cliente) {
        return this.pedidos.filter(pedido => pedido.cliente === cliente);
    }
    buscarPorGig(gig) {
        return this.pedidos.filter(pedido => pedido.gig === gig);
    }
    buscarPorVendedor(vendedor) {
        return this.pedidos.filter(pedido => pedido.gig.vendedor === vendedor);
    }
    actualizar(pedido) {
        const index = this.pedidos.findIndex(p => p.id === pedido.id);
        if (index !== -1) {
            this.pedidos[index] = pedido;
        }
    }
}

export default PedidoRepositoryMemoria;
