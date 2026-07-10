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

    obtenerPuntajePromedio() {
        if (this.opiniones.length === 0) {
            return 0;
        }

        const total = this.opiniones.reduce(
            (acumulado, opinion) => acumulado + opinion.puntuacion,
            0
        );

        return total / this.opiniones.length;
    }

    actualizar(nombre, descripcion, categoria) {

        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;

    }

    reemplazarPaquetes(paquetes) {

        this.paquetes = paquetes;

    }

}

export default Gig;
