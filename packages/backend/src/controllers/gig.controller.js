import gigServiceDefault from "../services/GigService.js";

export class GigController {

    constructor({ gigService = gigServiceDefault } = {}) {
        this.gigService = gigService;
    }

    crear = async (req, res, next) => {
        try {
            const gig = await this.gigService.crearGig(req.body);
            res.status(201).json(gig);
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

}

export default new GigController();