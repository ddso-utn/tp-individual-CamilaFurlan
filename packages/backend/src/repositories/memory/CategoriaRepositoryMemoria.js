import CategoriaRepository from "../CategoriaRepository.js";

class CategoriaRepositoryMemoria extends CategoriaRepository {

    constructor() {
        super();
        this.categorias = [];
    }

    guardar(categoria) {
        this.categorias.push(categoria);
    }

    obtenerPorId(categoriaId) {
        const categoria = this.categorias.find(
            categoria => categoria.id === categoriaId
        );

        if(!categoria){
            throw new Error(
                `No se encontró ninguna categoría con el ID: ${categoriaId}`
            );
        }

        return categoria;
    }

    obtenerTodos() {
        return this.categorias;
    }

    buscarPorNombre(nombre) {
        const nombreNormalizado = nombre.trim().toLowerCase();

        return this.categorias.find(
            categoria => categoria.nombre.trim().toLowerCase() === nombreNormalizado
        );
    }

}

export default CategoriaRepositoryMemoria;
