/* PC LUX, TIENDA DE HARDWARE Y PERIFÉRICOS DE PC */

//Creo la clase "Articulo", la voy a usar como plantilla para crear los objetos (artículos):

class Articulo {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 1;
    }
}

//Creo los ariculos para armar la pc:
//Usé dolares como moneda para tener numeros mas chicos (sad)

const cpuAmd = new Articulo(1, "Ryzen 5 5600", 326, "img/ryzen5.jpg");
const cpuIntel = new Articulo(2, "Intel i5 3400", 518, "img/i5.jpg");
const ram16 = new Articulo(3, "Corsair Vengeance 16gb (2x8) ddr4 3200", 69, "img/corsair16.jpg");
const ram32 = new Articulo(4, "Kigston Fury 32gb (2x16) ddr4 3200", 188, "img/fury32.jpg");
const videoNvidia = new Articulo(5, "Nvidia Geforce RTX 3060 ti", 793, "img/strix3060.jpg");
const videoAmd = new Articulo(6, "Radeon 6700 XT", 739, "img/radeon6700.jpg");
const teclado = new Articulo(7, "Corsair k70 Pro Mini", 169, "img/corsairKeyboard.jpg");
const mouse = new Articulo(8, "Corsair m65 Pro Elite", 38, "img/corsairMouse.jpg");
const headset = new Articulo(9, "Corsair hs80 Wireless", 133, "img/corsairHeadset.jpg");


//Creo un array que va a contener todos los objetos:

const arrayArticulos = [cpuAmd, cpuIntel, ram16, ram32, videoAmd, videoNvidia, teclado, mouse, headset];

//Creo el array carrito (inicia vacío):

let arrayCarrito = [];

//Muestro los productos en el HTML:


