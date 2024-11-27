const usersDb = {}; // Base de datos de usuarios (en realidad debería ser un JSON o base de datos real).
const products = [
    { id: 1, name: 'Boston Red Sox', price: 999, stock: 10, 
      images:[ 'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_3QR.png?v=1698727230',
                    'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_F.png?v=1698727230',
                    'https://www.newera.mx/cdn/shop/files/60493768_59FIFTY_LIFESTYLEENERGY_BOSRED_OTC_3QL.png?v=1698727230' ]}, 
    { id: 2, name: 'Boston Red Sox', price: 1099, stock: 10, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_3QR.jpg?v=1728863538',
                    'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_F.jpg?v=1728863538',
                    'https://www.newera.mx/cdn/shop/files/60598076_59FIFTY_LifestyleEnergy_BOSRED_WLT_3QL.jpg?v=1728863538' ]},
    { id: 3, name: 'Boston Red Sox', price: 999, stock: 10, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_3QR.png?v=1688688139',
                    'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_F.png?v=1688688139',
                    'https://www.newera.mx/cdn/shop/files/60417788_59FIFTY_TEAMSHIMMER_BOSRED_OTC_3QL.png?v=1688688139'] },
    { id: 4, name: 'Chicago White Sox', price: 799, stock: 10, 
        images:[ 'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_3QR.jpg?v=1729929326',
                    'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_F.jpg?v=1729929325',
                    'https://www.newera.mx/cdn/shop/files/14391622_59FIFTY_MLB_PIN_STRIPE_CHIWHI_BLK_3QL.jpg?v=1729929325'] },
    { id: 5, name: 'Chicago White Sox', price: 999, stock: 10, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_3QR.png?v=1693959208',
                    'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_F.png?v=1693959208',
                    'https://www.newera.mx/cdn/shop/files/60426585_59FIFTY_CITYICON_CHIWHI_CHW_3QL.png?v=1693959208'] },
    { id: 6, name: 'Chicago White Sox', price: 999, stock: 10, 
        images:[ 'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_3QR.png?v=1709059965',
                    'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_F.png?v=1709059965',
                    'https://www.newera.mx/cdn/shop/files/60504355_59FIFTY_COLORBRUSH_CHIWHI_STN_3QL.png?v=1709059965'] },
    { id: 7, name: 'Angeles Angels', price: 1099, stock: 10, 
        images: ['https://www.newera.mx/cdn/shop/files/60655838_59FIFTY_MLB_ANGANG_BLK_3QR.jpg?v=1731904617',
                    'https://www.newera.mx/cdn/shop/files/60655838_59FIFTY_MLB_ANGANG_BLK_F.jpg?v=1731904617',
                    'https://www.newera.mx/cdn/shop/files/60655838_59FIFTY_MLB_ANGANG_BLK_3QL.jpg?v=1731904617']},
    { id: 8, name: 'Angeles Angels', price: 999, stock: 10, 
        images:['https://www.newera.mx/cdn/shop/products/9286963658782.jpg?v=1667131910,',
                    'https://www.newera.mx/cdn/shop/products/9286963396638.jpg?v=1667131910',
                    'https://www.newera.mx/cdn/shop/products/9286963396638.jpg?v=1667131910']},
    { id: 9, name: 'All Over', price: 1199, stock: 10, 
        images:['https://www.newera.mx/cdn/shop/products/unnamed_bfcbf634-4bf8-4c90-b14e-531bb0d10e0b.jpg?v=1667109597',
                    'https://www.newera.mx/cdn/shop/products/unnamed_85f1b3de-8666-43a0-a557-89b9c4e2cc7e.jpg?v=1667109595',
                    'https://www.newera.mx/cdn/shop/products/unnamed_ca4ff562-df87-4ab8-9dda-a5f0e61ddf81.jpg?v=1667109593']},
        
    { id: 10, name: 'Angeles Dodgers', price: 999, stock: 10, 
        images:['https://www.newera.mx/cdn/shop/files/60366947_59FIFTY_M5950NEONE3_LOSDOD_BLK_3QR.png?v=1692683736',
                    'https://www.newera.mx/cdn/shop/files/60366947_59FIFTY_M5950NEONE3_LOSDOD_BLK_F.png?v=1692725663',
                    'https://www.newera.mx/cdn/shop/files/60366947_59FIFTY_M5950NEONE3_LOSDOD_BLK_3QL.png?v=1692725663']},
    { id: 11, name: 'New York Yankees', price: 999, stock: 10, 
        images:['https://www.newera.mx/cdn/shop/products/11591125_59FIFTY_MLBBASICFITTED_NEYYAN_GRA_3QR.png?v=1688498128',
                    'https://www.newera.mx/cdn/shop/products/11591125_59FIFTY_MLBBASICFITTED_NEYYAN_GRA_F.png?v=1688498128',
                    'https://www.newera.mx/cdn/shop/products/11591125_59FIFTY_MLBBASICFITTED_NEYYAN_GRA_3QL.png?v=1688498128',]},
    { id: 8, name: 'New York Yankees', price: 999, stock: 10, 
        images:['https://www.newera.mx/cdn/shop/files/60358061_2.png?v=1704412507',
                    'https://www.newera.mx/cdn/shop/files/60358061_1.png?v=1704412507',
                    'https://www.newera.mx/cdn/shop/files/60358061_3QL.png?v=1704412507'] },
    
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

function displayProducts() {
    productsDiv.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Mostrar detalles del producto
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock disponible: ${product.stock}</p>
        `;

        // Crear el carrusel
        const carouselDiv = document.createElement('div');
        carouselDiv.classList.add('carousel');
        
        // Crear una imagen inicial
        const imgElement = document.createElement('img');
        imgElement.src = product.images[0];
        imgElement.alt = `${product.name} - Imagen principal`;
        carouselDiv.appendChild(imgElement);

        // Crear botones de navegación del carrusel
        const prevButton = document.createElement('button');
        prevButton.classList.add('carousel-button');
        prevButton.textContent = '<';
        prevButton.onclick = () => navigateCarousel(product.images, imgElement, -1);

        const nextButton = document.createElement('button');
        nextButton.classList.add('carousel-button');
        nextButton.textContent = '>';
        nextButton.onclick = () => navigateCarousel(product.images, imgElement, 1);

        // Agregar botones al carrusel
        carouselDiv.appendChild(prevButton);
        carouselDiv.appendChild(nextButton);

        productDiv.appendChild(carouselDiv);

        // Botón para añadir al carrito
        const addButton = document.createElement('button');
        addButton.textContent = 'Añadir al carrito';
        addButton.disabled = product.stock === 0; // Deshabilitar si no hay stock
        addButton.onclick = () => addToCart(product.id);
        productDiv.appendChild(addButton);

        productsDiv.appendChild(productDiv);
    });
}

// Función para manejar la navegación del carrusel
function navigateCarousel(images, imgElement, direction) {
    const currentIndex = images.indexOf(imgElement.src);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    imgElement.src = images[newIndex];
}

function addToCart(productId) {
    if (!currentUser) {
        alert('¡Debes iniciar sesión para agregar productos al carrito!');
        return;
    }


    //----------------------Esto nos da nuestro stock de la tienda--------------------
    // Buscar el producto en la lista original
    const product = products.find(p => p.id === productId);

    // Verificar si hay stock disponible
    if (product.stock > 0) {
        // Reducir el stock en la lista original
        product.stock--;

        // Agregar al carrito (opcionalmente, puedes clonar el objeto si no deseas modificar el original)
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock // Guardar el stock actualizado en el carrito (si lo deseas)
        });

        updateCart();
        displayProducts(); // Actualizar la vista de los productos para reflejar el stock restante
        alert(`${product.name} añadido al carrito. Stock restante: ${product.stock}`);
    } else {
        alert(`Lo sentimos, el producto "${product.name}" está agotado.`);
    }
}


function updateCart() {
    cartItemsList.innerHTML = ''; // Limpiar la lista del carrito

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>El carrito está vacío</p>';
        checkoutButton.style.display = 'none';
        return;
    }

    cart.forEach((product, index) => {
        const listItem = document.createElement('li');

        // Mostrar detalles del producto
        listItem.textContent = `${product.name} - $${product.price}`;

        // Botón para eliminar el producto del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(index);
        listItem.appendChild(removeButton);

        cartItemsList.appendChild(listItem);
    });

    checkoutButton.style.display = 'block'; // Mostrar el botón de compra
}


function removeFromCart(index) {
    const productInCart = cart[index];
    const originalProduct = products.find(p => p.id === productInCart.id);

    // Incrementar el stock en la lista original
    originalProduct.stock++;

    // Eliminar el producto del carrito
    cart.splice(index, 1);
    updateCart();
    displayProducts(); // Reflejar el stock actualizado
}

//----------Esto controla el inicio de sesión del comprador----------------
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

        // Ocultar el botón de inicio de sesión
        document.getElementById('login-button').style.display = 'none';
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

    // Mostrar el botón de inicio de sesión nuevamente
    document.getElementById('login-button').style.display = 'block';
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

//---------------Parte del inicio de sesión del vendedor-----------------

// Base de datos de vendedores con datos fijos
const sellerUsersDb = {
    "admin@example.com": { password: "admin123", name: "Admin" }
};
let isSeller = false; // Estado para determinar si es un vendedor

const sellerAuthDiv = document.getElementById('seller-auth');
const adminPanel = document.getElementById('admin-panel');
const addProductForm = document.getElementById('add-product-form');
const productListDiv = document.getElementById('product-list');

// Elementos que se ocultarán al iniciar sesión como vendedor
const loginButton = document.getElementById('login-button');
const userAuthDiv = document.getElementById('auth');
const cartDiv = document.getElementById('cart');
const logoutButon = document.getElementById('logout-button'); // Botón de cerrar sesión

// Manejar el inicio de sesión del vendedor
document.getElementById('seller-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('seller-login-email').value;
    const password = document.getElementById('seller-login-password').value;

    const seller = sellerUsersDb[email];
    if (seller && seller.password === password) {
        isSeller = true;
        alert(`Bienvenido, ${seller.name}`);
        
        // Ocultar elementos no relevantes para el vendedor
        sellerAuthDiv.style.display = 'none';
        loginButton.style.display = 'none';
        userAuthDiv.style.display = 'none';
        cartDiv.style.display = 'none';

        // Mostrar elementos del vendedor
        adminPanel.style.display = 'block';
        logoutButton.style.display = 'block'; // Mostrar botón de cerrar sesión

        displayAdminProducts();
    } else {
        alert('Correo o contraseña incorrectos para vendedor.');
    }
});

// Manejar el cierre de sesión del vendedor
logoutButton.addEventListener('click', () => {
    isSeller = false;
    alert('Sesión cerrada correctamente.');

    // Recargar la página para restablecer el estado inicial
    window.location.reload();
});

// Mostrar productos en el panel de administración
function displayAdminProducts() {
    productListDiv.innerHTML = '';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('admin-product');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock: ${product.stock}</p>
            <button onclick="deleteProduct(${index})">Eliminar</button>
            <button onclick="editProduct(${index})">Editar</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

// Agregar un producto
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const images = document.getElementById('product-images').value.split(',');

    const newProduct = { id: products.length + 1, name, price, stock, images };
    products.push(newProduct);
    alert('Producto agregado con éxito.');
    displayAdminProducts();
    displayProducts();
});

// Eliminar un producto
function deleteProduct(index) {
    products.splice(index, 1);
    alert('Producto eliminado.');
    displayAdminProducts();
    displayProducts();
}

// Editar un producto
function editProduct(index) {
    const product = products[index];
    const name = prompt('Nombre del producto:', product.name) || product.name;
    const price = parseFloat(prompt('Precio:', product.price)) || product.price;
    const stock = parseInt(prompt('Stock:', product.stock)) || product.stock;
    const images = prompt('URLs de imágenes (separadas por comas):', product.images.join(',')) || product.images;

    products[index] = { ...product, name, price, stock, images: images.split(',') };
    alert('Producto modificado con éxito.');
    displayAdminProducts();
    displayProducts();
}
