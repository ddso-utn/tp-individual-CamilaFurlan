import UsuarioRepository from "../UsuarioRepository.js";

class UsuarioRepositoryMemoria extends UsuarioRepository {

    constructor() {
        super();
        this.usuarios = [];
    }

    guardar(usuario) {
        this.usuarios.push(usuario);
    }

    buscarPorId(id) {
        const usuario = this.usuarios.find(usuario => usuario.id === id);
        if (!usuario) {
            throw new Error(`Usuario con id ${id} no encontrado.`);
        }
        return usuario;
    }

    obtenerTodos() {
        return this.usuarios;
    }

}