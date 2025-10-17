/**
 * Convierte un archivo JSON a objeto JavaScript
 */
export async function convertir_de_JSON_a_Objeto(direccion_archivo) {
    try {
        const datos = await fetch(direccion_archivo);
        if (!datos.ok) {
            throw new Error(`Error al cargar el archivo: ${datos.status}`);
        }
        const objeto = await datos.json();
        return objeto;
    } catch (error) {
        console.error('Error en convertir_de_JSON_a_Objeto:', error);
        throw error;
    }
}

/**
 * Convierte un objeto JavaScript a formato JSON
 */
export function convertir_de_Objeto_a_JSON(objeto) {
    try {
        return JSON.stringify(objeto, null, 2);
    } catch (error) {
        console.error('Error en convertir_de_Objeto_a_JSON:', error);
        throw error;
    }
}