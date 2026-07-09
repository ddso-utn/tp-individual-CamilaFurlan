import { Categoria } from "../domain/entities/Categoria";
import CategoriaRepository from "../repositories/CategoriaRepository";
import { randomUUID } from "crypto";

class Categoria {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    
    async crearCategoria(nombre, descripcion) {

        #validarSiYaExisteCategoria(nombre);

        const categoria = new Categoria(
            randomUUID,
            nuevaCategoria.nombre,
            nuevaCategoria.descripcion
        );

        await this.categoriaRepository.guardar(categoria);
        return categoria;
    }

    async obtenerCategoriaPorId(categoriaId) {
        return await this.categoriaRepository.obtenerPorId(categoriaId);
    }

    async obtenerTodasLasCategorias() {
        return await this.categoriaRepository.obtenerTodos();
    }

    #validarSiYaExisteCategoria(nombre){
        const categoria = await this.categoriaRepository.buscarPorNombre(nombre);

        if(categoria){
            throw new Error ("Ya existe esta categoria");
        }
    }

}
export default Categoria;