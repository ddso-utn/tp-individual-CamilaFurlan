class Categoria {
    constructor(categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }
    
    async crearCategoria(nuevaCategoria) {

        const categoria = new Categoria(
            nuevaCategoria.id,
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


}
export default Categoria;