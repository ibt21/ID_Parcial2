import { convertir_de_JSON_a_Objeto, convertir_de_Objeto_a_JSON } from "./ayudad.js";
import { Videojuego } from "./definiciones.js";
import { GestorVideojuegos } from "./gestorVideojuegos.js";
import { ControladorVista } from "./controladorVista.js";

// Inicializar la aplicación
async function inicializarAplicacion() {
    try {
        const gestorVideojuegos = new GestorVideojuegos();
        
        // Cargar datos del JSON
        const datosVideojuegos = await convertir_de_JSON_a_Objeto('js/videojuegos.json');
        gestorVideojuegos.CargarListaVideojuegos(datosVideojuegos);
        
        // Inicializar controlador de vista
        const controladorVista = new ControladorVista(gestorVideojuegos);
        controladorVista.inicializar();
        
        console.log('Aplicación inicializada correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        // Mostrar error en la interfaz si es posible
        const mensajes = document.getElementById('mensajes');
        if (mensajes) {
            mensajes.textContent = 'Error al cargar la aplicación: ' + error.message;
            mensajes.className = 'mensaje error';
        }
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);