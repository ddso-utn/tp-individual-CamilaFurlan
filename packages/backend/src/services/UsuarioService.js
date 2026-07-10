import Usuario from "../domain/entities/Usuario.js";
import { randomUUID } from "crypto";


export class UsuarioService {
    constructor(usuarioRepository, gigRepository) {
        this.usuarioRepository = usuarioRepository;
        this.gigRepository = gigRepository;
    }

    async obtenerTodos() {
        return await this.usuarioRepository.obtenerTodos();
    }

    async crearUsuario(payload) {

        const usuario = this.#crearEntidadUsuario(payload);
        await this.usuarioRepository.guardar(usuario);

        return usuario;
    }
    #crearEntidadUsuario(payload) {

        return new Usuario(
            randomUUID(),
            payload.nombre,
            payload.apellido
        );
    }


    async obtenerUsuarioPorId(usuarioId) {
        return await this.usuarioRepository.buscarPorId(usuarioId);
    }

    async agregarFavorito(gigId, usuarioId) {

        const usuario = await this.#buscarUsuario(usuarioId);
        const gig = await this.#buscarGig(gigId);

        usuario.agregarFavorito(gig);

        await this.usuarioRepository.actualizar(usuario);

        return usuario.favoritos;
    }

    async quitarFavorito(gigId, usuarioId) {
        const usuario = await this.#buscarUsuario(usuarioId);
        const gig = await this.#buscarGig(gigId);

        usuario.quitarFavorito(gig);

        await this.usuarioRepository.actualizar(usuario);

        return usuario.favoritos;
    }

    async obtenerFavoritos(usuarioId) {
        const usuario = await this.#buscarUsuario(usuarioId);
        return usuario.favoritos;
    }

    #buscarGig(gigId) {
        return this.gigRepository.buscarPorId(gigId);
    }
    #buscarUsuario(usuarioId) {
        return this.usuarioRepository.buscarPorId(usuarioId);
    }

}
export default UsuarioService;
