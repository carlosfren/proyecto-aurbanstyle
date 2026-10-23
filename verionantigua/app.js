const productos = [
    {
        id: "1",
        nombre: "Poleron Emotion",
        precio: 29990,
        calidad: "100% Algodón Premium",
        descripcion: "Polerón de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/images.pgn.jpg"
    },
    {
        id: "2",
        nombre: "Poleron Valley Dream",
        precio: 32990,
        calidad: "100% Algodón Premium",
        descripcion: "Polerón de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/images2.pgn.jpg"
    },
    {
        id: "3",
        nombre: "Poleron Valley Dream V2",
        precio: 34990,
        calidad: "Edición Especial",
        descripcion: "Edición especial en color único con acabados de primera calidad.",
        imagen: "imagen/imagen3.pgn.jpg"
    },
    {
        id: "4",
        nombre: "Poleron Urban Style",
        precio: 29990,
        calidad: "100% Algodón",
        descripcion: "Corte holgado confortable perfecto para temporada de frío.",
        imagen: "imagen/imagen4.pgn.webp"
    },
    {
        id: "5",
        nombre: "Gorra Supreme",
        precio: 19990,
        calidad: "Ajustable Premium",
        descripcion: "Gorra marca Supreme alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/imagengorra5.pgn.jpg"
    },
    {
        id: "6",
        nombre: "Short Valley Dream",
        precio: 19990,
        calidad: "Alta Calidad",
        descripcion: "Short marca Valley Dream alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/0b4da0e9-3326-441a-adc8-cdcd387e2940.avif"
    },
    {
        id: "7",
        nombre: "Gorra Corteiz",
        precio: 19990,
        calidad: "Alta Calidad",
        descripcion: "Gorra marca Corteiz alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/69471991-eff1-417a-af2d-f2a29a5ed7e5.avif"
    },
    {
        id: "8",
        nombre: "Polera Valley Dream",
        precio: 29990,
        calidad: "100% Algodón Premium",
        descripcion: "Polera de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/01e588951dcb44dbbd85d47ff8295cf3-goods.avif"
    }
];

// ============ VALIDACIÓN DE RUT ============
// Quita puntos, guion y espacios, deja solo dígitos + dígito verificador (0-9 o K)
function limpiarRUT(rut) {
    return rut.replace(/[.\-\s]/g, '').toUpperCase();
}

function validarRUT(rutInput) {
    const rutLimpio = limpiarRUT(rutInput);

    if (rutLimpio === '') {
        return { valido: false, mensaje: 'El RUT es obligatorio.' };
    }
    if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) {
        return { valido: false, mensaje: 'El RUT solo puede tener números y, al final, un dígito verificador (0-9 o K).' };
    }
    if (rutLimpio.length > 9) {
        return { valido: false, mensaje: 'El RUT no puede tener más de 9 dígitos (8 números + dígito verificador).' };
    }
    if (rutLimpio.length < 8) {
        return { valido: false, mensaje: 'El RUT es muy corto, deben ser 9 dígitos (8 números + dígito verificador).' };
    }
    return { valido: true, mensaje: '' };
}

// ============ ESTADO DE SESIÓN EN EL MENÚ ============
function actualizarEstadoSesion() {
    const sesion = localStorage.getItem('sesionActiva');
    const loginItem = document.getElementById('navLoginItem');
    const registerItem = document.getElementById('navRegisterItem');

    if (!sesion) return; // Nadie ha iniciado sesión, se deja el menú tal cual

    if (loginItem) {
        loginItem.innerHTML = `<span class="nav-link">👤 ${sesion}</span>`;
    }
    if (registerItem) {
        registerItem.innerHTML = `<a href="#" class="nav-link" onclick="cerrarSesion(); return false;">Cerrar Sesión</a>`;
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesionActiva');
    alert('Sesión cerrada.');
    window.location.href = 'index.html';
}

// ============ FORMULARIO DE REGISTRO ============
function inicializarFormularioRegistro() {
    const registroForm = document.getElementById('registroForm');
    if (!registroForm) return;

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        let esValido = true;

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const rutInput = document.getElementById('rut').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (nombre === '') {
            document.getElementById('errorNombre').textContent = 'Ingresa tu nombre completo.';
            esValido = false;
        }

        if (correo === '' || !correo.includes('@')) {
            document.getElementById('errorCorreo').textContent = 'Ingresa un correo válido.';
            esValido = false;
        }

        const resultadoRut = validarRUT(rutInput);
        if (!resultadoRut.valido) {
            document.getElementById('errorRut').textContent = resultadoRut.mensaje;
            esValido = false;
        }

        if (password.length < 8) {
            document.getElementById('errorPassword').textContent = 'La contraseña debe tener mínimo 8 caracteres.';
            esValido = false;
        }

        if (password !== confirmPassword) {
            document.getElementById('errorConfirmPassword').textContent = 'Las contraseñas no coinciden.';
            esValido = false;
        }

        if (!esValido) return;

        // Sin base de datos: se guarda en localStorage como lista de usuarios
        const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
        usuarios.push({ nombre, correo, rut: limpiarRUT(rutInput) });
        localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

        alert(`¡Persona ingresada correctamente!\nBienvenido/a, ${nombre}.`);
        registroForm.reset();
        window.location.href = 'login.html';
    });
}

// ============ FORMULARIO DE LOGIN ============
function inicializarFormularioLogin() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        let esValido = true;

        const correo = document.getElementById('loginCorreo').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (correo === '' || !correo.includes('@')) {
            document.getElementById('errorLoginCorreo').textContent = 'Ingresa un correo válido.';
            esValido = false;
        }

        if (password === '') {
            document.getElementById('errorLoginPassword').textContent = 'Ingresa tu contraseña.';
            esValido = false;
        }

        if (!esValido) return;

        // Sin base de datos: la "sesión" se guarda en localStorage
        localStorage.setItem('sesionActiva', correo);
        alert('¡Sesión iniciada correctamente!');
        window.location.href = 'index.html';
    });
}

// Variable global para guardar el producto activo en pantalla
let productoActual = null;

// Función para redirigir desde index.html (se llama desde el onclick de cada card)
function verDetalle(idProducto) {
    localStorage.setItem('productoSeleccionadoId', idProducto);
    window.location.href = 'detalle_producto.html';
}

// Cargar información al abrir detalle_producto.html
document.addEventListener('DOMContentLoaded', () => {
    actualizarEstadoSesion();
    inicializarFormularioRegistro();
    inicializarFormularioLogin();

    const titleElem = document.getElementById('detailTitle');

    if (titleElem) {
        const idGuardado = localStorage.getItem('productoSeleccionadoId') || "1";
        productoActual = productos.find(p => p.id === idGuardado);

        if (productoActual) {
            document.getElementById('detailTitle').textContent = productoActual.nombre;
            document.getElementById('detailPrice').textContent = `$${productoActual.precio.toLocaleString('es-CL')} CLP`;
            document.getElementById('detailQuality').textContent = productoActual.calidad;
            document.getElementById('detailDescription').textContent = productoActual.descripcion;
            document.getElementById('detailImg').src = productoActual.imagen;
            document.getElementById('detailImg').alt = productoActual.nombre;
        }

        // Asignar el evento al botón Añadir al Carrito
        const btnAdd = document.getElementById('btnAddToCart');
        if (btnAdd) {
            btnAdd.addEventListener('click', agregarAlCarritoDesdeDetalle);
        }
    }
});

// Función para añadir al carrito leyendo Talla y Cantidad
function agregarAlCarritoDesdeDetalle() {
    if (!productoActual) return;

    const talla = document.getElementById('detailSize').value;
    const cantidad = parseInt(document.getElementById('detailqty').value) || 1;

    // miCarrito viene de carrito.js: así el badge y el offcanvas se actualizan solos
    miCarrito.agregarProducto({
        id: productoActual.id,
        nombre: productoActual.nombre,
        precio: productoActual.precio,
        imagen: productoActual.imagen,
        talla: talla,
        cantidad: cantidad
    });

    alert(`¡Agregado al carrito! \n${cantidad}x ${productoActual.nombre} (Talla ${talla})`);
}

// Función para añadir directo desde la card de index.html (botón "chik")
function agregarAlCarritoDesdeInicio(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    if (!producto) return;

    miCarrito.agregarProducto({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        talla: 'S',
        cantidad: 1
    });

    alert(`¡Agregado al carrito! \n${producto.nombre}`);
}
