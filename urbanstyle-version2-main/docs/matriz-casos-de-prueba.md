# Matriz de casos de prueba (generada desde las specs)

| ID | Archivo de prueba | Caso de prueba |
|---|---|---|
| APP-01 | `App.spec.tsx` | la ruta / muestra Inicio |
| APP-02 | `App.spec.tsx` | cada ruta del menú renderiza su página |
| APP-03 | `App.spec.tsx` | una ruta desconocida muestra la página 404 |
| APP-04 | `App.spec.tsx` | navegar con el menú cambia de página sin recargar |
| APP-05 | `App.spec.tsx` | flujo completo: catálogo → añadir → carrito → checkout |
| NAV-01 | `components/BarraNavegacion.spec.tsx` | muestra un enlace por cada página de PAGINAS con su ruta |
| NAV-02 | `components/BarraNavegacion.spec.tsx` | marca como activo el enlace de la ruta actual |
| NAV-03 | `components/BarraNavegacion.spec.tsx` | el menú móvil inicia colapsado (sin clase 'show') |
| NAV-04 | `components/BarraNavegacion.spec.tsx` | el botón hamburguesa despliega y vuelve a colapsar el menú (estado) |
| NAV-05 | `components/BarraNavegacion.spec.tsx` | al elegir una página el menú móvil se cierra |
| NAV-06 | `components/BarraNavegacion.spec.tsx` | el contador del carrito muestra 0 cuando está vacío |
| NAV-07 | `components/BarraNavegacion.spec.tsx` | el contador refleja las unidades del carrito guardado |
| NAV-08 | `components/BarraNavegacion.spec.tsx` | el botón 'Abrir carrito' muestra el panel del carrito |
| BTN-01 | `components/Boton.spec.tsx` | muestra su contenido (children) |
| BTN-02 | `components/Boton.spec.tsx` | por defecto es type=button y clase btn btn-primary |
| BTN-03 | `components/Boton.spec.tsx` | acepta tipo y clase personalizados (props) |
| BTN-04 | `components/Boton.spec.tsx` | ejecuta alHacerClic al hacer clic (mock) |
| BTN-05 | `components/Boton.spec.tsx` | deshabilitado no dispara el clic |
| BTN-06 | `components/Boton.spec.tsx` | sin handler no falla al hacer clic y expone aria-label |
| CFO-01 | `components/CampoFormulario.spec.tsx` | asocia la etiqueta con el input (accesibilidad) |
| CFO-02 | `components/CampoFormulario.spec.tsx` | tipo=textarea renderiza un <textarea> |
| CFO-03 | `components/CampoFormulario.spec.tsx` | sin error no muestra mensaje ni clase is-invalid |
| CFO-04 | `components/CampoFormulario.spec.tsx` | con error muestra el mensaje, is-invalid, aria-invalid y aria-describedby |
| CFO-05 | `components/CampoFormulario.spec.tsx` | es un componente controlado: refleja 'valor' |
| CFO-06 | `components/CampoFormulario.spec.tsx` | dispara alCambiar y alSalir (mocks) |
| CON-01 | `components/Contenedor.spec.tsx` | usa la clase 'container' por defecto y renderiza children |
| CON-02 | `components/Contenedor.spec.tsx` | permite personalizar la clase |
| MEN-01 | `components/MenuCarrito.spec.tsx` | permanece oculto hasta que se abre |
| MEN-02 | `components/MenuCarrito.spec.tsx` | carrito vacío muestra mensaje y no muestra total |
| MEN-03 | `components/MenuCarrito.spec.tsx` | lista cada producto con su cantidad y calcula el total |
| MEN-04 | `components/MenuCarrito.spec.tsx` | el botón + aumenta la cantidad y recalcula el total |
| MEN-05 | `components/MenuCarrito.spec.tsx` | el botón − disminuye y al llegar a 0 elimina el producto |
| MEN-06 | `components/MenuCarrito.spec.tsx` | el botón + se deshabilita al llegar al máximo (10) |
| MEN-07 | `components/MenuCarrito.spec.tsx` | 'Eliminar' quita el producto |
| MEN-08 | `components/MenuCarrito.spec.tsx` | 'Vaciar carrito' deja el panel vacío |
| MEN-09 | `components/MenuCarrito.spec.tsx` | el botón de cerrar y el fondo oscuro cierran el panel |
| MEN-10 | `components/MenuCarrito.spec.tsx` | 'Ir a pagar' enlaza a /checkout y cierra el panel |
| PIE-01 | `components/PiePagina.spec.tsx` | muestra los mismos enlaces que la navegación (fuente única PAGINAS) |
| PIE-02 | `components/PiePagina.spec.tsx` | muestra el texto de derechos con el año 2026 |
| TAR-01 | `components/Tarjeta.spec.tsx` | muestra título y texto con las clases por defecto de Bootstrap |
| TAR-02 | `components/Tarjeta.spec.tsx` | permite personalizar las clases |
| TAR-03 | `components/Tarjeta.spec.tsx` | renderiza imagen con src y alt cuando se entrega urlImagen |
| TAR-04 | `components/Tarjeta.spec.tsx` | NO renderiza <img> si no hay urlImagen (render condicional) |
| TAR-05 | `components/Tarjeta.spec.tsx` | renderiza children dentro del cuerpo |
| TAR-06 | `components/Tarjeta.spec.tsx` | no fija ancho en línea (la grilla de Bootstrap decide) y acepta clase propia |
| TPR-01 | `components/TarjetaProducto.spec.tsx` | muestra nombre, descripción, imagen y precio formateado |
| TPR-02 | `components/TarjetaProducto.spec.tsx` | el enlace '+ Info' apunta al detalle del producto |
| TPR-03 | `components/TarjetaProducto.spec.tsx` | 'Añadir' agrega 1 unidad al carrito y abre el panel |
| TPR-04 | `components/TarjetaProducto.spec.tsx` | añadir dos veces acumula cantidad |
| CTX-01 | `context/CarritoContext.spec.tsx` | inicia vacío y cerrado |
| CTX-02 | `context/CarritoContext.spec.tsx` | agregar actualiza unidades y total, y abre el carrito |
| CTX-03 | `context/CarritoContext.spec.tsx` | cambiarCantidad, quitar y vaciar funcionan |
| CTX-04 | `context/CarritoContext.spec.tsx` | abrir y cerrar cambian el estado del panel |
| CTX-05 | `context/CarritoContext.spec.tsx` | guarda el carrito en localStorage (mock con spy) |
| CTX-06 | `context/CarritoContext.spec.tsx` | recupera el carrito guardado al montar |
| CTX-07 | `context/CarritoContext.spec.tsx` | si el JSON guardado está dañado, inicia vacío sin romperse |
| CTX-08 | `context/CarritoContext.spec.tsx` | si localStorage falla al guardar, el carrito sigue funcionando |
| CTX-09 | `context/CarritoContext.spec.tsx` | usar useCarrito fuera del Provider lanza un error claro |
| CAR-01 | `context/carritoReducer.spec.ts` | agregar un producto nuevo crea un ítem con cantidad 1 |
| CAR-02 | `context/carritoReducer.spec.ts` | agregar un producto existente suma cantidad (no duplica) |
| CAR-03 | `context/carritoReducer.spec.ts` | la cantidad nunca supera el máximo |
| CAR-04 | `context/carritoReducer.spec.ts` | quitar elimina solo el ítem indicado |
| CAR-05 | `context/carritoReducer.spec.ts` | cambiarCantidad actualiza la cantidad |
| CAR-06 | `context/carritoReducer.spec.ts` | cambiarCantidad a 0 o negativo elimina el ítem |
| CAR-07 | `context/carritoReducer.spec.ts` | vaciar deja el carrito en [] |
| CAR-08 | `context/carritoReducer.spec.ts` | es puro: no muta el estado original |
| CAR-09 | `context/carritoReducer.spec.ts` | una acción desconocida devuelve el mismo estado |
| CAR-10 | `context/carritoReducer.spec.ts` | calcularTotal suma precio × cantidad |
| CAR-11 | `context/carritoReducer.spec.ts` | contarUnidades suma las cantidades |
| CAR-12 | `context/carritoReducer.spec.ts` | carrito vacío => total 0 y 0 unidades |
| FRM-01 | `hooks/useFormulario.spec.tsx` | inicia con los valores iniciales y es inválido |
| FRM-02 | `hooks/useFormulario.spec.tsx` | alCambiar actualiza solo el campo indicado |
| FRM-03 | `hooks/useFormulario.spec.tsx` | no muestra errores hasta que el campo se toca (blur) |
| FRM-04 | `hooks/useFormulario.spec.tsx` | el error desaparece al corregir el valor |
| FRM-05 | `hooks/useFormulario.spec.tsx` | esValido es true cuando todos los campos cumplen |
| FRM-06 | `hooks/useFormulario.spec.tsx` | manejarEnvio NO llama al callback si hay errores, pero muestra todos los errores |
| FRM-07 | `hooks/useFormulario.spec.tsx` | manejarEnvio llama al callback con los valores si es válido |
| FRM-08 | `hooks/useFormulario.spec.tsx` | reiniciar restaura valores y oculta errores |
| FCO-01 | `pages/Formularios.spec.tsx` | enviar vacío muestra los 3 errores y no confirma el envío |
| FCO-02 | `pages/Formularios.spec.tsx` | no muestra errores mientras el usuario no haya tocado el campo |
| FCO-03 | `pages/Formularios.spec.tsx` | al salir de un campo inválido (blur) aparece su error y se marca is-invalid |
| FCO-04 | `pages/Formularios.spec.tsx` | corregir el valor elimina el error |
| FCO-05 | `pages/Formularios.spec.tsx` | con datos válidos confirma el envío y limpia el formulario |
| FSU-01 | `pages/Formularios.spec.tsx` | enviar vacío muestra errores de nombre y correo |
| FSU-02 | `pages/Formularios.spec.tsx` | con datos válidos confirma la suscripción con el nombre |
| FCH-01 | `pages/Formularios.spec.tsx` | con el carrito vacío ofrece ir al catálogo |
| FCH-02 | `pages/Formularios.spec.tsx` | muestra el resumen del pedido con el total |
| FCH-03 | `pages/Formularios.spec.tsx` | datos inválidos no completan la compra (el carrito se conserva) |
| FCH-04 | `pages/Formularios.spec.tsx` | datos válidos confirman la compra y vacían el carrito |
| INI-01 | `pages/Inicio.spec.tsx` | muestra el título y el botón hacia el catálogo |
| INI-02 | `pages/Inicio.spec.tsx` | muestra 4 productos destacados en una grilla responsiva |
| PAG-01 | `pages/Inicio.spec.tsx` | Blog muestra una tarjeta por entrada |
| PAG-02 | `pages/Inicio.spec.tsx` | Nosotros muestra misión, visión y valores con imagen adaptable (img-fluid) |
| PAG-03 | `pages/Inicio.spec.tsx` | NoEncontrado muestra 404 y enlace al inicio |
| DET-01 | `pages/ProductoDetalle.spec.tsx` | lee el parámetro :id de la URL y muestra el producto |
| DET-02 | `pages/ProductoDetalle.spec.tsx` | la imagen usa una ruta válida (sin '//') y es adaptable |
| DET-03 | `pages/ProductoDetalle.spec.tsx` | id inexistente muestra 'Producto no encontrado' y enlace al catálogo |
| DET-04 | `pages/ProductoDetalle.spec.tsx` | añade al carrito la cantidad elegida en el selector (estado local) |
| DET-05 | `pages/ProductoDetalle.spec.tsx` | por defecto añade 1 unidad |
| PRD-01 | `pages/Productos.spec.tsx` | al inicio lista los 8 productos |
| PRD-02 | `pages/Productos.spec.tsx` | escribir en el buscador filtra los productos |
| PRD-03 | `pages/Productos.spec.tsx` | elegir categoría filtra los productos |
| PRD-04 | `pages/Productos.spec.tsx` | sin coincidencias muestra una alerta |
| PRD-05 | `pages/Productos.spec.tsx` | borrar el texto restaura el catálogo completo |
| FIL-01 | `utils/filtros.spec.ts` | sin filtros devuelve todo el catálogo |
| FIL-02 | `utils/filtros.spec.ts` | filtra por texto sin distinguir mayúsculas |
| FIL-03 | `utils/filtros.spec.ts` | filtra por categoría |
| FIL-04 | `utils/filtros.spec.ts` | combina texto y categoría |
| FIL-05 | `utils/filtros.spec.ts` | ignora espacios alrededor del texto |
| FIL-06 | `utils/filtros.spec.ts` | devuelve vacío si no hay coincidencias |
| DAT-01 | `utils/filtros.spec.ts` | todos los ids son únicos |
| DAT-02 | `utils/filtros.spec.ts` | precios numéricos positivos y rutas de imagen absolutas |
| FMT-01 | `utils/formato.spec.ts` | agrega separador de miles con punto |
| FMT-02 | `utils/formato.spec.ts` | no agrega separador a números menores a 1000 |
| FMT-03 | `utils/formato.spec.ts` | maneja millones |
| FMT-04 | `utils/formato.spec.ts` | maneja cero |
| FMT-05 | `utils/formato.spec.ts` | redondea decimales |
| FMT-06 | `utils/formato.spec.ts` | conserva el signo en negativos |
| VAL-01 | `utils/validaciones.spec.ts` | rechaza vacío o solo espacios |
| VAL-02 | `utils/validaciones.spec.ts` | rechaza menos de 3 caracteres |
| VAL-03 | `utils/validaciones.spec.ts` | rechaza números y símbolos |
| VAL-04 | `utils/validaciones.spec.ts` | acepta nombres con tildes, ñ y espacios |
| VAL-05 | `utils/validaciones.spec.ts` | rechaza vacío |
| VAL-06 | `utils/validaciones.spec.ts` | rechaza formatos inválidos |
| VAL-07 | `utils/validaciones.spec.ts` | acepta un correo válido |
| VAL-08 | `utils/validaciones.spec.ts` | rechaza vacío |
| VAL-09 | `utils/validaciones.spec.ts` | rechaza números que no son celular chileno |
| VAL-10 | `utils/validaciones.spec.ts` | acepta formatos válidos (con y sin +56, espacios o guiones) |
| VAL-11 | `utils/validaciones.spec.ts` | rechaza vacío |
| VAL-12 | `utils/validaciones.spec.ts` | rechaza menos de 10 caracteres |
| VAL-13 | `utils/validaciones.spec.ts` | rechaza más de 500 caracteres |
| VAL-14 | `utils/validaciones.spec.ts` | acepta largo válido (límites 10 y 500) |
| VAL-15 | `utils/validaciones.spec.ts` | rechaza vacío y direcciones muy cortas |
| VAL-16 | `utils/validaciones.spec.ts` | acepta una dirección completa |
