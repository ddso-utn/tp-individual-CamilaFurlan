class Gig {

    constructor(
        id,
        nombre,
        descripcion,
        categoria,
        vendedor,
        fechaPublicacion
    ) {

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.paquetes = [];
        this.multimedia = [];
        this.vendedor = vendedor;
        this.fechaPublicacion = fechaPublicacion;

    }

    agregarPaquete(paquete) {
        this.paquetes.push(paquete);
    }

    agregarMultimedia(multimedia) {
        this.multimedia.push(multimedia);
    }

}