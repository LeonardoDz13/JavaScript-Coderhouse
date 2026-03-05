// Traigo los stickers que se guardaron en el storage, si no hay nada arranca con el arrays vacio
let carrito = JSON.parse(localStorage.getItem('carritoStickers')) || [];

// capturamos el boton de finalizar compra para agregarle el evento de click y mostrar la alerta de confirmacion de compra con sweetalert2
const btnFinalizar = document.getElementById("finalizar-compra");

// Funcion para guardar el carrito en el storage cada vez que se agrega un sticker al carrito
const guardarCarrito = () => {
    localStorage.setItem('carritoStickers', JSON.stringify(carrito));
};

// Funcion para mostrar el carrito en el HTML
const mostrarCarrito = () => {
    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-compra");
    const totalFinalElemento = document.getElementById("total-final");

    if (!contenedor) return;

    // Limpiar el contenedor antes de mostrar el carrito actualizado
    contenedor.innerHTML = "";

    // Si el mensaje esta vacio, muestro un mensaje indicando que el carrito esta vacio
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <p class="fs-4">Tu carrito está vacío ☹️</p>
                <a href="./stickers.html" class="btn btn-primary rounded-pill">Ver catálogo</a>
            </div>`;
        if (totalElemento) totalElemento.innerText = "$0";
        if (totalFinalElemento) totalFinalElemento.innerText = "$0";
        // Actualizamos el contador aunque esté vacío
        if (typeof actualizarContador === 'function') actualizarContador();
        return;
    }
    // Recorro el carrito y creo un div por cada sticker, mostrando su imagen, nombre, cantidad y precio total 
    carrito.forEach((prod) => {
        const div = document.createElement("div");
        div.className = "card shadow-sm border-0 mb-3";

        div.innerHTML = `
    <div class="card-body d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
            <img src="${prod.img}" alt="${prod.nombre}" style="width: 60px; height: 60px; object-fit: contain;" class="me-3">
            <div>
                <h6 class="fw-bold mb-0">${prod.nombre}</h6>
                <small class="text-muted">Cantidad actual: ${prod.cantidad}</small>
                <p class="mb-0 fw-bold text-primary">$${prod.precio * prod.cantidad}</p>
            </div>
        </div>
        <div class="d-flex align-items-center gap-2">
            <input type="number" id="input-${prod.id}" value="1" min="1" class="form-control form-control-sm" style="width: 60px;">
            
            <button class="btn btn-sm btn-success rounded-pill" onclick="modificarCantidad(${prod.id}, 'agregar')">
                Agregar
            </button>

            <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="modificarCantidad(${prod.id}, 'quitar')">
                Quitar
            </button>
        </div>
    </div>
`;
        contenedor.appendChild(div);
    });

    // reduce para calcular el total de la compra, multiplicando el precio por la cantidad de cada sticker y sumando todo
    const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
    if (totalElemento) totalElemento.innerText = `$${total}`;
    if (totalFinalElemento) totalFinalElemento.innerText = `$${total}`;

    // Actualiza contador de stickers en el carrito
    if (typeof actualizarContador === 'function') actualizarContador();
};

const modificarCantidad = (id, operacion) => {
    const input = document.getElementById(`input-${id}`);
    const cantidadElegida = parseInt(input.value);
    const index = carrito.findIndex((prod) => prod.id === id);

    if (index !== -1 && cantidadElegida > 0) {
        if (operacion === 'agregar') {
            carrito[index].cantidad += cantidadElegida;
            lanzarToast(`Agregaste ${cantidadElegida} unidades`, "#28a745");
        } else if (operacion === 'quitar') {
            carrito[index].cantidad -= cantidadElegida;
            lanzarToast(`Quitaste ${cantidadElegida} unidades`, "#dc3545");

            if (carrito[index].cantidad <= 0) {
                carrito.splice(index, 1);
            }
        }

        guardarCarrito();
        mostrarCarrito();
    }
};

const lanzarToast = (mensaje, color) => {

    // Busca todos los carteles que estan visibles actualemente 
    const toastVisibles = document.querySelectorAll(".toastify.on");

    // Si hay 3 o mas , elimina el mas viejo
    if (toastVisibles.length >= 3) {

        toastVisibles[0].remove();

    }
    //Lanza nuevo cartel
    Toastify({
        text: mensaje,
        duration: 1000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
            background: color,
            borderRadius: "15px",
            fontWeight: "bold",
            fontSize: "18px",
        }
    }).showToast();
};


if (btnFinalizar) {
    btnFinalizar.addEventListener('click', () => {
        if (carrito.length > 0) {
            Swal.fire({
                title: '¿Confirmar pedido?',
                text: `El total es de $${carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)}`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#4169E1',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, comprar!',
                cancelButtonText: 'Seguir mirando'
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito = [];
                    guardarCarrito();
                    mostrarCarrito();

                    // Segundo Swal corregido:
                    Swal.fire({
                        title: '¡Listo!',
                        text: 'Tu pedido fue recibido con éxito. Serás redirigido al inicio.',
                        icon: 'success',
                        confirmButtonText: 'Genial',
                        confirmButtonColor: '#4169E1'
                    }).then(() => {
                        window.location.href = "../index.html";
                    });
                }
            });
        }
    });
}
// Llamo a la funcion para mostrar el carrito al cargar la pagina
mostrarCarrito();