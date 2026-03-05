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
                        <small class="text-muted">Cantidad: ${prod.cantidad}</small>
                        <p class="mb-0 fw-bold text-primary">$${prod.precio * prod.cantidad}</p>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="eliminarDelCarrito(${prod.id})">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(div);
    });
    
    // reduce para calcular el total de la compra, multiplicando el precio por la cantidad de cada sticker y sumando todo
    const total = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);

    // Para borrar un sticker utilizando el ID
    window.eliminarDelCarrito = (id) => {
        carrito = carrito.filter((prod) => prod.id !== id); //Filtro el array para dejar afuera que el usuario borro 
        // Guardo el nuevo carrito y vuelvo a mostrar
        guardarCarrito();
        mostrarCarrito();
    };
    // Actualiza contador de stickers en el carrito
    if (typeof actualizarContador === 'function') actualizarContador();

    if(btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            if (carrito.length > 0) { 
                // Alerta confirmar pedido
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
                    // Si confirma la compra, limpio el carrito y el storage
                    carrito = [];
                    guardarCarrito();
                    mostrarCarrito();
                    
                    Swal.fire(
                        '¡Listo!',
                        'Tu pedido fue recibido con éxito.',
                        'success'
                    );
                }
            });
        }
    });
}
// Llamo a la funcion para mostrar el carrito al cargar la pagina
mostrarCarrito();