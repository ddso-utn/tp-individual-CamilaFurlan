import categoriaServiceDefault from "../services/CategoriaService.js";

export class CategoriaController {

    constructor({ categoriaService = categoriaServiceDefault } = {}) {
        this.categoriaService = categoriaService;
    }

    crear = async (req, res, next) => {
        try {
            const categoria = await this.categoriaService.crearCategoria(req.body);
            res.status(201).json(categoria);
        } catch (error) {
            next(error);
        }
    };

    obtenerPorId = async (req, res, next) => {
        try {
            const categoria = await this.categoriaService.obtenerCategoriaPorId(
                req.params.categoriaId
            );

            res.status(200).json(categoria);
        } catch (error) {
            next(error);
        }
    };

    obtenerTodas = async (req, res, next) => {
        try {
            const categorias = await this.categoriaService.obtenerTodasLasCategorias();
            res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    };

}

export default new CategoriaController();