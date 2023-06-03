/* PC LUX, TIENDA DE HARDWARE Y PERIFÉRICOS DE PC */

//Creo la clase "Articulo", la voy a usar como plantilla para crear los objetos (artículos):-------------------------------------

class Producto {
    constructor(id, tipo, nombre, descripcion, precio, imagen) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

//Creo los ariculos para armar la pc:
//Usé dolares como moneda para tener numeros mas chicos (sad)

const cpuAmd5 = new Producto(1, "cpu", "Procesador AMD", "Ryzen 5 5600", 326, "img/ryzen5.jpg");
const cpuIntel = new Producto(2, "cpu", "Procesador INTEL", "Intel i5 13400", 228, "img/i5.jpg");
const ram16 = new Producto(3, "ram", "Memoria Corsair", "Vengeance 16gb (2x8) ddr4 3200", 39, "img/corsair16.jpg");
const ram32 = new Producto(4, "ram", "Memoria Kingston", "Fury 32gb (2x16) ddr4 3200", 188, "img/fury32.jpg");
const videoNvidia = new Producto(5, "gpu", "Placa de video Nvidia", "Asus Strix Geforce RTX 3060 ti", 793, "img/strix3060.jpg");
const videoAmd = new Producto(6, "gpu", "Placa de video AMD", "Radeon 6700 XT", 739, "img/radeon6700.jpg");
const teclado = new Producto(7, "perifericos", "Teclado Corsair", "K70 Pro Mini", 169, "img/corsairKeyboard.jpg");
const mouse = new Producto(8, "perifericos", "Mouse Corsair", "M65 Pro Elite", 38, "img/corsairMouse.jpg");
const headset = new Producto(9, "perifericos", "Heaset Corsair", "HS80 Wireless", 133, "img/corsairHeadset.jpg");
const cpuAmd7 = new Producto(10, "cpu", "Procesador AMD", "Ryzen 7 5700", 359, "img/ryzen7.jpg");
const cpuIntel7 = new Producto(11, "cpu", "Procesador INTEL", "Intel i7 13700", 347, "img/i7.jpg");
const ramPro16 = new Producto(12, "ram", "Memoria Corsair", "Vengeance Pro 16gb (2x8) ddr4 3200", 64, "img/corsairPro16.jpg");
const tecladoHyperx = new Producto(13, "perifericos", "Teclado HyperX", "Allow Origins 60", 79, "img/hyperxKeyboard.jpg");
const mouseHyperx = new Producto(14, "perifericos", "Mouse HyperX", "Pulsfaire Raid", 50, "img/hyperxMouse.jpg");
const videoNvidia2 = new Producto(15, "gpu", "Placa de video Nvidia", "Zotac 3080 ti", 1329, "img/zotac3080.jpg");
const videoAmd2 = new Producto(16, "gpu", "Placa de video AMD", "MSI 6800 XT",639, "img/radeon6800.jpg");

//Creo un array que va a contener todos los objetos:

const arrayProductos = [cpuAmd5, cpuAmd7, cpuIntel, cpuIntel7, ram16, ram32, ramPro16, videoAmd, videoAmd2, videoNvidia, videoNvidia2, teclado, tecladoHyperx, mouse, mouseHyperx, headset];

//Creo el array carrito (inicia vacío):

let arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito")) || [];

//MOSTRAR LOS PRODUCTOS-------------------------------------------------------------------------------------------------------
//Primero enlazo el array de prodcutos donde se van a mostrar en el HTML con js.
const contenedorProductos = document.getElementById("contenedorProductos");

//Creo una función para recorrer el array de productos e ir mostrando cada uno en una card:
const mostrarProductos = (productos) => {
    productos.forEach(producto => {
        let card = document.createElement("div");
        card.classList.add("card-container");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12", "p-2", "d-flex", "justify-content-center");
        card.innerHTML = `<div class="card bg-dark text-white" style="width: 19rem;">
                           <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                           <div class="card-body">
                               <h5 class="card-title">${producto.nombre}</h5>
                               <p class="card-text">${producto.descripcion}.</p>
                               <p class="card-text">USD$${producto.precio}</p>
                            </div>
                               <a class="btn btn-danger" id="boton${producto.id}">Agregar al carrito</a>
                            </div>
                       </div>`

        contenedorProductos.appendChild(card);

        //Creo el evento al hacer click en el boton de "Agregar Carrito" ejecute la función de agregar productos al carrito:
        const botonAgregarCarrito = document.getElementById(`boton${producto.id}`);
        botonAgregarCarrito.addEventListener("click", () => {
            agregarCarrito(producto.id);
        })
    });
}

mostrarProductos(arrayProductos);


//Creo la función para agregar productos al carrito (agregarCarrito):
const agregarCarrito = (id) => {
    const productoEnCarrito = arrayCarrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;

    } else {
        const producto = arrayProductos.find(producto => producto.id === id);
        arrayCarrito.push(producto);
    }
    console.log(arrayCarrito);
    saveLocal();
     
}



//CARRITO------------------------------------------------------------------------------------------------------------------------------
//Enlazo el boton del carrito con JS:
const botonCarrito = document.getElementById("botonCarrito");
botonCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

//Enlazo los elementos del modal del HTML con JS:
const modalCarrito = document.getElementById("modalCarrito");
const modalProductosCarrito = document.getElementById("modalProductosCarrito");
const modalTotalCarrito = document.getElementById("modalTotalCarrito");

//Creo la función para mostrar los productos seleccionados en el carrito:
const mostrarCarrito = () => {
    modalProductosCarrito.innerHTML = "";
    arrayCarrito.forEach(producto => {
        let articulo = document.createElement("div");
        let parrafo = document.createElement("p");
        parrafo.innerText = `🔴 ${producto.nombre} (${producto.descripcion}) - Cantidad: ${producto.cantidad} = USD$${producto.precio}       `
        //Este boton va a eliminar de a una unidad por producto (mirar la función mas abajo)
        let boton = document.createElement("button");
        boton.innerHTML = "🗑️";
        boton.classList.add("boton-eliminar");
        boton.addEventListener("click", () => {
            eliminarUnaUnidadProducto(producto.id);
        });
        parrafo.appendChild(boton);
        articulo.appendChild(parrafo);
        modalProductosCarrito.appendChild(articulo);
    });

    //Creo una variable para usarla en el innerHTML del modal:
    const totalCarrito = calcularTotal();

    let total = document.createElement("p");
    total.classList.add("total");
    total.innerHTML = `Total: USD$${totalCarrito}`;

    modalProductosCarrito.appendChild(total);
}


//Creo la función para eliminar una unidad de un producto del carrito:
const eliminarUnaUnidadProducto = (id) => {
    const producto = arrayCarrito.find(producto => producto.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else if (producto.cantidad === 1) {
        let indice = arrayCarrito.indexOf(producto);
        arrayCarrito.splice(indice, 1);
    }
    mostrarCarrito();
    saveLocal();
}

 //Doy función a los dos botones dentro del modal (vaciar carrito y comprar):
 const botonVaciar = document.getElementById("botonVaciar");
 const botonComprar = document.getElementById("botonComprar");

 botonVaciar.addEventListener("click", () => {
    arrayCarrito = [];
    mostrarCarrito();
    saveLocal();
 })

 botonComprar.addEventListener("click", () => {
        const total = calcularTotal();
        if (arrayCarrito.length > 0) {
            swal.fire({
                title: "Gracias por comprar en Pc Lux!",
                color: "white",
                html: `<b>El total por su compra es de:</b> USD$${total}`,
                icon: "success",
            });
            arrayCarrito = [];
            mostrarCarrito();
            saveLocal();
        } else {
            swal.fire({
                title: "Carrito vacío!",
                html: `<b>Por favor agregue productos para poder comprar</b>`,
                icon: "error",
            });
        }
    })

//Creo una función que me de el total del carrito:
const calcularTotal = () => {
    let totalCompra = 0;
    arrayCarrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    return totalCompra;
}



//NAVBAR-----------------------------------------------------------------------------------------------------------------------------
//Se va a filtrar los productos a la hacer click sobre alguna de las opciones del navbar:
const linkTodos = document.getElementById("linkTodos");
const linkGpu = document.getElementById("linkGpu");
const linkCpu = document.getElementById("linkCpu");
const linkRam = document.getElementById("linkRam");
const linkPerifericos = document.getElementById("linkPerifericos");

linkTodos.addEventListener("click", () => {
    contenedorProductos.innerHTML = "";
    mostrarProductos(arrayProductos);
}
)

linkGpu.addEventListener("click", () => {
    const gpuFiltro = arrayProductos.filter((producto => producto.tipo === "gpu"));
    contenedorProductos.innerHTML = "";
    mostrarProductos(gpuFiltro);
}
)

linkCpu.addEventListener("click", () => {
    const cpuFiltro = arrayProductos.filter((producto => producto.tipo === "cpu"));
    contenedorProductos.innerHTML = "";
    mostrarProductos(cpuFiltro);
}
)

linkRam.addEventListener("click", () => {
    const ramFiltro = arrayProductos.filter((producto => producto.tipo === "ram"));
    contenedorProductos.innerHTML = "";
    mostrarProductos(ramFiltro);
}
)

linkPerifericos.addEventListener("click", () => {
    const perifericosFiltro = arrayProductos.filter((producto => producto.tipo === "perifericos"));
    contenedorProductos.innerHTML = "";
    mostrarProductos(perifericosFiltro);
}
)


//LocalStorage, los creo y los guardo en una función para que sea mas facil:-----------------------------------------------------------

//Guardo en localStorage:
const saveLocal = () => {
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
}

//Restauro el localStorage:
    // JSON.parse(localStorage.getItem("arrayCarrito"));


//FETCH
const url = "https://criptoya.com/api/dolar";

const fetchDolar = document.getElementById("fetchDolar");

setInterval (() =>{
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(({blue, oficial})=>{
            fetchDolar.classList.add("fetchDolar");
            fetchDolar.innerHTML = `    <li><a class="dropdown-item">💵 Dolar Oficial: $${oficial}</a></li>
                                        <li><a class="dropdown-item">💶 Dolar Blue: $${blue}</a></li>`
        })
        .catch(error => console.error(error))
}, 5000)