class PedidoRepositoryMemoria extends PedidoRepository {

    constructor() {
        super();
        this.pedidos = [];
    }

    guardar(pedido) {
        this.pedidos.push(pedido);
    }
    buscarPorId(id) {
        const pedido = this.pedidos.find(pedido => pedido.id === id);
        if (!pedido) {
            throw new Error(`Pedido con id ${id} no encontrado`);
        }
        return pedido;
    }
    buscarPorCliente(cliente) {
        const pedidosCliente = this.pedidos.filter(pedido => pedido.cliente === cliente);
        if (pedidosCliente.length === 0) {
            throw new Error(`No se encontraron pedidos para el cliente con id ${cliente.id}`);
        }
        return pedidosCliente;
    }
    buscarPorGig(gig) {
        const pedidosGig = this.pedidos.filter(pedido => pedido.gig === gig);
        if (pedidosGig.length === 0) {
            throw new Error(`No se encontraron pedidos para el gig con id ${gig.id}`);
        }
        return pedidosGig;
    }
    buscarPorVendedor(vendedor) {
        const pedidosVendedor = this.pedidos.filter(pedido => pedido.gig.vendedor === vendedor);
        if (pedidosVendedor.length === 0) {
            throw new Error(`No se encontraron pedidos para el vendedor con id ${vendedor.id}`);
        }
        return pedidosVendedor;
    }
    actualizar(pedido) {
        const index = this.pedidos.findIndex(p => p.id === pedido.id);
        if (index !== -1) {
            this.pedidos[index] = pedido;
        }
    }
}