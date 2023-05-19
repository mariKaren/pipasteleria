//Primero creo el array de objetos con los productos, que los podria poder en un archivo JSON para luego traerlos con un fetch
//Voy a crear el array de los productos y ademas una clase constrctura para utilizarla en el carrito
const arrayProductos = [{
    id: 0,
    nombre: "Lingotes",
    descripcion: "Conjunto de tres lingotes de: Chocotorta, Cheescake con frutos rojos y Lemon pie",
    precio: 5000,
    imagen: "./multimedia/lingotes.jpg",
},
{
    id: 1,
    nombre: "Banana Split",
    descripcion: "Esponjosa base de bizcocho de chocolate,con un relleno de crema, banana y dulce de leche, y una capa superior de chocolate y dulce de leche",
    precio: 4300,
    imagen: "./multimedia/tortaBananaSplit.jpg",
},
{
    id: 2,
    nombre: "Block",
    descripcion: "Torta inspirada en el chocolate, con una base de chocolate crocante,a la que le continua un mouse de chocolate y un baño final de chocolate Block",
    precio: 4500,
    imagen: "./multimedia/tortaBlock.jpg",
},
{
    id: 3,
    nombre: "Bon o Bon",
    descripcion: "Base de bizcocho esponjoso, con un relleno de crema de mani y Bon o Bon, y una capa superior de chocolate",
    precio: 6000,
    imagen: "./multimedia/tortaBonOBon.jpg",
},
{
    id: 4,
    nombre: "Cadbury",
    descripcion: "Base de chocolate solida, con un relleno sabor a fresa con trozos de chocolate y una capa superior de chocolate amargo ",
    precio: 6000,
    imagen: "./multimedia/tortaCadbury.jpg",
},
{
    id: 5,
    nombre: "Choco Moka",
    descripcion: "Una fina base de chocolate solida, seguida de una crema de chocolate y una de cafe, bañada con caramelo",
    precio: 6000,
    imagen: "./multimedia/tortaChocoMoka.jpg",
},
{
    id: 6,
    nombre: "Ferrero",
    descripcion: "Una base fina y solida de galleta de chocolate, acompañada con una capa pequeña de dulce de leche y el relleno clasico del Ferrero. Por ultimo, una capa de chocolate y detalles en dulce de leche",
    precio: 6000,
    imagen: "./multimedia/tortaFerrero.jpg",
},
{
    id: 7,
    nombre: "Kinder",
    descripcion: "Base crujiente de galletas mixtas, acompañado de un relleno helado inspirado en el chocolate Kinder y con pedazos del mismo y,por ultimo, unos detalles en Nutella",
    precio: 6000,
    imagen: "./multimedia/tortaKinder.jpg",
},
{
    id: 8,
    nombre: "Marroc",
    descripcion: "Base de bizcocho de chocolate, a la que le continuan tres capas:dos de chocolate y una inpirada en el relleno del marroc.Detalles en nutella en la parte superior.",
    precio: 6000,
    imagen: "./multimedia/tortaMarroc.jpg",
},
];

//CONSTRUCTOR
//podria agregarle una foto
class Producto {
constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = cantidad;
    this.resultado = false;
}
multiplicarCantidad() {
    this.resultado = this.precio * this.cantidad;
}
agregarCantidad() {
    this.cantidad++;
}
disminuirCantidad() {
    this.cantidad--;
}
}

const carrito = [];

//Voy a crear de manera dinamica las card de los productos en una funcion y la inicio al final
function imprimirenHTML(array) {
const contProductos = document.getElementById("contProductos");
for (const caja of array) {
    contProductos.innerHTML += `
<div class="card" style="width: 18rem;">
    <img src="${caja.imagen}" class="card-img-top imgTorta mx-auto d-block" alt="...">
    <div class="card-body">
        <h5 class="card-title">${caja.nombre}</h5>
        <p class="card-text card-text-descripcion">${caja.descripcion}</p>
        <div class="precioAgregar${caja.id}">
        <p class="card-text">$${caja.precio}</p>
        <button id=${caja.id} class="btn btnAgregarCarrito">Agregar al carrito</button>
        </div>
    </div>
</div>`;
}

for (const caja of array) {
    let btnCaja = document.getElementById(`${caja.id}`);
    btnCaja.addEventListener("click", () => agregarAlCarrito(caja.id));
}


}

// Voy a ir armando el carrito
//primero voy a capturar el contenedor del mismo
const contCarrito = document.getElementById("contCarrito");


//Voy a determinar que va a hacer la funcion agregar al carrito
function agregarAlCarrito(idCaja) {
const buscarCarrito = carrito.find((el) => el.id === idCaja);
if (buscarCarrito) {
    buscarCarrito.agregarCantidad();
} else {
    const buscarCajas = arrayProductos.find((el) => el.id === idCaja);
    carrito.push(
        new Producto(buscarCajas.id, buscarCajas.nombre, buscarCajas.precio, 1)
    );
}
for (const caja of carrito) {
    caja.multiplicarCantidad();
}
crearCarrito();
}

//Obtengo el precio final del carrito
function obtenerPrecioTotal(array) {
return array.reduce((total, elemento) => total + elemento.resultado, 0);
}

//Ahora creo la estructura html del carrito
function crearCarrito() {
let total = obtenerPrecioTotal(carrito);
if (carrito.length >= 1) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    contCarrito.innerHTML = `
    <table class="table tablaCarrito table-striped">
        <thead>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Botones</th>
                <th scope="col">Botones</th>
                <th scope="col">Precio Parcial</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="cajasEnTabla">
        <tr>
            <td colspan="5">Precio Final</td>
            <td>$${total}</td>
            <td>
                <button id="borrarCarrito" class="btn btn-primary">Borrar Carrito</button>
            </td>
            
        </tr>
        </tbody>
    </table>`;

    for (const caja of carrito) {
        let cajasEnTabla = document.getElementById("cajasEnTabla");
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row">${caja.nombre}</th>
            <td>$${caja.precio}</td>
            <td>${caja.cantidad}</td>
            <td>
                <button id="borrarUnidad${caja.id}" class="btn btn-primary">
                    Borrar Unidad
                </button>
            </td>
            <td>
                <button id="borrarProducto${caja.id}" class="btn btn-primary">
                    Borrar Producto
                </button>
            </td>
            <td>$${caja.resultado}</td>
            `;
        cajasEnTabla.prepend(tr);
    }
    for (const caja of carrito) {
        let borrarUnidad = document.getElementById(`borrarUnidad${caja.id}`);
        let borrarProducto = document.getElementById(`borrarProducto${caja.id}`);
        borrarUnidad.addEventListener("click", () => eliminarUnidad(caja.id));
        borrarProducto.addEventListener("click", () => eliminarProducto(carrito));
    }
    let borrarCarrito = document.getElementById("borrarCarrito");
    borrarCarrito.addEventListener("click", () => eliminarCarrito(carrito));
} else {
    contCarrito.innerHTML = "";
    localStorage.clear();
}

}


//APRETAR BORRAR CARRITO
function eliminarCarrito(array) {
array.length = 0;
crearCarrito();
}
//Eliminar producto
function eliminarProducto(id) {
const buscarCarrito = carrito.find((el) => (el.id) === id);
let cajaEliminar = carrito.indexOf(buscarCarrito);
carrito.splice(cajaEliminar, 1);
crearCarrito();
}
//Eliminar unidad
function eliminarUnidad(id) {
const buscarCarrito = carrito.find((el) => (el.id) === id);
if ((buscarCarrito.cantidad) > 1) {
    buscarCarrito.disminuirCantidad();
    buscarCarrito.multiplicarCantidad();
} else {
    let cajaEliminar = carrito.indexOf(buscarCarrito);
    carrito.splice(cajaEliminar, 1);   
}
crearCarrito();
}

//Voy a controlar el storage
function buscarEnStorage() {
let carritoEnStorage = JSON.parse(localStorage.getItem("carrito"));
if (carritoEnStorage) {
    for (const el of carritoEnStorage) {
        let caja = new Producto(el.id, el.nombre, el.precio, el.cantidad);
        caja.multiplicarCantidad();
        // Envio ese objeto al carrito
        carrito.push(caja);
    }
}
}

//Ejecucion
imprimirenHTML(arrayProductos);
buscarEnStorage();
crearCarrito();

// SECCION INSPIRACIONES
//primero capturo elemntos
const selectInspiracion=document.getElementById("selectInspiracion");
const buscar=document.getElementById("buscar");
const contInspiraciones=document.getElementById("contInspiraciones");

//funcion que me va a mostrar una vez que haga la seleccion y busque
function crearHTML(array){
    contInspiraciones.innerHTML="";
    for (const torta of array) {
        contInspiraciones.innerHTML+=`
        <div class="inspImg">
        <img src="${torta.imagen}" alt="...">
        `
    }
    
}
//Funcion que filtra segun la seleccion
function tortaFiltro(array,torta) {
    torta=selectInspiracion.value;
    if(torta=="todas"){
        return array;
    }
    else{
        result=array.filter((e)=>e.descripcion==torta);
        return result
    }
}

//evento
buscar.addEventListener("click",()=>{
    fetch("./inspiracion.json")
    .then((response)=>response.json())
    .then((data)=>{
        crearHTML(tortaFiltro(data));
    })
})
