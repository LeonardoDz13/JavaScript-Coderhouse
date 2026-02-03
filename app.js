// Lista de stickers disponibles en la tienda
const productos = [
    { id: 1, nombre: "BASKET", precio: 1500, img: "./assets/imagenes/basket_mano_+_pelota-removebg-preview.png" },
    { id: 2, nombre: "CHILL", precio: 1200, img: "./assets/imagenes/Chill_de_cojones-removebg-preview.png" },
    { id: 3, nombre: "LOGO LD", precio: 1000, img: "./assets/imagenes/Logo_LD.png" }
];

// Intento cargar el carrito desde el storage, si no hay nada arranco con array vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar el numerito del carrito en el menú
const actualizarContador = () => {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.innerText = `(${carrito.length})`;
    }
};

// Armo el catálogo de productos dinámicamente en el HTML
const generarCatalogo = () => {
    const contenedor = document.getElementById("contenedor-catalogo");
    
    // Si no estoy en la página que tiene este contenedor, no ejecuto nada
    if (!contenedor) return;

    contenedor.innerHTML = ""; // Limpio por si acaso para no duplicar

    productos.forEach(prod => {
        const div = document.createElement("div");
        div.className = "col-6 col-md-4";
        div.innerHTML = `
            <div class="card border-0 shadow-sm h-100 card-sticker">
                <img src="${prod.img}" class="card-img-top p-4" alt="${prod.nombre}">
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold">${prod.nombre}</h5>
                    <p class="card-text text-muted">$${prod.precio}</p>
                    <button class="btn btn-outline-dark btn-sm rounded-pill" id="btn-agregar-${prod.id}">Añadir al carrito</button>
                </div>       
            </div>
        `;
        contenedor.appendChild(div);

        // Capturo el evento click de cada botón de forma individual
        const boton = document.getElementById(`btn-agregar-${prod.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(prod.id);
        });
    });
};

// Lógica para meter productos al carrito y guardar en storage
function agregarAlCarrito(id) {
    const item = productos.find(p => p.id === id);
    if (item) {
        carrito.push(item);
        // Guardo el estado actual del carrito como JSON
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        // Actualizo el contador del menú para darle feedback al usuario
        actualizarContador();
    }
}

// Ejecuto las funciones principales al cargar
generarCatalogo();
actualizarContador();