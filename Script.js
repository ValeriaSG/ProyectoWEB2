const usersDb = {}; // Base de datos de usuarios (en realidad debería ser un JSON o base de datos real).
const products = [
    { id: 1, name: 'Producto 1', price: 10 },
    { id: 2, name: 'Producto 2', price: 20 },
    { id: 3, name: 'Producto 3', price: 30 },
    { id: 4, name: 'Producto 4', price: 40 },
];
let currentUser = null;
let cart = [];

const productsDiv = document.getElementById('products');
const cartItemsList = document.getElementById('cart-items');
const userNameSpan = document.getElementById('user-name');
const logoutButton = document.getElementById('logout-button');
const checkoutButton = document.getElementById('checkout-button');
const authDiv = document.getElementById('auth');
const authTitle = document.getElementById('auth-title');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleAuthButton = document.getElementById('toggle-auth');

// Función para mostrar los productos
function displayProducts() {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}

// Función para agregar al carrito
function addToCart(productId) {
    if (!currentUser) {
        alert('¡Debes iniciar sesión para agregar productos al carrito!');
        return;
    }
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    cartItemsList.innerHTML = '';
    cart.forEach(product => {
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - $${product.price}`;
        cartItemsList.appendChild(listItem);
    });
    checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
}

// Función para manejar el registro de usuarios
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (usersDb[email]) {
        alert('Este correo ya está registrado.');
        return;
    }

    usersDb[email] = { name, lastname, email, password };
    alert('Cuenta creada con éxito!');
    toggleAuth(); // Volver al login
});

// Función para manejar el inicio de sesión
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = usersDb[email];
    if (user && user.password === password) {
        currentUser = user;
        userNameSpan.textContent = `Hola, ${user.name}`;
        logoutButton.style.display = 'block';
        authDiv.style.display = 'none';
        displayProducts();
        updateCart();
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

// Función para cerrar sesión
logoutButton.addEventListener('click', () => {
    currentUser = null;
    userNameSpan.textContent = '';
    logoutButton.style.display = 'none';
    authDiv.style.display = 'block';
    displayProducts();
});

// Función para alternar entre formulario de login y signup
function toggleAuth() {
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    authTitle.textContent = authTitle.textContent === 'Iniciar sesión' ? 'Registrarse' : 'Iniciar sesión';
    toggleAuthButton.textContent = toggleAuthButton.textContent === '¿No tienes cuenta? Regístrate' ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate';
}

// Mostrar productos al cargar la página
window.onload = () => {
    displayProducts();
};
