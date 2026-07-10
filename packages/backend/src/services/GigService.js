import Gig from "../domain/entities/Gig.js";
import Paquete from "../domain/entities/Paquete.js";
import { randomUUID } from "crypto";

export class GigService {

    constructor(gigRepository, categoriaRepository, usuarioRepository, opinionRepository) {
        this.gigRepository = gigRepository;
        this.categoriaRepository = categoriaRepository;
        this.usuarioRepository = usuarioRepository;
        this.opinionRepository = opinionRepository; 
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
        const gigs = await this.gigRepository.obtenerTodos();

        const respuesta = [];

        for (const gig of gigs) {
            respuesta.push(await this.#mapearGig(gig));
        }

        return respuesta;
    }

    async buscar(filtros) {
        const gigs = await this.gigRepository.buscar(filtros);
        
        const respuesta = [];

        for (const gig of gigs) {
            respuesta.push(await this.#mapearGig(gig));
        }

        return respuesta;
        }

    async #mapearGig(gig) {

        const opiniones = await this.opinionRepository.buscarPorGig(gig.id);

        const promedio = opiniones.length > 0 ? opiniones.reduce(
            (total, opinion) => total + opinion.puntuacion, 0) / opiniones.length : 0;
        return {
            ...gig,
            puntuacionPromedio: promedio,
            cantidadOpiniones: opiniones.length
        };

    }

    async buscarPorTexto(texto) {
        const gigs = await this.gigRepository.buscarPorTexto(texto);
        const respuesta = [];

        for (const gig of gigs) {
            respuesta.push(await this.#mapearGig(gig));
        }

        return respuesta;
    }

    async buscarPorCategoria(categoriaId) {

        const categoria = this.#buscarCategoria(categoriaId);
        const gigs =  await this.gigRepository.buscarPorCategoria(categoria);

        const respuesta = [];

        for (const gig of gigs) {
            respuesta.push(await this.#mapearGig(gig));
        }

        return respuesta;
    }


    async buscarPorVendedor(vendedorId) {

        const vendedor = this.#buscarUsuario(vendedorId);

        const gigs= await this.gigRepository.buscarPorVendedor(vendedor);
        const respuesta = [];

        for (const gig of gigs) {
            respuesta.push(await this.#mapearGig(gig));
        }

        return respuesta;
    }

    async buscarPorId(gigId) {

        const gig = await this.gigRepository.buscarPorId(gigId);

        const opiniones = await this.opinionRepository.buscarPorGig(gig.id);

        const promedio =
            opiniones.length > 0
                ? opiniones.reduce(
                    (t, o) => t + o.puntuacion,
                    0
                ) / opiniones.length
                : 0;

        return {

            ...gig,

            puntuacionPromedio: promedio,

            cantidadOpiniones: opiniones.length

        };

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
