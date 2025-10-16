export class Videojuego{
    constructor(id, titulo, descripcion, plataforma){
        this.id = id,
        this.titulo = titulo, 
        this.descripcion = descripcion
        this.plataforma = plataforma
    }
    mostrarDatos(){
        console.log('Juego ', this.titulo, ', con el id: ', this.id, 
            ', se trata de ', this.descripcion, this.plataforma);
    }
}