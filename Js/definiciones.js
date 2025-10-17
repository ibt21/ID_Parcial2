/**
 * Clase que representa un Videojuego
 */
export class Videojuego {
    /**
     * Constructor de la clase Videojuego
     * @param {number} id - Identificador único del videojuego
     * @param {string} titulo - Título del videojuego
     * @param {string} descripcion - Descripción del videojuego
     * @param {string} plataforma - Plataforma(s) donde está disponible
     */
    constructor(id, titulo, descripcion, plataforma = '') {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.plataforma = plataforma;
    }

    /**
     * Muestra los datos del videojuego en la consola
     */
    mostrarDatos() {
        console.log('Juego ', this.titulo, ', con el id: ', this.id, 
            ', se trata de ', this.descripcion, ', plataforma: ', this.plataforma);
    }
}