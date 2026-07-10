import OpinionRepository from "../OpinionRepository.js";

class OpinionRepositoryMemoria extends OpinionRepository {

    constructor() {
        super();
        this.opiniones = [];
    }

    guardar(opinion) {
        console.log(opinion);
        this.opiniones.push(opinion);
    }
    buscarPorGig(gigId){
        return this.opiniones.filter(opinion => opinion.gigId === gigId);
    }

}

export default OpinionRepositoryMemoria;
