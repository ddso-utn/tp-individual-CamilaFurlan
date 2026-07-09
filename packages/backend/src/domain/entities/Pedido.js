import { EstadoPedido } from "../enums/EstadoPedido.js";

class Pedido {

    constructor(
        id,
        cliente,
        gig,
        paquete,
        total,
        requerimientos,
        fechaEntrega
    ) {

        this.id = id;
        this.cliente = cliente;
        this.gig = gig;
        this.paquete = paquete;
        this.total = total;
        this.estado = EstadoPedido.CONFIRMADO;
        this.requerimientos = requerimientos;
        this.fechaCreacion = new Date();
        this.fechaEntrega = fechaEntrega;
        this.mensajes = [];

    }


    cancelar(){
        this.estado = EstadoPedido.CANCELADO;
    };

    marcarEnProgreso(){
        this.estado = EstadoPedido.EN_PROGRESO;
    };

    entregar(){
        this.estado = EstadoPedido.ENTREGADO;
    };

    agregarMensaje(){
        this.mensajes.push(mensaje);
    };
}