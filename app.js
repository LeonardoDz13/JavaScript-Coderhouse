// Array para el carrito de compras
let carrito = [];

// Array de productos (stickers)
let productos = [
  { id: 1, nombre: "Sticker Anime", precio: 500 },
  { id: 2, nombre: "Sticker Gaming", precio: 450 },
  { id: 3, nombre: "Sticker Música", precio: 400 },
  { id: 4, nombre: "Sticker Arte", precio: 600 },
  { id: 5, nombre: "Sticker Ciencia", precio: 550 }
];

// Función para agregar productos al carrito
const agregarAlCarrito = (id) => {
  carrito.push(productos[parseInt(id) - 1]);
};

// Función para mostrar el carrito 
const verCarrito = () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  
  let total = 0;
  let mensajeCarrito = "TU CARRITO:\n\n";  


  for (let i = 0; i < carrito.length; i++) {


    
    mensajeCarrito += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio + "\n";
    
    //Calcular total
    total = total + carrito[i].precio;
  }

    // Mostrar total 
  mensajeCarrito += "\nTOTAL: $" + total;  
  
  alert(mensajeCarrito);
};

//Menu principal
let opcion                     

alert("Bienvenido a la Tienda de Stickers!");

while (opcion !== "8") {     
  opcion = prompt(
    "TIENDA DE STICKERS\n\n" +
    "Elige una opción:\n" +
    "1) Sticker Anime - $500\n" +
    "2) Sticker Gaming - $450\n" +
    "3) Sticker Música - $400\n" +
    "4) Sticker Arte - $600\n" +
    "5) Sticker Ciencia - $550\n" +
    "6) Ver mi carrito\n" +
    "7) Finalizar compra\n" +
    "8) Salir\n\n" +
    "Productos en carrito: " + carrito.length
  );

//Mensaje que sale si el usuario presiona "Cancelar"
  if (opcion === null) {   
    alert("Gracias por visitar nuestra tienda de stickers!");
    break;
  }

  switch (opcion) {
    case "1":
      agregarAlCarrito(opcion);
      alert("Sticker Anime agregado al carrito!");
      break;

    case "2":
      agregarAlCarrito(opcion);
      alert("Sticker Gaming agregado al carrito!");
      break;

    case "3":
      agregarAlCarrito(opcion);
      alert("Sticker Música agregado al carrito!");
      break;

    case "4":
      agregarAlCarrito(opcion);
      alert("Sticker Arte agregado al carrito!");
      break;

    case "5":
      agregarAlCarrito(opcion);
      alert("Sticker Ciencia agregado al carrito!");
      break;

    case "6":
      verCarrito();
      break;

    case "7":
      if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega stickers antes de finalizar.");
      } else {
        // Calcular el total
        let totalCompra = 0;
        for (let i = 0; i < carrito.length; i++) {
          totalCompra = totalCompra + carrito[i].precio;
        }

        alert("COMPRA FINALIZADA!\n\nTotal a pagar: $" + totalCompra + "\nGracias por tu compra!");
        // Vaciar el carrito
        carrito = [];
      }
      break;

    case "8":
      alert("Gracias por visitar nuestra tienda de stickers!");
      break;

    default:
      alert("Opción incorrecta. Por favor elige un número del 1 al 8.");
      break;
  }
}
