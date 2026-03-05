
// Capturo el contenedor donde van a estar las cards de los stickers
const contenedorProductos = document.getElementById("contenedor-stickers");
// Cargo el carrito desde el localStorage o creo un nuevo array si no existe 
let carrito = JSON.parse(localStorage.getItem('carritoStickers')) || [];

// Funcion para traer los datos del JSON 
const pedirProductos = async () => {
    const rutas =[

        '../data/productos.json',
        '/JavaScript-Coderhouse/data/productos.json'
    ];

    for (const ruta of rutas) {
        try {
            const response = await fetch(ruta);
            if (response.ok) {
                const data = await response.json();
                mostrarProductos(data);
                return; 
            }
        } catch (err) {
            console.warn(`No encontrado en: ${ruta}`);
        }
    }
    console.error("No se pudo cargar el catálogo de productos.");
};


// Funcion para crear las cards de los stickers una por una
const mostrarProductos = (productos) => {
        if (!contenedorProductos) return; // Verificar que el contenedor exista

        contenedorProductos.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

        // Iterar sobre los productos y crear las cards
        productos.forEach((sticker) => {
            const div = document.createElement("div");
            div.className = "col-6 col-md-4 col-lg-3";
            div.innerHTML = `
            <div class="card border-0 shadow-sm h-100 card-sticker">
                <img src="${sticker.img}" class="card-img-top p-4" alt="${sticker.nombre}">
                <div class="card-body text-center d-flex flex-column">
                    <h5 class="card-title fw-bold text-uppercase">${sticker.nombre}</h5>
                    <p class="badge bg-info text-dark w-50 mx-auto">${sticker.categoria}</p>
                    <p class="card-text text-muted fs-5">$${sticker.precio}</p>
                    <button class="btn btn-dark btn-sm rounded-pill mt-auto btn-agregar" id="${sticker.id}">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
            contenedorProductos.appendChild(div);
        });

        // Una vez que las cards están en el DOM, activo los botones de "Añadir al carrito"
        activarBotones(productos);

    };

// Funcion para buscar todos los botones de la pagina y asignarle el evento click a cada uno de ellos, para que al hacer click se agregue el producto al carrito
const activarBotones = (productos) => {
    const botones = document.querySelectorAll(".btn-agregar");

    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const idBoton = parseInt(e.target.id);
            const productoElegido = productos.find((producto) => producto.id === idBoton);

            agregarAlCarrito(productoElegido);
        });
    });
}

//Funcion para sumar la cantidad de un producto en el carrito
const agregarAlCarrito = (producto) => {
    // Busco si el producto ya existe en el carrito 
    const existe = carrito.find(item => item.id === producto.id);

    if (existe) {
        // Si ya existe, solo aumento la cantidad
        existe.cantidad ++;

        // Si es nuevo, lo agrego al carrito con cantidad 1
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
// Guardo en el storage cada vez que se agrega un producto al carrito
localStorage.setItem('carritoStickers', JSON.stringify(carrito));

// Actualizo el contador cada vez que se agrega un producto al carrito
if(typeof actualizarContador === 'function') actualizarContador(); 

// Muestro un mensaje de confirmacion cada vez que se agrega un producto al carrito
Toastify({
        text: `${producto.nombre} agregado!`,
        duration: 2000,
        gravity: "top",
        position: "right",
        style: { background: "linear-gradient(to right, #4169E1, #00b09b)" }
    }).showToast();
};
// Llamo a la funcion para traer los productos del JSON y mostrarlos en el DOM
pedirProductos();