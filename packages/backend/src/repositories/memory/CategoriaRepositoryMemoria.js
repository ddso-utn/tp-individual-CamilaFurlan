class CategoriaRepositoryMemoria extends CategoriaRepository {

    constructor() {
        super();
        this.categorias = [];
    }

    guardar(categoria) {
        this.categorias.push(categoria);
    }

    obtenerPorId(id) {
        return this.categorias.find(categoria => categoria.id === id);
    }
    obtenerTodos() {
        return this.categorias;
    }

}