class Gig {

    constructor(
        id,
        nombre,
        descripcion,
        categoria,
        vendedor,
    ) {

        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.paquetes = [];
        this.multimedia = [];
        this.vendedor = vendedor;
        this.fechaPublicacion = new Date();
        this.opiniones = [];

    }

    agregarPaquete(paquete) {
        this.paquetes.push(paquete);
    }

    agregarMultimedia(multimedia) {
        this.multimedia.push(multimedia);
    }

    agregarOpinion(opinion) {
        this.opiniones.push(opinion);
    }

}