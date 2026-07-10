import OpinionRepository from "../OpinionRepository.js";

class OpinionRepositoryMemoria extends OpinionRepository {

    constructor() {
        super();
        this.opiniones = [];
    }

    guardar(opinion) {
        this.opiniones.push(opinion);
    }
    buscarPorGig(gigId){
        return this.opiniones.filter(opinion => opinion.gig.id === gigId);
    }

}

export default OpinionRepositoryMemoria;
