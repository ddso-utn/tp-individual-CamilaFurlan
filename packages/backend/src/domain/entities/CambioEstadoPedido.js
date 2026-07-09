export class CambioEstadoPedido {

    constructor(pedido, estadoPedido, usuario) {

        this.pedido = pedido;
        this.estadoPedido = estadoPedido;
        this.usuario = usuario;
        this.fecha = new Date();
    }

}