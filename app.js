// ============ CATÁLOGO BASE (semilla inicial) ============
// Esta lista solo se usa UNA vez, para poblar localStorage la primera vez
// que alguien abre el sitio. Desde ese momento en adelante, la fuente de
// verdad del catálogo es localStorage (clave: productosUrbanStyle), y es
// justamente lo que el panel de administrador puede leer y modificar.
const productosSemilla = [
    {
        id: "1",
        nombre: "Poleron Emotion",
        categoria: "Polerones",
        precio: 29990,
        calidad: "100% Algodón Premium",
        descripcion: "Polerón de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/images.pgn.jpg"
    },
    {
        id: "2",
        nombre: "Poleron Valley Dream",
        categoria: "Polerones",
        precio: 32990,
        calidad: "100% Algodón Premium",
        descripcion: "Polerón de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/images2.pgn.jpg"
    },
    {
        id: "3",
        nombre: "Poleron Valley Dream V2",
        categoria: "Polerones",
        precio: 34990,
        calidad: "Edición Especial",
        descripcion: "Edición especial en color único con acabados de primera calidad.",
        imagen: "imagen/imagen3.pgn.jpg"
    },
    {
        id: "4",
        nombre: "Poleron Urban Style",
        categoria: "Polerones",
        precio: 29990,
        calidad: "100% Algodón",
        descripcion: "Corte holgado confortable perfecto para temporada de frío.",
        imagen: "imagen/imagen4.pgn.webp"
    },
    {
        id: "5",
        nombre: "Gorra Supreme",
        categoria: "Accesorios",
        precio: 19990,
        calidad: "Ajustable Premium",
        descripcion: "Gorra marca Supreme alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/imagengorra5.pgn.jpg"
    },
    {
        id: "6",
        nombre: "Short Valley Dream",
        categoria: "Accesorios",
        precio: 19990,
        calidad: "Alta Calidad",
        descripcion: "Short marca Valley Dream alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/0b4da0e9-3326-441a-adc8-cdcd387e2940.avif"
    },
    {
        id: "7",
        nombre: "Gorra Corteiz",
        categoria: "Accesorios",
        precio: 19990,
        calidad: "Alta Calidad",
        descripcion: "Gorra marca Corteiz alta calidad, disponible en todas sus tallas.",
        imagen: "imagen/69471991-eff1-417a-af2d-f2a29a5ed7e5.avif"
    },
    {
        id: "8",
        nombre: "Polera Valley Dream",
        categoria: "Polerones",
        precio: 29990,
        calidad: "100% Algodón Premium",
        descripcion: "Polera de alta calidad de algodón full brillo, disponible en todas sus tallas con estilo oversize.",
        imagen: "imagen/01e588951dcb44dbbd85d47ff8295cf3-goods.avif"
    }
];

const CLAVE_PRODUCTOS = 'productosUrbanStyle';

// Devuelve el catálogo actual. Si es la primera vez que se visita el sitio
// en este navegador, lo crea a partir de la semilla.
function obtenerProductos() {
    let guardados = JSON.parse(localStorage.getItem(CLAVE_PRODUCTOS));
    if (!guardados || guardados.length === 0) {
        guardados = productosSemilla;
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(guardados));
    }
    return guardados;
}

function guardarProductos(lista) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

// Variable de trabajo usada por el resto del sitio (detalle, carrito, etc.)
let productos = obtenerProductos();

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

// ============ SESIÓN CON ROL (cliente / admin) ============
// Cuenta de administrador de referencia para el proyecto.
const ADMIN_CORREO = 'admin@urbanstyle.cl';

// Lee la sesión activa desde localStorage. Devuelve null si no hay nadie
// conectado, o un objeto { correo, rol } donde rol es 'admin' o 'cliente'.
function obtenerSesion() {
    const crudo = localStorage.getItem('sesionActiva');
    if (!crudo) return null;
    try {
        return JSON.parse(crudo);
    } catch (e) {
        // Compatibilidad con la versión anterior, que guardaba solo el correo
        return { correo: crudo, rol: 'cliente' };
    }
}

function guardarSesion(correo, rol) {
    localStorage.setItem('sesionActiva', JSON.stringify({ correo, rol }));
}

// ============ ESTADO DE SESIÓN EN EL MENÚ ============
function actualizarEstadoSesion() {
    const sesion = obtenerSesion();
    const loginItem = document.getElementById('navLoginItem');
    const registerItem = document.getElementById('navRegisterItem');

    if (!sesion) return; // Nadie ha iniciado sesión, se deja el menú tal cual

    if (loginItem) {
        loginItem.innerHTML = `<span class="nav-link">👤 ${sesion.correo}</span>`;
    }
    if (registerItem) {
        registerItem.innerHTML = `<a href="#" class="nav-link" onclick="cerrarSesion(); return false;">Cerrar Sesión</a>`;
    }

    // Si es administrador, se agrega un acceso directo al panel en el menú
    if (sesion.rol === 'admin') {
        const menu = document.querySelector('.nav-menu');
        if (menu && !document.getElementById('navAdminItem')) {
            const li = document.createElement('li');
            li.id = 'navAdminItem';
            li.innerHTML = `<a href="admin.html" class="nav-link">⚙️ Panel Admin</a>`;
            menu.insertBefore(li, registerItem);
        }
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

        // Sin base de datos: la "sesión" se guarda en localStorage.
        // El correo de administrador (ADMIN_CORREO) inicia con rol "admin";
        // cualquier otro correo válido inicia como "cliente".
        const rol = correo.toLowerCase() === ADMIN_CORREO ? 'admin' : 'cliente';
        guardarSesion(correo, rol);

        alert('¡Sesión iniciada correctamente!');
        window.location.href = rol === 'admin' ? 'admin.html' : 'index.html';
    });
}

// ============ CATÁLOGO DINÁMICO (index.html) ============
// Dibuja las tarjetas de producto a partir de lo que haya en localStorage.
// Así, cualquier cambio hecho desde el panel de administrador (agregar,
// editar o eliminar) se refleja automáticamente en la tienda.
function renderizarCatalogo() {
    const contenedor = document.getElementById('catalogoContainer');
    if (!contenedor) return;

    productos = obtenerProductos();

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">Aún no hay productos publicados.</p>';
        return;
    }

    contenedor.innerHTML = productos.map(p => `
        <article class="product-card">
            <img src="${p.imagen}" alt="${p.nombre}" onclick="verDetalle('${p.id}')" style="cursor:pointer">
            <span class="product-category">${p.categoria || 'General'}</span>
            <h3 onclick="verDetalle('${p.id}')" style="cursor:pointer">${p.nombre}</h3>
            <p class="product-desc">${p.descripcion}</p>
            <span class="product-price">$${p.precio.toLocaleString('es-CL')} CLP</span>
            <button class="btn-primary" onclick="agregarAlCarritoDesdeInicio('${p.id}')">Agregar</button>
        </article>
    `).join('');
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
    renderizarCatalogo();

    const titleElem = document.getElementById('detailTitle');

    if (titleElem) {
        productos = obtenerProductos();
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
