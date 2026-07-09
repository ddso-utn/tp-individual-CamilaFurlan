class CategoriaRepositoryMemoria extends CategoriaRepository {

    constructor() {
        super();
        this.categorias = [];
    }

    guardar(categoria) {
        this.categorias.push(categoria);
    }

    obtenerPorId(categoriaId) {
        const categoria = this.categorias.find(categoria => categoria.id === id);

        if(!categoria){
            throw new Error (`No se encontró ningún gig con el ID: ${id}`);
        }

        return categoria
    }
    obtenerTodos() {
        return this.categorias;
    }
    buscarPorNombre(nombre) {
    const nombreNormalizado = nombre.trim().toLowerCase();

    return categoria = this.categorias.find(
        categoria => categoria.nombre.trim().toLowerCase() === nombreNormalizado);
    }

}

