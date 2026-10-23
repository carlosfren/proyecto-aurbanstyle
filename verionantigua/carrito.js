class Carrito {
    constructor() {
        // Carga los productos desde localStorage o inicia una lista vacía
        this.items = JSON.parse(localStorage.getItem('carrito_tendenci')) || [];
        this.init();
    }

    init() {
        this.actualizarContador();
        this.renderizarModal();
    }

    // Agrega o incrementa un producto
    agregarProducto(producto) {
        // Buscar si el mismo producto y talla ya está en el carrito
        const indice = this.items.findIndex(item => item.id === producto.id && item.talla === producto.talla);

        if (indice !== -1) {
            this.items[indice].cantidad += producto.cantidad;
        } else {
            this.items.push(producto);
        }

        this.guardarYActualizar();
    }

    // Cambiar cantidad (+ o -)
    cambiarCantidad(id, talla, cambio) {
        const item = this.items.find(i => i.id === id && i.talla === talla);
        if (item) {
            item.cantidad += cambio;
            if (item.cantidad <= 0) {
                this.eliminarProducto(id, talla);
                return;
            }
        }
        this.guardarYActualizar();
    }

    // Eliminar producto por completo
    eliminarProducto(id, talla) {
        this.items = this.items.filter(item => !(item.id === id && item.talla === talla));
        this.guardarYActualizar();
    }

    // Guardar cambios en el navegador
    guardarYActualizar() {
        localStorage.setItem('carrito_tendenci', JSON.stringify(this.items));
        this.actualizarContador();
        this.renderizarModal();
    }

    // Actualiza la burbuja/badge con el total de items
    actualizarContador() {
        const totalItems = this.items.reduce((acc, item) => acc + item.cantidad, 0);
        const badges = document.querySelectorAll('.cart-count-badge');
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    }

    // Calcula el costo total de la compra
    obtenerTotal() {
        return this.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    }

    // Renderiza la lista dentro del Offcanvas / Modal de Bootstrap
    renderizarModal() {
        const contenedor = document.getElementById('listaCarritoBootstrap');
        const totalElemento = document.getElementById('totalCarritoBootstrap');
        
        if (!contenedor) return;

        if (this.items.length === 0) {
            contenedor.innerHTML = `<p class="text-center text-muted my-4">El carrito está vacío</p>`;
            if (totalElemento) totalElemento.textContent = '$0 CLP';
            return;
        }

        let html = '<ul class="list-group list-group-flush">';
        this.items.forEach(item => {
            html += `
                <li class="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px;">
                        <div>
                            <h6 class="mb-0 fw-bold" style="font-size: 0.9rem;">${item.nombre}</h6>
                            <small class="text-muted">Talla: ${item.talla} | $${item.precio.toLocaleString('es-CL')}</small>
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <button class="btn btn-sm btn-outline-secondary px-2" onclick="miCarrito.cambiarCantidad('${item.id}', '${item.talla}', -1)">-</button>
                        <span class="fw-bold px-1">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary px-2" onclick="miCarrito.cambiarCantidad('${item.id}', '${item.talla}', 1)">+</button>
                        <button class="btn btn-sm btn-danger ms-1" onclick="miCarrito.eliminarProducto('${item.id}', '${item.talla}')">&times;</button>
                    </div>
                </li>
            `;
        });
        html += '</ul>';

        contenedor.innerHTML = html;
        if (totalElemento) {
            totalElemento.textContent = `$${this.obtenerTotal().toLocaleString('es-CL')} CLP`;
        }
    }

    vaciarCarrito() {
        this.items = [];
        this.guardarYActualizar();
    }
}

// Instancia global del carrito
const miCarrito = new Carrito();