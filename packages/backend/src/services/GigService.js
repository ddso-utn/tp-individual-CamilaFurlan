import Gig from "../domain/entities/Gig.js";
import Opinion from "../domain/entities/Opinion.js";
import Categoria from "../domain/entities/Categoria.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import GigRepository from "../repositories/GigRepository.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js";

class GigService{

    constructor(gigRepository, categoriaRepository) {
        this.gigRepository = gigRepository;
        this.categoriaRepository = categoriaRepository;
    }
    
    async crearGig(nuevoGig) {

        const gig = new Gig(
            nuevoGig.id,
            nuevoGig.nombre,
            nuevoGig.descripcion,
            nuevoGig.categoria,
            nuevoGig.vendedor,
            nuevoGig.fechaPublicacion
        );

        await this.gigRepository.guardar(gig);
        return gig;
    }

    async obtenerTodos() {
        return await this.gigRepository.obtenerTodos();
    }
    async buscarPorVendedor(vendedorId){
        const vendedor = await this.usuarioRepository.buscarPorId(vendedorId);
        return await this.gigRepository.buscarPorVendedor(vendedor);
    }

    async buscarPorId(gigId){
        return await this.gigRepository.buscarPorId(gigId);
    }
    
    async buscarPorTexto(texto){
        return await this.gigRepository.buscarPorTexto(texto);
    }

    async buscarPorCategoria(categoriaId){
        const categoria = await this.categoriaRepository.buscarPorId(categoriaId);
        return await this.gigRepository.buscarPorCategoria(categoria);
    }

    async obtenerPaquetes(gigId) {
        const gig = await this.gigRepository.buscarPorId(gigId);
        return gig.paquetes;
    }

    //ordenarPorPrecio(){}
    //ordenarPorPuntaje(){}

    //ordenarPorFecha(){}

    async agregarOpinion(gigId, nuevaOpinion) {

        const gig = await this.gigRepository.buscarPorId(gigId);
        gig.agregarOpinion(nuevaOpinion);

        await this.gigRepository.actualizar(gig);
        return nuevaOpinion;
    }

}

export default GigService;
