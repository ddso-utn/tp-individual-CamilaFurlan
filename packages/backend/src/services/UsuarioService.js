import Usuario from "../domain/entities/Usuario.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import GigRepository from "../repositories/GigRepository.js";
import {randomUUID} from {crypto}


class UsuarioService {
    constructor(usuarioRepository, gigRepository) {
        this.usuarioRepository = usuarioRepository;
        this.gigRepository = gigRepository;
    }

    async crearUsuario(nuevoUsuario) {
        const usuario = new Usuario(
            randomUUID,
            nuevoUsuario.nombre,
            nuevoUsuario.apellido,
        );

        await this.usuarioRepository.guardar(usuario);
        return usuario;
    }
    async obtenerUsuarioPorId(usuarioId) {
        return await this.usuarioRepository.obtenerUsuarioPorId(usuarioId);
    }

    async agregarFavorito(gigId, usuarioId) {
        const usuario = await this.usuarioRepository.obtenerUsuarioPorId(usuarioId);
        const gig = await this.gigRepository.obtenerGigPorId(gigId);
        usuario.agregarFavorito(gig);
        await this.usuarioRepository.actualizar(usuario);

        return usuario.favoritos;
    }

    async quitarFavorito(gigId, usuarioId) {
        const usuario = await this.usuarioRepository.obtenerUsuarioPorId(usuarioId);
        const gig = await this.gigRepository.obtenerGigPorId(gigId);
        usuario.quitarFavorito(gig);
        await this.usuarioRepository.actualizar(usuario);

        return usuario.favoritos;
    }

    async obtenerFavoritos(usuarioId) {
        const usuario = await this.usuarioRepository.obtenerUsuarioPorId(usuarioId);
        return usuario.favoritos;
    }


}
export default UsuarioService;