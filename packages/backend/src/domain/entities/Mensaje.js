export class Mensaje {

    constructor(id, autor, mensaje) {

        this.id = id;
        this.autor = autor;
        this.mensaje = mensaje;
        this.fecha = new Date();

    }

}