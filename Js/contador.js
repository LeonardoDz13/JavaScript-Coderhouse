const actualizarContador = () => {

    // Busco el elemento del contador en el DOM (badge)
    const badge = document.getElementById('contador-carrito');

    // Traigo el carrito del storage y lo parseo, si no hay nada en el storage, creo un array vacio
    const carritoEnStorage = JSON.parse(localStorage.getItem('carritoStickers')) || [];

    //Sumo las cantidades de cada producto en el carrito para mostrar el total de items en el contador
    const totalItems = carritoEnStorage.reduce((acc, prod) => acc + prod.cantidad,0); 

    // Si el badge existe en esta pagina , le pongo el numero
    if (badge) {
        badge.innerText = totalItems;
        // Si es 0 , lo oculto, sino lo muestro
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }   
}

// Llamo a la funcion para actualizar el contador cada vez que se carga la pagina
actualizarContador();
