// Trae la lista de stickers que se guardo antes en el storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Esta función se encarga de crear el HTML para que el usuario vea sus productos
const mostrarCarrito = () => {
    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-compra"); // Este es el Subtotal
    const totalFinalElemento = document.getElementById("total-final"); // Este es el Total de abajo
    
    if (!contenedor) return;

    // Limpio el div para que no se me acumulen los productos si borro uno
    contenedor.innerHTML = "";

    // Si no hay nada, aviso que el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p class='text-center py-5'>Tu carrito está vacío.</p>";
        if(totalElemento) totalElemento.innerText = "0";
        if(totalFinalElemento) totalFinalElemento.innerText = "0";
        return;
    }

    // Por cada sticker en el array se crea una tarjeta con su info
    carrito.forEach((prod, index) => {
        const div = document.createElement("div");
        div.className = "card shadow-sm border-0 mb-3";
        
        div.innerHTML = `
            <div class="card-body d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src=".${prod.img}" alt="${prod.nombre}" style="width: 60px;" class="me-3">
                    <div>
                        <h6 class="fw-bold mb-0">${prod.nombre}</h6>
                        <small class="text-muted">$${prod.precio}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-outline-danger rounded-pill" onclick="eliminarDelCarrito(${index})">
                    Eliminar
                </button>
            </div>
        `;
        contenedor.appendChild(div);
    });

    // Sumo todos los precios para sacar el total final
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    
    // Actualizo los números en la pantalla (Subtotal y Total)
    if(totalElemento) totalElemento.innerText = total;
    if(totalFinalElemento) totalFinalElemento.innerText = total; 
};

// Función para eliminar un producto del carrito por su índice
window.eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    
    // Guardo el cambio en el localStorage para que no vuelva a aparecer
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Vuelvo a llamar a la función para que se actualice la pantalla
    mostrarCarrito();
};

// Arranco la función apenas abre la página
mostrarCarrito();

// Capturo el botón de finalizar para darle funcionalidad
const btnFinalizar = document.getElementById("btn-finalizar");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
        
        if (carrito.length > 0) {
            carrito = [];
            localStorage.removeItem("carrito");

            // Confirmación visual de la compra exitosa
            const contenedor = document.getElementById("lista-carrito");
            contenedor.innerHTML = `
                <div class="text-center py-5">
                    <h2 class="text-success fw-bold">¡Compra Exitosa!</h2>
                    <p>Gracias por elegir nuestros stickers. Pronto te llegará el pedido.</p>
                    <a href="../index.html" class="btn btn-primary rounded-pill mt-3">Volver al Inicio</a>
                </div>
            `;

            // Reset de los totales a 0
            if(totalElemento) totalElemento.innerText = "0";
            const totalFinalElemento = document.getElementById("total-final");
            if(totalFinalElemento) totalFinalElemento.innerText = "0";

            if (typeof actualizarContador === 'function') {
                actualizarContador();
            }

        } else {
            console.log("No hay nada para comprar todavía");
        }
    });
}