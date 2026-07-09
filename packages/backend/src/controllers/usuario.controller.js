import usuarioServiceDefault from "../services/UsuarioService.js";

export class UsuarioController {

    constructor({ usuarioService = usuarioServiceDefault } = {}) {
        this.usuarioService = usuarioService;
    }

    crear = async (req, res, next) => {
        try {
            const usuario = await this.usuarioService.crearUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    obtenerPorId = async (req, res, next) => {
        try {
            const usuario = await this.usuarioService.obtenerUsuarioPorId(
                req.params.usuarioId
            );

            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    };

    agregarFavorito = async (req, res, next) => {
        try {
            const favoritos = await this.usuarioService.agregarFavorito(
                req.params.gigId,
                req.params.usuarioId
            );

            res.status(200).json(favoritos);
        } catch (error) {
            next(error);
        }
    };

    quitarFavorito = async (req, res, next) => {
        try {
            const favoritos = await this.usuarioService.quitarFavorito(
                req.params.gigId,
                req.params.usuarioId
            );

            res.status(200).json(favoritos);
        } catch (error) {
            next(error);
        }
    };

    obtenerFavoritos = async (req, res, next) => {
        try {
            const favoritos = await this.usuarioService.obtenerFavoritos(
                req.params.usuarioId
            );

            res.status(200).json(favoritos);
        } catch (error) {
            next(error);
        }
    };

}

export default new UsuarioController();