export async function convertir_de_JSON_a_Objeto(direccion_archivo) {
    try {
        const datos = await fetch(direccion_archivo);
        const objeto = await datos.json();
        // Si el JSON tiene la estructura con "videojuegos", devolvemos solo el array
        return objeto.videojuegos || objeto;
    } catch (error) {
        console.error('Error al cargar el JSON:', error);
        throw error;
    }
}

export function convertir_de_Objeto_a_JSON(objeto) {
    return JSON.stringify(objeto, null, 2);
}