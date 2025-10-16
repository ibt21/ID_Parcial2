/**
 * Manejo de los datos de la lista o arreglo de videojuegos
 * Este se debe engargar de manejar el CRUD del Arreglo de vodeojuegos:
 * -Crear elementos nuevos en el arreglo(Agregar nuevo videojuego)
 * -Leero todos los elementos del arreglo de videojuegos
 * -Actualizar datos de los elementos del arreglo
 * -Eliminar un elemento en especifico
*/
export class GestorVideojuegos {
    constructor() {
        this.listaVideojuego = null;
        this.videojuegoSeleccionado = null;
    }

    //carga una lista de videojuegos ingresada por el usuario
    CargarListaVideojuegos(arreglo_videojuegos) {
        this.listaVideojuego = arreglo_videojuegos;
    }

    // Método según instrucciones: obtenerLista()
    obtenerLista() {
        try {
            if (!this.listaVideojuego)
                throw new Error('La lista de videojuegos no ha sido inicializada');
            return this.listaVideojuego;
        }
        catch (error) {
            throw error;
        }
    }

    // Método según instrucciones: obtenerPorId(id)
    obtenerPorId(id) {
        try {
            if (!this.listaVideojuego)
                throw new Error('La lista de videojuegos no ha sido inicializada');

            const videojuego = this.listaVideojuego.find(videojuego => videojuego.id === id);

            if (!videojuego)
                throw new Error(`No se encontró un videojuego con el id: ${id}`);

            return videojuego;
        }
        catch (error) {
            throw error;
        }
    }

    // Método según instrucciones: agregar(videojuego)
    agregar(videojuego) {
        try {
            if (!this.listaVideojuego)
                throw new Error('La lista de videojuegos no ha sido inicializada');
            if (!videojuego)
                throw new Error('El videojuego enviado es nulo');
            if (!videojuego.id || !videojuego.titulo || !videojuego.descripcion || !videojuego.plataforma)
                throw new Error('Todos los campos son obligatorios');

            this.listaVideojuego.push(videojuego);
            return videojuego;
        }
        catch (error) {
            throw error;
        }
    }

    // Método según instrucciones: actualizar(id, nuevosDatos)
    actualizar(id, nuevosDatos) {
        try {
            if (!this.listaVideojuego)
                throw new Error('No se ha inicializado la lista de videojuegos');
            if (!nuevosDatos)
                throw new Error('No se han proporcionado datos para actualizar');

            const indice = this.listaVideojuego.findIndex(
                videojuego => videojuego.id === id
            );

            if (indice === -1) {
                throw new Error('No se ha encontrado el ID en la lista de videojuegos');
            }

            this.listaVideojuego[indice] = { ...this.listaVideojuego[indice], ...nuevosDatos };
            return this.listaVideojuego[indice];
        }
        catch (error) {
            throw error;
        }
    }

    // Método según instrucciones: eliminar(id)
    eliminar(id) {
        try {
            if (!this.listaVideojuego)
                throw new Error('No se ha cargado la lista de videojuegos');

            const indice = this.listaVideojuego.findIndex(
                videojuego => videojuego.id === id
            );

            if (indice === -1)
                throw new Error(`No se ha encontrado el elemento con el ID: ${id}`);

            const eliminado = this.listaVideojuego.splice(indice, 1);
            return eliminado[0];
        }
        catch (error) {
            throw error;
        }
    }

    // Métodos adicionales que ya tenías (mantener compatibilidad)
    ObtenerListaDeVideojuegos() {
        return this.obtenerLista();
    }

    ObtenerVideojuegoPorID(id) {
        return this.obtenerPorId(id);
    }

    AgregarNuevoVideojuego(videojuego) {
        return this.agregar(videojuego);
    }

    ActualizarDatosVideojuego(id, videojuego_actualizado) {
        return this.actualizar(id, videojuego_actualizado);
    }

    EliminarVideojuegoPorID(id) {
        return this.eliminar(id);
    }
}