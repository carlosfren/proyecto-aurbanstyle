// ============ CONTROL DE ACCESO AL PANEL ============
// Solo puede ver esta página quien tenga una sesión activa con rol "admin".
// (La sesión y el rol se generan en app.js al iniciar sesión con la cuenta
// admin@urbanstyle.cl, ver ADMIN_CORREO en app.js)
function protegerVistaAdmin() {
    const sesion = obtenerSesion();

    if (!sesion || sesion.rol !== 'admin') {
        alert('Esta sección es solo para administradores. Inicia sesión con una cuenta de administrador.');
        window.location.href = 'login.html';
        return false;
    }

    const saludo = document.getElementById('adminSaludo');
    if (saludo) {
        saludo.textContent = `Conectado como ${sesion.correo}`;
    }
    return true;
}

// Guarda el id del producto que se está editando (null = modo "agregar")
let productoEnEdicionId = null;

// ============ RENDERIZAR TABLA DE PRODUCTOS ============
function renderizarTablaAdmin() {
    const tabla = document.getElementById('tablaProductosAdmin');
    const mensajeVacio = document.getElementById('mensajeTablaVacia');
    if (!tabla) return;

    const lista = obtenerProductos();

    if (lista.length === 0) {
        tabla.innerHTML = '';
        if (mensajeVacio) mensajeVacio.style.display = 'block';
        return;
    }

    if (mensajeVacio) mensajeVacio.style.display = 'none';

    tabla.innerHTML = lista.map(p => `
        <tr>
            <td><img src="${p.imagen}" alt="${p.nombre}"></td>
            <td>${p.nombre}</td>
            <td>${p.categoria || '-'}</td>
            <td>$${p.precio.toLocaleString('es-CL')}</td>
            <td>
                <button type="button" class="btn-admin btn-edit" onclick="cargarProductoParaEditar('${p.id}')">Editar</button>
                <button type="button" class="btn-admin btn-delete" onclick="eliminarProductoAdmin('${p.id}')">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// ============ CARGAR UN PRODUCTO EN EL FORMULARIO PARA EDITARLO ============
function cargarProductoParaEditar(id) {
    const lista = obtenerProductos();
    const producto = lista.find(p => p.id === id);
    if (!producto) return;

    productoEnEdicionId = id;

    document.getElementById('productoId').value = producto.id;
    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoCategoria').value = producto.categoria || 'Polerones';
    document.getElementById('productoPrecio').value = producto.precio;
    document.getElementById('productoCalidad').value = producto.calidad;
    document.getElementById('productoDescripcion').value = producto.descripcion;
    document.getElementById('productoImagen').value = producto.imagen;

    document.getElementById('tituloFormularioProducto').textContent = `Editando: ${producto.nombre}`;
    document.getElementById('btnGuardarProducto').textContent = 'Actualizar producto';
    document.getElementById('btnCancelarEdicion').style.display = 'block';

    document.getElementById('formularioProducto').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function cancelarEdicionProducto() {
    productoEnEdicionId = null;
    document.getElementById('formularioProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('tituloFormularioProducto').textContent = 'Agregar producto';
    document.getElementById('btnGuardarProducto').textContent = 'Guardar producto';
    document.getElementById('btnCancelarEdicion').style.display = 'none';
    document.querySelectorAll('#formularioProducto .error-text').forEach(el => el.textContent = '');
}

// ============ ELIMINAR PRODUCTO ============
function eliminarProductoAdmin(id) {
    const lista = obtenerProductos();
    const producto = lista.find(p => p.id === id);
    if (!producto) return;

    const confirmado = confirm(`¿Eliminar "${producto.nombre}" del catálogo? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    const nuevaLista = lista.filter(p => p.id !== id);
    guardarProductos(nuevaLista);

    if (productoEnEdicionId === id) {
        cancelarEdicionProducto();
    }

    renderizarTablaAdmin();
}

// ============ VALIDAR Y GUARDAR (AGREGAR O ACTUALIZAR) ============
function inicializarFormularioProductoAdmin() {
    const formulario = document.getElementById('formularioProducto');
    if (!formulario) return;

    document.getElementById('btnCancelarEdicion').addEventListener('click', cancelarEdicionProducto);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelectorAll('#formularioProducto .error-text').forEach(el => el.textContent = '');
        let esValido = true;

        const nombre = document.getElementById('productoNombre').value.trim();
        const categoria = document.getElementById('productoCategoria').value;
        const precio = parseInt(document.getElementById('productoPrecio').value, 10);
        const calidad = document.getElementById('productoCalidad').value.trim();
        const descripcion = document.getElementById('productoDescripcion').value.trim();
        const imagen = document.getElementById('productoImagen').value.trim();

        if (nombre === '' || nombre.length < 3) {
            document.getElementById('errorProductoNombre').textContent = 'Ingresa un nombre de al menos 3 caracteres.';
            esValido = false;
        }

        if (!categoria) {
            document.getElementById('errorProductoCategoria').textContent = 'Selecciona una categoría.';
            esValido = false;
        }

        if (isNaN(precio) || precio <= 0) {
            document.getElementById('errorProductoPrecio').textContent = 'Ingresa un precio válido, mayor a 0.';
            esValido = false;
        }

        if (calidad === '') {
            document.getElementById('errorProductoCalidad').textContent = 'Describe brevemente la calidad del producto.';
            esValido = false;
        }

        if (descripcion === '' || descripcion.length < 10) {
            document.getElementById('errorProductoDescripcion').textContent = 'La descripción debe tener al menos 10 caracteres.';
            esValido = false;
        }

        if (imagen === '') {
            document.getElementById('errorProductoImagen').textContent = 'Indica la ruta o URL de una imagen.';
            esValido = false;
        }

        if (!esValido) return;

        const lista = obtenerProductos();

        if (productoEnEdicionId) {
            // Modo edición: se actualiza el producto existente
            const indice = lista.findIndex(p => p.id === productoEnEdicionId);
            if (indice !== -1) {
                lista[indice] = { ...lista[indice], nombre, categoria, precio, calidad, descripcion, imagen };
            }
        } else {
            // Modo alta: se crea un id nuevo (correlativo simple)
            const nuevoId = String(Date.now());
            lista.push({ id: nuevoId, nombre, categoria, precio, calidad, descripcion, imagen });
        }

        guardarProductos(lista);
        cancelarEdicionProducto();
        renderizarTablaAdmin();
    });
}

// ============ INICIALIZACIÓN DE LA PÁGINA ============
document.addEventListener('DOMContentLoaded', () => {
    if (!protegerVistaAdmin()) return; // Corta la ejecución si no es admin

    renderizarTablaAdmin();
    inicializarFormularioProductoAdmin();
});
