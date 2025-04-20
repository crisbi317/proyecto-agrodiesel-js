
// Clase Producto
class Producto {
    constructor(id, nombre, precio, descripcion, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.foto = foto;
    }
}

// Datos de los usuarios
const usuarios = [
    { username: "admin", password: "admin123" },
    { username: "usuario1", password: "123456" }
];

// Función de Login
const login = (username, password) => {
    const usuario = usuarios.find(u => u.username === username && u.password === password);
    if (usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        Swal.fire('Bienvenido', 'Has iniciado sesión correctamente.', 'success');
        mostrarNavbar();
        mostrarProductos();
    } else {
        Swal.fire('Error', 'Usuario o contraseña incorrectos.', 'error');
    }
};

const mostrarNavbar = () => {
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
};

const mostrarProductos = () => {
    document.getElementById('adminSection').style.display = 'none';
    document.getElementById('productos').style.display = 'block';
    loadDom(JSON.parse(localStorage.getItem('baseDeDatos')) || []);
};

const mostrarAgregarProducto = () => {
    document.getElementById('productos').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
};

const logout = () => {
    localStorage.removeItem('usuario');
    Swal.fire('Hasta luego', 'Has cerrado sesión correctamente.', 'info');
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
};

const agregarProducto = (producto) => {
    const productos = JSON.parse(localStorage.getItem('baseDeDatos')) || [];
    productos.push(producto);
    localStorage.setItem('baseDeDatos', JSON.stringify(productos));
    Swal.fire('Producto agregado', `${producto.nombre} ha sido agregado al catálogo.`, 'success');
    loadDom(productos);
};

const getData = async () => {
    try {
        const res = await fetch('./products.json');
        const data = await res.json();
        localStorage.setItem('baseDeDatos', JSON.stringify(data));
        loadDom(data);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
    }
};

const loadDom = (productos) => {
    const contenedor = document.getElementById('productos');
    contenedor.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");
    contenedor.className = "row row-cols-1 row-cols-md-3 g-4";
    contenedor.innerHTML = productos.map((prod) => `
        <div class="col">
            <div class="card h-100 text-center">
                <img src="imagenes/${prod.foto}" class="card-img-top" alt="${prod.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">${prod.descripcion}</p>
                    <p class="card-text"><strong>$${prod.precio}</strong></p>
                    <button class="btn btn-success agregar-carrito" data-id="${prod.id}">Agregar al carrito</button>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.agregar-carrito').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const producto = productos.find(p => p.id === id);
            agregarAlCarrito(producto);
        });
    });
};

const agregarAlCarrito = (producto) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire({
        title: '¡Agregado!',
        text: `${producto.nombre} fue agregado al carrito.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
    });
    actualizarTotal();
};

const actualizarTotal = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((acc, p) => acc + parseFloat(p.precio), 0);
    const totalContenedor = document.getElementById('totalCompra');
    if (totalContenedor) {
        totalContenedor.innerText = `Total: $${total}`;
    }
};

const finalizarCompra = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        return Swal.fire('Carrito vacío', 'Agrega productos antes de finalizar la compra.', 'warning');
    }

    const total = carrito.reduce((acc, p) => acc + parseFloat(p.precio), 0);

    Swal.fire({
        title: '¿Deseás finalizar la compra?',
        text: `Total a pagar: $${total}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            actualizarTotal();
            Swal.fire('Compra completada', '¡Gracias por tu compra!', 'success');
        }
    });
};

const mostrarCarritoEnModal = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById('carritoContenido');
    const total = carrito.reduce((acc, p) => acc + parseFloat(p.precio), 0);

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        contenedor.innerHTML = carrito.map(p => `
            <div class="d-flex justify-content-between border-bottom py-2">
                <div><strong>${p.nombre}</strong> - $${p.precio}</div>
            </div>
        `).join('');
    }

    const totalModal = document.getElementById('modalTotal');
    if (totalModal) {
        totalModal.innerText = `Total: $${total}`;
    }
};

const init = () => {
    const localData = localStorage.getItem("baseDeDatos");
    if (localData) {
        const parsedData = JSON.parse(localData);
        loadDom(parsedData);
    } else {
        getData();
    }
    actualizarTotal();
};

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    const formAgregar = document.getElementById('formAgregarProducto');
    if (formAgregar) {
        formAgregar.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombreProducto').value;
            const precio = document.getElementById('precioProducto').value;
            const descripcion = document.getElementById('descripcionProducto').value;
            const foto = document.getElementById('fotoProducto').files[0].name;

            const nuevoProducto = new Producto(Date.now(), nombre, precio, descripcion, foto);
            agregarProducto(nuevoProducto);
        });
    }

    const menuLogout = document.getElementById('menuLogout');
    if (menuLogout) menuLogout.addEventListener('click', logout);

    const menuAgregarProducto = document.getElementById('menuAgregarProducto');
    if (menuAgregarProducto) menuAgregarProducto.addEventListener('click', mostrarAgregarProducto);

    const menuVerProductos = document.getElementById('menuVerProductos');
    if (menuVerProductos) menuVerProductos.addEventListener('click', mostrarProductos);

    const menuVerCarrito = document.getElementById('menuVerCarrito');
    if (menuVerCarrito) {
        menuVerCarrito.addEventListener('click', () => {
            window.location.href = 'carrito.html';
        });
    }

    const iconoCarrito = document.getElementById('iconoCarrito');
    if (iconoCarrito) {
        iconoCarrito.addEventListener('click', () => {
            try {
                mostrarCarritoEnModal();
                const modalElement = document.getElementById('carritoModal');
                if (!modalElement) throw new Error("No se encontró el modal del carrito.");

                const carritoModal = new bootstrap.Modal(modalElement);
                carritoModal.show();
            } catch (error) {
                console.error("Error al intentar mostrar el carrito:", error);
                Swal.fire('Error', 'No se pudo mostrar el carrito. Por favor intentá nuevamente.', 'error');
            }
        });
    }

    if (window.location.pathname.includes("carrito.html")) {
        const contenedor = document.getElementById("carritoContenido");
        const botonFinalizar = document.getElementById("finalizarCompra");

        if (contenedor && botonFinalizar) {
            mostrarCarritoEnModal();
            botonFinalizar.addEventListener("click", finalizarCompra);
        }
    }
    const botonFinalizarIndex = document.getElementById('finalizarCompra');
    if (botonFinalizarIndex && !window.location.pathname.includes("carrito.html")) {
        botonFinalizarIndex.addEventListener("click", finalizarCompra);
    }

    init();
});
