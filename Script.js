const usersDb = {}; // Base de datos de usuarios (en realidad debería ser un JSON o base de datos real).
const products = [
    { id: 1, name: 'Boston Red Sox', price: 999, 
      images:[ 'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_3QR.png?v=1698727230',
             'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_F.png?v=1698727230',
              'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_3QL.png?v=1698727230' ]}, 
    { id: 2, name: 'Boston Red Sox', price: 1099, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_3QR.jpg?v=1728863538',
                  'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_F.jpg?v=1728863538',
                  'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_3QL.jpg?v=1728863538' ]},
    { id: 3, name: 'Boston Red Sox', price: 999, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_3QR.png?v=1688688139',
                  'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_F.png?v=1688688139',
                  'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_3QL.png?v=1688688139'] },
    { id: 4, name: 'Chicago White Sox', price: 799, 
        images:[ 'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_3QR.jpg?v=1729929326',
                'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_F.jpg?v=1729929325',
                 'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_3QL.jpg?v=1729929325'] },
    { id: 5, name: 'Chicago White Sox', price: 999, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_3QR.png?v=1693959208',
                 'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_F.png?v=1693959208',
                 'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_3QL.png?v=1693959208'] },
    { id: 6, name: 'Chicago White Sox', price: 998, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_3QR.png?v=1709059965',
                 'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_F.png?v=1709059965',
                 'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_3QL.png?v=1709059965'] },
    { id: 7, name: 'Pittsburgh Pirates', price: 899, image: 'https://www.newera.mx/cdn/shop/files/60426577_59FIFTY_HARVEST59FIFTY_PITPIRCO_TIR_3QR.png?v=1693874600' },
    { id: 8, name: 'Producto 8', price: 0,  },
    { id: 7, name: 'Producto 7', price: 70 },
    { id: 8, name: 'Producto 8', price: 0 },
    { id: 7, name: 'Producto 7', price: 70 },
    { id: 8, name: 'Producto 8', price: 0 },
    { id: 7, name: 'Producto 7', price: 70 },
    { id: 8, name: 'Producto 8', price: 0 },
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

/* Función para mostrar los productos
function displayProducts() {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 150px; height: 150px; object-fit: cover;">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
        productsDiv.appendChild(productDiv);
    });
}
*/

function displayProducts() {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        // Crear el carrousel para las imágenes del producto
        const carouselDiv = document.createElement('div');
        carouselDiv.classList.add('carousel');

        // Mostrar las imágenes del carrousel
        let currentImageIndex = 0;
        const imgElement = document.createElement('img');
        imgElement.src = product.images[currentImageIndex];
        imgElement.alt = `${product.name} - Imagen principal`;
        carouselDiv.appendChild(imgElement);

        // Botón de retroceder
        const prevButton = document.createElement('button');
        prevButton.textContent = '←';
        prevButton.classList.add('carousel-button');
        prevButton.onclick = () => {
            currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
            imgElement.src = product.images[currentImageIndex];
        };
        carouselDiv.appendChild(prevButton);

        // Botón de avanzar
        const nextButton = document.createElement('button');
        nextButton.textContent = '→';
        nextButton.classList.add('carousel-button');
        nextButton.onclick = () => {
            currentImageIndex = (currentImageIndex + 1) % product.images.length;
            imgElement.src = product.images[currentImageIndex];
        };
        carouselDiv.appendChild(nextButton);

        // Agregar el carrousel al producto
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
        `;
        productDiv.appendChild(carouselDiv);

        // Botón para añadir al carrito
        const addButton = document.createElement('button');
        addButton.textContent = 'Añadir al carrito';
        addButton.onclick = () => addToCart(product.id);
        productDiv.appendChild(addButton);

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


document.addEventListener('DOMContentLoaded', () => {
    const authDiv = document.getElementById('auth');
    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', () => {
        const offsetTop = authDiv.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});
