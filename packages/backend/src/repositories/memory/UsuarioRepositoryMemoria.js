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
        return this.usuarios.find(usuario => usuario.id === id);
    }

    obtenerTodos() {
        return this.usuarios;
    }

}