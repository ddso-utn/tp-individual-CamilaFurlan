class OpinionRepositoryMemoria extends OpinionRepository {

    constructor() {
        super();
        this.opiniones = [];
    }

    guardar(opinion) {
        this.opiniones.push(opinion);
    }
    buscarPorGig(gig){
        return this.opiniones.filter(opinion => opinion.gig === gig);
    }

}