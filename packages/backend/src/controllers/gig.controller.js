import { gigService } from "../container.js";

export class GigController {

    constructor({ gigService: gigServiceArg = gigService } = {}) {
        this.gigService = gigServiceArg;
    }

    crear = async (req, res, next) => {
        try {
            const gig = await this.gigService.crearGig(req.body);
            res.status(201).json(gig);
        } catch (error) {
            next(error);
        }
    };

    buscar = async (req, res, next) => {
        try {
            const filtros = this.#extraerFiltros(req.query);

            const gigs = await this.gigService.buscar(filtros);

            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };


    obtenerTodos = async (req, res, next) => {
        try {
            const gigs = await this.gigService.obtenerTodos();
            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };

    obtenerPorId = async (req, res, next) => {
        try {
            const gig = await this.gigService.buscarPorId(
                req.params.gigId
            );

            res.status(200).json(gig);
        } catch (error) {
            next(error);
        }
    };

    buscarPorTexto = async (req, res, next) => {
        try {
            const gigs = await this.gigService.buscarPorTexto(
                req.query.texto
            );

            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };

    buscarPorCategoria = async (req, res, next) => {
        try {
            const gigs = await this.gigService.buscarPorCategoria(
                req.params.categoriaId
            );

            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };

    buscarPorVendedor = async (req, res, next) => {
        try {
            const gigs = await this.gigService.buscarPorVendedor(
                req.params.vendedorId
            );

            res.status(200).json(gigs);
        } catch (error) {
            next(error);
        }
    };

    obtenerPaquetes = async (req, res, next) => {
        try {
            const paquetes = await this.gigService.obtenerPaquetes(
                req.params.gigId
            );

            res.status(200).json(paquetes);
        } catch (error) {
            next(error);
        }
    };

    #extraerFiltros(query = {}) {

        const filtros = {};

        if (query.texto !== undefined && query.texto.trim() !== "") {
            filtros.texto = query.texto.trim();
        }

        if (query.categoriaId !== undefined && query.categoriaId !== "") {
            filtros.categoriaId = query.categoriaId;
        }

        if (query.ordenarPor !== undefined && query.ordenarPor !== "") {

            const ordenesValidos = [
                "precio",
                "puntaje",
                "fecha"
            ];

            if (!ordenesValidos.includes(query.ordenarPor)) {
                throw new Error("Criterio de orden inválido.");
            }

            filtros.ordenarPor = query.ordenarPor;
        }

        return filtros;
    }

}

export default new GigController();
