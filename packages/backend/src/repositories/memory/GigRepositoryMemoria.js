import GigRepository from "../GigRepository.js";

class GigRepositoryMemoria extends GigRepository {

    constructor() {
        super();
        this.gigs = [];
    }

    guardar(gig) {
        this.gigs.push(gig);
    }

    buscarPorId(gigId) {
        if(!gigId) {
            throw new Error("El ID del gig no puede ser nulo o indefinido.");
        }

        const gig = this.gigs.find(g => g.id === gigId);
        if (!gig) {
            throw new Error(`No se encontró ningún gig con el ID: ${gigId}`);
        }
        return gig;
    }

    obtenerTodos() {
        return this.gigs;
    }

    buscarPorCategoria(categoria) {
        return this.gigs.filter(gig => gig.categoria === categoria);
    }

    buscarPorTexto(texto) {
        const textoNormalizado = texto.trim().toLowerCase();

        return this.gigs.filter(gig =>
            gig.nombre.toLowerCase().includes(textoNormalizado) ||
            gig.descripcion.toLowerCase().includes(textoNormalizado)
        );
    }

    buscarPorVendedor(usuario) {
        return this.gigs.filter(gig => gig.vendedor === usuario);
    }

    buscar(filtros = {}) {

        let gigs = [...this.gigs];

        if (filtros.texto) {
            const texto = filtros.texto.toLowerCase();

            gigs = gigs.filter(gig =>
                gig.nombre.toLowerCase().includes(texto) ||
                gig.descripcion.toLowerCase().includes(texto)
            );
        }

        if (filtros.categoriaId) {
            gigs = gigs.filter(
                gig => gig.categoria.id === filtros.categoriaId
            );
        }

        switch (filtros.ordenarPor) {

            case "precio":
                gigs.sort((a, b) =>
                    a.paquetes[0].precio - b.paquetes[0].precio
                );
                break;

            case "puntaje":
                gigs.sort((a, b) =>
                    b.obtenerPuntajePromedio() - a.obtenerPuntajePromedio()
                );
                break;

            case "fecha":
                gigs.sort((a, b) =>
                    b.fechaPublicacion - a.fechaPublicacion
                );
                break;
        }

        return gigs;
    }

    actualizar(gig) {
        const index = this.gigs.findIndex(g => g.id === gig.id);
        if (index !== -1) {
            this.gigs[index] = gig;
        }
    }

    obtenerPaquetes(gigId) {
        const gig = this.buscarPorId(gigId);
        return gig.paquetes;
    }

    obtenerPaquetePorId(gigId, paqueteId) {
        const gig = this.buscarPorId(gigId);
        const paquete = gig.paquetes.find(p => p.id === paqueteId);
        if (!paquete) {
            throw new Error(`No se encontró ningún paquete con el ID: ${paqueteId} para el gig con ID: ${gigId}`);
        }
        return paquete;
    }

}

export default GigRepositoryMemoria;
