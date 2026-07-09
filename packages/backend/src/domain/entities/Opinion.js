export class Opinion {

    constructor(cliente, gig, detalle, puntuacion) {
        this.cliente = cliente;
        this.gig = gig;
        this.detalle = detalle;
        this.puntuacion = puntuacion;
        this.fecha = new Date();

    }

}