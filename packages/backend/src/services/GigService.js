import Gig from "../domain/entities/Gig.js";
import Paquete from "../domain/entities/Paquete.js";
import { randomUUID } from "crypto";

export class GigService {

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

    async buscar(filtros) {
        return await this.gigRepository.buscar(filtros);
    }

    async buscarPorTexto(texto) {
        return await this.gigRepository.buscarPorTexto(texto);
    }

    async buscarPorCategoria(categoriaId) {

        const categoria = this.#buscarCategoria(categoriaId);

        return await this.gigRepository.buscarPorCategoria(categoria);
    }

    async buscarPorVendedor(vendedorId) {

        const vendedor = this.#buscarUsuario(vendedorId);

        return await this.gigRepository.buscarPorVendedor(vendedor);
    }

    async buscarPorId(gigId) {
        return await this.gigRepository.buscarPorId(gigId);
    }

    async obtenerPaquetes(gigId) {

        const gig = this.#buscarGig(gigId);

        return gig.paquetes;
    }

    #buscarUsuario(usuarioId) {
        return this.usuarioRepository.buscarPorId(usuarioId);
    }

    #buscarCategoria(categoriaId) {
        return this.categoriaRepository.obtenerPorId(categoriaId);
    }

    #buscarGig(gigId) {
        return this.gigRepository.buscarPorId(gigId);
    }

    async actualizar(gigId, payload) {

        const gig = await this.#buscarGig(gigId);

        const categoria = await this.#buscarCategoria(
            payload.categoriaId
        );

        gig.actualizar(
            payload.nombre,
            payload.descripcion,
            categoria
        );

        const paquetes = payload.paquetes.map(paquete =>

            this.#crearPaquete(paquete)

        );

        gig.reemplazarPaquetes(paquetes);

        await this.gigRepository.actualizar(gig);

        return gig;

    }

    async eliminar(gigId) {

        const gig = await this.#buscarGig(gigId);

        await this.gigRepository.eliminar(gig.id);

    }

}
export default GigService;
