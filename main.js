
// Declaración de variables y arreglo globales
const admin = 'admin';
const clave = 'admin';
const productos = ["Aceite", "Refrijerante", "Agua destilada"];
let carrito = 0;


//Función que permite mostrar por consola la lista de productos
function mostrarProducto(a){
    for (let i = 0; i < a.length; i++) {
       console.log(`${i+1} - ${a[i]} `);
    };
}
//Función suma

const sumar = (a,b) => {return a + b; }
//Función agregar al carro
const agregar = ( a ,b ,c ) =>{
    let resultado = sumar(a,b);
    console.log(`Ha sumado al carro el producto ${productos[c]} ${b} Total: ${resultado}`);
    return resultado;
}

//Función que permite sumar al carrito de compras
const compras = (a) =>{
   let carro = a;
    do {
        let seleccion = parseInt(prompt("Ingrese el codigo del producto o presione 9 para salir"));
        switch (seleccion) {
        case 1:
            carro = agregar(carro,9000, seleccion-1);
            break;
        case 2:
            carro = agregar(carro,20000, seleccion-1);
            break;
        case 3:
            carro = agregar(carro,15000, seleccion-1);
            break;
        case 9:
            console.log(`Gracias por su compra el TOTAL es: ${carro}`);
            break;
        default:
            console.log("El código ingresado es incorrecto");
            break;
        }
    } while (confirm("Desea agregar otro producto?"))
    return carro;
}  
// Función Menú que permite seleccionar las opciones de inicio
const menu = () =>{
    let option;
    do{
         option = parseInt(prompt('Ingrese la opción deseada:\n 1:Mostrar productos\n 2:Agregar al carrito\n 3: Alta producto\n 4:Salir'));
         switch (option) {
                case 1:
                   mostrarProducto(productos);
                   break;
                case 2:
                    carrito = compras(carrito);
                    console.log(`Recuerde abonar su compra $ ${carrito}`);
                    break;
                case 3:
                    console.log(`usuaruo ${admin} y clave ${admin}`);
                    if (admin == prompt("Ingrese usuario admin")) {
                        if (clave == prompt("Ingrese clave")) {
                            productos.push(prompt("ingrese el nombre del producto"));
                            console.log(productos);
                        } ;                      
                    } else {
                        alert("La clave o el usuario son incorrectos")
                    };
                    break;     
                case 4:
                    if (confirm("Realmente desea salir?")) {
                        console.log("Gracias por comprar");                  
                    }else option = parseInt(prompt('Ingrese la opción deseada:\n 1:Mostrar productos \n2:Agregar al carrito'));
                     break;
                 default:
                      console.log("No es una opcion válida");
                      break;
         }
    }while (option != 4);
}

//inicio del carrito
alert("Bienvenido");
menu();