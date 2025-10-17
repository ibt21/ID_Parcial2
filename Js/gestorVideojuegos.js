/**
 * Manejo de los datos de la lista o arreglo de videojuegos
 * Este se debe engargar de manejar el CRUD del Arreglo de videojuegos:
 * - Crear elementos nuevos en el arreglo (Agregar nuevo videojuego)
 * - Leer todos los elementos del arreglo de videojuegos
 * - Actualizar datos de los elementos del arreglo
 * - Eliminar un elemento en especifico
 */
export class GestorVideojuegos {
    constructor() {
        this.listaVideojuegos = []; // Arreglo para almacenar los videojuegos
    }

    /**
     * Carga una lista de videojuegos ingresada por el usuario
     */
    cargarListaVideojuegos(arreglo_videojuegos) {
        try {
            if (!arreglo_videojuegos || !Array.isArray(arreglo_videojuegos)) {
                throw new Error('El arreglo de videojuegos no es válido');
            }
            this.listaVideojuegos = arreglo_videojuegos;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene toda la lista de videojuegos
     */
    obtenerLista() {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no ha sido inicializada');
            }
            return this.listaVideojuegos;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Obtiene un videojuego por su ID
     */
    obtenerPorId(id) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no ha sido inicializada');
            }
            
            const videojuego = this.listaVideojuegos.find(v => v.id === id);
            
            if (!videojuego) {
                throw new Error(`No se encontró un videojuego con el id: ${id}`);
            }

            return videojuego;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Agrega un nuevo videojuego a la lista
     */
    agregar(videojuego) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('La lista de videojuegos no ha sido inicializada');
            }
            if (!videojuego) {
                throw new Error('El videojuego enviado es nulo');
            }
            if (!videojuego.id || !videojuego.titulo || !videojuego.descripcion || !videojuego.plataforma) {
                throw new Error('Todos los campos son obligatorios');
            }

            // Verificar si el ID ya existe
            const existe = this.listaVideojuegos.find(v => v.id === videojuego.id);
            if (existe) {
                throw new Error('Ya existe un videojuego con ese ID');
            }

            this.listaVideojuegos.push(videojuego);
            return videojuego;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualiza los datos de un videojuego existente
     */
    actualizar(id, nuevosDatos) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('No se ha inicializado la lista de videojuegos');
            }

            const indice = this.listaVideojuegos.findIndex(v => v.id === id);
            
            if (indice === -1) {
                throw new Error('No se ha encontrado el ID en la lista de videojuegos');
            }

            // Actualizar solo los campos proporcionados
            this.listaVideojuegos[indice] = {
                ...this.listaVideojuegos[indice],
                ...nuevosDatos
            };

            return this.listaVideojuegos[indice];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Elimina un videojuego por su ID
     * @param {number} id - ID del videojuego a eliminar
     * @returns {Object} Videojuego eliminado
     */
    eliminar(id) {
        try {
            if (!this.listaVideojuegos) {
                throw new Error('No se ha cargado la lista de videojuegos');
            }

            const indice = this.listaVideojuegos.findIndex(v => v.id === id);

            if (indice === -1) {
                throw new Error(`No se ha encontrado el elemento con el ID: ${id}`);
            }

            const eliminado = this.listaVideojuegos.splice(indice, 1)[0];
            return eliminado;
        } catch (error) {
            throw error;
        }
    }
}