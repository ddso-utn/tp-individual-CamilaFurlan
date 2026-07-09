export class Paquete {

    constructor(id, nombre, descripcion, precio, diasEntrega) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.diasEntrega = diasEntrega;
    }

    calcularFechaEntrega(fechaActual) {
        const fechaEntrega = new Date(fechaActual);
        fechaEntrega.setDate(fechaEntrega.getDate() + this.diasEntrega);
        return fechaEntrega;
    }

}