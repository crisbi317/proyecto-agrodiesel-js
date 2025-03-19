
// Declaración de variables y arreglo globales

class Usuario{
    constructor(nombre,clave,permisos){
        this.nombre = nombre;
        this.clave = clave;
        this.permisos = permisos;
    }
   
}
//clase producto
class Producto{
    constructor(id,nombre,precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio
    }
    mostrar(){
        return `id: ${this.id} nombre: ${this.nombre} precio: ${this.precio}`;
    }
}
//Inicializacion de arreglo de productos
const productos = [new Producto("a1", "Aceite", 1500),
    new Producto("a2","Refrijerante",  2000), 
    new Producto( "a3","Agua destilada",  1000)];
    //inicializacion de arreglo de usuarios
const usuarios = [new Usuario("admin","admin","todos")];

//funcion agregar producto
const agregarProd = (productos)=>{
    let nombre = prompt("ingrese nombre del producto");
    if (nombre != NaN) {
          productos.push(new Producto("",nombre,0));
    } else {
      console.log("Ingrese nuevamente");
    } ;
}

//función validar usuario
const validarUser =() =>{
    let userInLocalStorage = localStorage.getItem("nombre");
    if (userInLocalStorage) {
        alert(`Hola de nuevo ${userInLocalStorage}`)
    } else {
        let newUser = prompt("Es tu primera vez ingresando, ingresa tu nombre...")
        localStorage.setItem('nombre', newUser);
    };
}
//Funcion logearse
const logearse=(usu)=>{
    validarUser();
    console.log('usuario admin y clave admin');
    //let usuario = prompt("Ingrese usuario admin");
    let usuario = localStorage.getItem('nombre')
    if(usuario){
        let usuarioArr = usu.find(usuarioArr => usuarioArr.nombre === usuario);
        if (usuarioArr) {
            let contrasena = prompt("Ingrese clave de usuario");
            if ( contrasena === usuarioArr.clave) {
            
               localStorage.setItem('clave', contrasena);
               return true
            }
        } else {
            console.log("La clave o el usuario son incorrectos");
            return false;
        }
    }
}

// funcion del menu para agregar un producto y logearse
const altaProd=(u,p)=>{
     logearse(u);
     agregarProd(p);
}
//Función que permite mostrar por consola la lista de productos
function mostrarProducto(a){
    a.forEach(element => {
        console.log(element.mostrar());
    });
}

//Función agregar al carro
const salir =() =>{
    if (confirm("Realmente desea salir?")) {
        console.log("Gracias por comprar"); 
        localStorage.clear();
        return 4;               
    }else return parseInt(prompt('Ingrese la opción deseada:\n 1:Mostrar productos \n2:Agregar al carrito'));
}

//Función suma
const sumar = () => {
    let a = parseInt(localStorage.getItem('totalCompra'));
    for (const element of JSON.parse(localStorage.getItem("carrito"))) {
        a+=parseInt(element.precio);
    }
    localStorage.setItem('totalCompra', a);
 }

//Función que permite sumar al carrito de compras
const compras = (prod) =>{
   let arrCarro=[];
   let product = prod;
    do {
        let seleccion = parseInt(prompt("Ingrese el codigo del producto o presione 9 para salir"));
         if (seleccion != NaN) {
            arrCarro.push(product[seleccion]);
      
        } else {
            console.log("El código ingresado es incorrecto");
        }
    } while (confirm("Desea agregar otro producto?"))
        localStorage.setItem('carrito', JSON.stringify(arrCarro));
        sumar();
        console.log(`Gracias por su compra el TOTAL es: ${localStorage.getItem("totalCompra")}`);
    return carro;
}

//funcion que inicia el proceso de compra
const comprar =(arr)=>{

    console.log(`Recuerde abonar su compra $ ${compras(arr)}`);
}  
// Función Menú que permite seleccionar las opciones de inicio
const menu = () =>{
    let option;
    localStorage.setItem('totalCompra', 0);
    do{
         option = parseInt(prompt('Ingrese la opción deseada:\n 1:Mostrar productos\n 2:Agregar al carrito\n 3: Alta producto\n 4:Salir'));
         switch (option) {
                case 1:
                    mostrarProducto(productos);
                   break;
                case 2:
                    comprar(productos);
                    break;
                case 3:
                    altaProd(usuarios,productos);
                    break;     
                case 4:
                    option = salir();
                     break;
                 default:
                      console.log("No es una opcion válida");
                      break;
         }
    }while (option != 4);
}

//inicio del carrito

menu();
