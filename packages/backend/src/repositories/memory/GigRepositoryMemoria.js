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
        return this.gigs.filter(gig => gig.nombre.includes(texto) || gig.descripcion.includes(texto));
    }

    buscarPorVendedor(usuario) {
        return this.gigs.filter(gig => gig.vendedor === usuario);
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

    obtenerSiguienteId() {
        return this.gigs.length + 1;
    }

}