import { GestorVideojuegos } from "./gestorVideojuegos.js";
import { ControladorVista } from "./controlador_vista.js";

/**
 * Función para cargar datos desde un archivo JSON
 */
async function cargarDatosJSON(url) {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar los datos: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos.videojuegos || datos; // Manejar ambos formatos
    } catch (error) {
        console.error('Error cargando datos:', error);
        throw error;
    }
}

/**
 * Función principal que inicializa la aplicación
 */
async function inicializarAplicacion() {
    try {
        // Crear instancia del gestor de videojuegos
        const gestorVideojuegos = new GestorVideojuegos();
        
        // Cargar datos iniciales desde el archivo JSON
        const datosIniciales = await cargarDatosJSON('js/videojuegos.json');
        gestorVideojuegos.cargarListaVideojuegos(datosIniciales);
        
        // Crear instancia del controlador de vista
        const controladorVista = new ControladorVista(gestorVideojuegos);
        
        // Inicializar la interfaz
        controladorVista.inicializar();
        
        console.log('Aplicación inicializada correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        alert('Error al cargar la aplicación. Por favor, recarga la página.');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);