class GigRepositoryMemoria extends GigRepository {

    constructor() {
        super();
        this.gigs = [];
    }

    guardar(gig) {
        this.gigs.push(gig);
    }

    buscarPorId(id) {
        return this.gigs.find(gig => gig.id === id);
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

}