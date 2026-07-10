class Opinion {

    constructor(id, cliente, gigId, detalle, puntuacion) {
        this.id =id;
        this.cliente = cliente;
        this.gigId = gigId;
        this.detalle = detalle;
        this.puntuacion = puntuacion;
        this.fecha = new Date();

    }

}
export default Opinion;