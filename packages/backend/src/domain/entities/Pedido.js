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
        this.estado = EstadoPedido.PENDIENTE;
        this.requerimientos = requerimientos;
        this.fechaCreacion = new Date();
        this.fechaEntrega = fechaEntrega;
        this.mensajes = [];
        this.estaCalificado = false;

    }


    cancelar(){

        if(this.estado === EstadoPedido.ENTREGADO || this.estado === EstadoPedido.CANCELADO){
            throw new Error("No se puede cancelar un pedido que ya ha sido entregado o cancelado.");
        }
        this.estado = EstadoPedido.CANCELADO;
    };

    marcarEnProgreso(){
        if(this.estado !== EstadoPedido.PENDIENTE){
            throw new Error("Solo se puede marcar EN PROGRESO un pedido que esté en estado PENDIENTE.");
        }
        this.estado = EstadoPedido.EN_PROGRESO;
    };

    entregar(){

        if(this.estado !== EstadoPedido.EN_PROGRESO){
            throw new Error("Solo se puede entregar un pedido que esté en estado EN PROGRESO.");
        }
        this.estado = EstadoPedido.ENTREGADO;
    };

    agregarMensaje(mensaje){
        this.mensajes.push(mensaje);
    };

    calificar(){
        this.estaCalificado = true;
    }

}