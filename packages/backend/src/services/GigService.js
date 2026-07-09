import Gig from "../domain/entities/Gig.js";
import Opinion from "../domain/entities/Opinion.js";
import Categoria from "../domain/entities/Categoria.js";
import Paquete from "../domain/entities/Paquete.js"
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import GigRepository from "../repositories/GigRepository.js";
import CategoriaRepository from "../repositories/CategoriaRepository.js";
import { randomUUID } from "crypto";

class GigService{

    constructor(gigRepository, categoriaRepository, usuarioRepository) {
        this.gigRepository = gigRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
    }
    
    async crearGig(payload) {

        const gig = this.#crearEntidadGig(payload);
        await this.gigRepository.guardar(gig);

        return gig;
    }

    #crearEntidadGig(payload) {

        const {
            vendedorId,
            categoriaId,
            nombre,
            descripcion,
            paquetes
        } = payload;

        const vendedor = this.#buscarUsuario(vendedorId);
        const categoria = this.#buscarCategoria(categoriaId);

        const gig = new Gig(
            randomUUID(),
            nombre,
            descripcion,
            categoria,
            vendedor
        );

        paquetes.forEach(paqueteDTO => {
            gig.agregarPaquete(
                this.#crearPaquete(paqueteDTO)
            );
        });

        return gig;
    }
    #crearPaquete(payload) {

        return new Paquete(
            randomUUID(),
            payload.nombre,
            payload.descripcion,
            payload.precio,
            payload.diasEntrega
        );
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

}

export default GigService;
