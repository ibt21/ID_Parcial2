import { GestorVideojuegos } from "./gestorVideojuegos.js";

export class ControladorVista {
    constructor(gestorVideojuegos) {
        this.gestor = gestorVideojuegos;
        this.contenedor = document.getElementById('lista-videojuegos');
        this.formulario = document.getElementById('form-videojuego');
        this.mensajes = document.getElementById('mensajes');
    }

    // Crear tarjetas dinámicamente
    crearTarjetas() {
        if (!this.contenedor) return;

        this.contenedor.innerHTML = '';

        try {
            const videojuegos = this.gestor.obtenerLista();

            videojuegos.forEach(videojuego => {
                const tarjeta = this.crearTarjeta(videojuego);
                this.contenedor.appendChild(tarjeta);
                this.actualizarContador()
            });
        } catch (error) {
            this.mostrarMensaje(error.message, 'error');
        }
    }

    // Crear una tarjeta individual
    crearTarjeta(videojuego) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'videojuego-card';
        tarjeta.innerHTML = `
            <h3>${videojuego.titulo}</h3>
            <p><strong>Descripción:</strong> ${videojuego.descripcion}</p>
            <p><strong>Plataforma:</strong> ${videojuego.plataforma}</p>
            <div class="acciones">
                <button class="btn-editar" data-id="${videojuego.id}">Editar</button>
                <button class="btn-eliminar" data-id="${videojuego.id}">Eliminar</button>
            </div>
        `;

        // Agregar event listeners a los botones
        const btnEditar = tarjeta.querySelector('.btn-editar');
        const btnEliminar = tarjeta.querySelector('.btn-eliminar');

        btnEditar.addEventListener('click', () => this.editarVideojuego(videojuego.id));
        btnEliminar.addEventListener('click', () => this.eliminarVideojuego(videojuego.id));

        return tarjeta;
    }

    // Manejar edición de videojuego
    editarVideojuego(id) {
        try {
            const videojuego = this.gestor.obtenerPorId(id);
            this.mostrarFormularioEdicion(videojuego);
        } catch (error) {
            this.mostrarMensaje(error.message, 'error');
        }
    }

    // Mostrar formulario para edición
    mostrarFormularioEdicion(videojuego) {
        if (!this.formulario) return;

        document.getElementById('videojuego-id').value = videojuego.id;
        document.getElementById('titulo').value = videojuego.titulo;
        document.getElementById('descripcion').value = videojuego.descripcion;
        document.getElementById('plataforma').value = videojuego.plataforma;

        this.mostrarMensaje(`Editando: ${videojuego.titulo}`, 'info');
    }

    // Eliminar videojuego
    eliminarVideojuego(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este videojuego?')) {
            try {
                const eliminado = this.gestor.eliminar(id);
                this.crearTarjetas();
                this.mostrarMensaje(`Videojuego "${eliminado.titulo}" eliminado correctamente`, 'exito');
                this.actualizarContador()
            } catch (error) {
                this.mostrarMensaje(error.message, 'error');
            }
        }
    }

    // Manejar envío del formulario
    manejarEnvioFormulario() {
        if (!this.formulario) return;

        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const id = document.getElementById('videojuego-id').value;
            const titulo = document.getElementById('titulo').value;
            const descripcion = document.getElementById('descripcion').value;
            const plataforma = document.getElementById('plataforma').value;

            if (!titulo || !descripcion || !plataforma) {
                this.mostrarMensaje('Todos los campos son obligatorios', 'error');
                return;
            }

            try {
                if (id) {
                    // Actualizar existente
                    this.gestor.actualizar(parseInt(id), { titulo, descripcion, plataforma });
                    this.mostrarMensaje('Videojuego actualizado correctamente', 'exito');
                } else {
                    // Crear nuevo
                    const nuevoId = Math.max(...this.gestor.obtenerLista().map(v => v.id)) + 1;
                    this.gestor.agregar({ id: nuevoId, titulo, descripcion, plataforma });
                    this.mostrarMensaje('Videojuego agregado correctamente', 'exito');
                }

                this.crearTarjetas();
                this.limpiarFormulario();
            } catch (error) {
                this.mostrarMensaje(error.message, 'error');
            }
        });
    }

    // Limpiar formulario
    limpiarFormulario() {
        if (!this.formulario) return;

        this.formulario.reset();
        document.getElementById('videojuego-id').value = '';
    }
    actualizarContador() {
        const contador = document.getElementById('contador-videojuegos');
        if (contador) {
            const cantidad = this.gestor.obtenerLista().length;
            contador.textContent = `${cantidad} videojuego${cantidad !== 1 ? 's' : ''} en la lista`;
        }
    }
    // Mostrar mensajes al usuario
    mostrarMensaje(mensaje, tipo) {
        if (!this.mensajes) return;

        this.mensajes.textContent = mensaje;
        this.mensajes.className = `mensaje ${tipo}`;

        setTimeout(() => {
            this.mensajes.textContent = '';
            this.mensajes.className = 'mensaje';
        }, 5000);
    }

    // Inicializar el controlador
    inicializar() {
        this.crearTarjetas();
        this.manejarEnvioFormulario();
        this.actualizarContador(); // Agregar esta línea

        // Botón para nuevo videojuego
        const btnNuevo = document.getElementById('btn-nuevo');
        if (btnNuevo) {
            btnNuevo.addEventListener('click', () => this.limpiarFormulario());
        }
    }
}