import Categoria  from "../domain/entities/Categoria.js";
import CategoriaRepositoryMemoria from "../repositories/memory/CategoriaRepositoryMemoria.js";
import { randomUUID } from "crypto";

export class CategoriaService {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    
    async crearCategoria(payload) {

        await this.#validarSiYaExisteCategoria(payload.nombre);
        const categoria = this.#crearEntidadCategoria(payload);
        await this.categoriaRepository.guardar(categoria);

        return categoria;
    }

    #crearEntidadCategoria(payload) {

        return new Categoria(
            randomUUID(),
            payload.nombre,
            payload.descripcion
        );
    }

    async obtenerCategoriaPorId(categoriaId) {
        return await this.categoriaRepository.obtenerPorId(categoriaId);
    }

    async obtenerTodasLasCategorias() {
        return await this.categoriaRepository.obtenerTodos();
    }

    async #validarSiYaExisteCategoria(nombre){
        const categoria = await this.categoriaRepository.buscarPorNombre(nombre);

        if(categoria){
            throw new Error ("Ya existe esta categoria");
        }
    }

}

const categoriaRepository = new CategoriaRepositoryMemoria();
const categoriaService = new CategoriaService(categoriaRepository);

export default categoriaService;
