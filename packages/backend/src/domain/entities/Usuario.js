class Usuario {

    constructor(id, nombre, apellido) {

        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.favoritos = [];
    }

    agregarFavorito(gig){
        this.favoritos.push(gig);
    };
    quitarFavorito(gig){
        this.favoritos = this.favoritos.filter(fav => fav !== gig);
    };
}