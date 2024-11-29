const usersDb = {}; // Base de datos de usuarios (en realidad debería ser un JSON o base de datos real).

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
// Función para obtener todos los usuarios desde el servidor JSON
async function fetchUsers() {
    try {
        console.log("Obteniendo usuarios desde JSON Server...");
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error(`Error al obtener usuarios: ${response.statusText}`);
        }
        const users = await response.json();
        console.log("Usuarios obtenidos:", users); // Debug
        return users;
    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        return [];
    }
}

// Función para guardar un nuevo usuario en el servidor JSON
async function saveUser(newUser) {
    try {
        console.log("Intentando guardar usuario en JSON Server:", newUser); // Debug
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar usuario: ${response.statusText}`);
        }

        console.log("Usuario guardado exitosamente en JSON Server.");
    } catch (error) {
        console.error("Error en la solicitud POST:", error);
        alert("No se pudo registrar el usuario. Intenta más tarde.");
    }
}

// Función para manejar el registro de usuarios
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Iniciando proceso de registro..."); // Debug

    const name = document.getElementById('signup-name').value;
    const lastname = document.getElementById('signup-lastname').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Validación básica de campos
    if (!name || !lastname || !email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Verificar si el usuario ya existe
    const users = await fetchUsers();
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert("Este correo ya está registrado.");
        return;
    }

    // Crear y guardar el nuevo usuario
    const newUser = { name, lastname, email, password };
    await saveUser(newUser);

    alert("Cuenta creada con éxito!");
    toggleAuth(); // Cambiar al formulario de inicio de sesión
});


// Función para manejar el inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Procesando inicio de sesión..."); // Debug

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = await fetchUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        currentUser = user;
        userNameSpan.textContent = `Hola, ${user.name}`;
        logoutButton.style.display = 'block';
        authDiv.style.display = 'none';
        displayProducts();
        updateCart();

        // Ocultar el botón de inicio de sesión y el formulario del vendedor
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('seller-auth').style.display = 'none';
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

// Obtener productos desde localStorage o inicializar una lista vacía
let products = JSON.parse(localStorage.getItem('products')) || [];

// Guardar productos en localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

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

// Función para agregar producto al servidor JSON y actualizar la interfaz
async function addProduct(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const images = document.getElementById('product-images').value.split(',');

    // Validación básica de campos
    if (!name || isNaN(price) || isNaN(stock) || images.length === 0) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Crear objeto de producto
    const newProduct = {
        id: Date.now(), // Generar un ID único basado en la marca de tiempo
        name,
        price,
        stock,
        images,
    };

    try {
        // Guardar el producto en el servidor JSON
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar producto: ${response.statusText}`);
        }

        // Mensaje de éxito
        alert('Producto agregado con éxito.');

        // Actualizar la lista de productos localmente
        products.push(newProduct);
        saveProductsToLocalStorage();
        displayProducts(); // Actualizar productos visibles para compradores
        displayAdminProducts(); // Actualizar lista en el panel de administración
        addProductForm.reset(); // Limpiar el formulario
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert('Hubo un problema al agregar el producto. Inténtalo de nuevo.');
    }
}

// Vincular la función al botón "Agregar Producto"
addProductForm.addEventListener('submit', addProduct);

// Función para mostrar productos en la página principal (compradores)
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Limpiar lista existente

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock disponible: ${product.stock}</p>
            <img src="${product.images[0]}" alt="${product.name}" style="max-width: 100%; height: auto; border-radius: 8px;">
        `;

        // Crear el botón de "Añadir al carrito"
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Añadir al carrito';
        addToCartButton.onclick = () => addToCart(product.id); // Vincular con la función addToCart
        productDiv.appendChild(addToCartButton);

        productsContainer.appendChild(productDiv);
    });
}


// Función para cargar productos desde el servidor JSON al inicio
async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`Error al obtener productos: ${response.statusText}`);
        }

        products = await response.json();
        saveProductsToLocalStorage(); // Actualizar localStorage
        displayProducts(); // Mostrar productos en la página principal
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Llamar a `loadProducts` cuando cargue la página
window.onload = () => {
    loadProducts();
};

//-----------------------------CARRITO-LOCALSTORAGE--------------------------
// Función para cargar el carrito de un usuario
function loadCart() {
    if (!currentUser) return;
    const savedCart = localStorage.getItem(`cart_${currentUser.email}`);
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCart(); // Actualizar la interfaz del carrito
}

// Función para guardar el carrito en localStorage
function saveCart() {
    if (!currentUser) return;
    localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(cart));
}


// Modificar la función `addToCart` para guardar el carrito
function addToCart(productId) {
    if (!currentUser) {
        alert('¡Debes iniciar sesión para agregar productos al carrito!');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product.stock > 0) {
        product.stock--;
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
        });
        saveCart(); // Guardar el carrito actualizado
        updateCart(); // Actualizar la interfaz del carrito
        displayProducts(); // Refrescar la lista de productos con el stock actualizado
        alert(`${product.name} añadido al carrito.`);
    } else {
        alert(`Lo sentimos, el producto "${product.name}" está agotado.`);
    }
}


// Modificar la función `removeFromCart` para guardar el carrito
function removeFromCart(index) {
    const productInCart = cart[index];
    const originalProduct = products.find(p => p.id === productInCart.id);

    originalProduct.stock++;
    cart.splice(index, 1);
    saveCart(); // Guardar el carrito actualizado
    updateCart();
    displayProducts();
}

// Modificar el manejo del inicio de sesión para cargar el carrito
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = await fetchUsers();
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        currentUser = user;
        userNameSpan.textContent = `Hola, ${user.name}`;
        logoutButton.style.display = 'block';
        authDiv.style.display = 'none';
        displayProducts();
        loadCart(); // Cargar el carrito del usuario
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('seller-auth').style.display = 'none';
    } else {
        alert('Correo o contraseña incorrectos');
    }
});

// Modificar el manejo del cierre de sesión para limpiar el carrito
logoutButton.addEventListener('click', () => {
    currentUser = null;
    cart = [];
    updateCart();
    localStorage.removeItem('cart'); // Limpiar el carrito temporal
    userNameSpan.textContent = '';
    logoutButton.style.display = 'none';
    authDiv.style.display = 'block';
    displayProducts();
    document.getElementById('login-button').style.display = 'block';
});
// ---------------- JSON para poder finalizar compra con el boton ----------------
// Función para finalizar la compra
async function finalizePurchase() {
    if (!currentUser) {
        alert('Debes iniciar sesión para finalizar la compra.');
        return;
    }

    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    // Crear el movimiento de transacción
    const transaction = {
        user: currentUser.name,
        email: currentUser.email,
        products: cart,
        date: new Date().toISOString(),
    };

    try {
        // Guardar la transacción en el servidor JSON
        const response = await fetch('http://localhost:3000/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar transacción: ${response.statusText}`);
        }

        // Mensaje de éxito
        alert('Movimiento exitoso: Tu compra ha sido registrada.');

        // Limpiar el carrito
        cart = [];
        saveCart();
        updateCart();
    } catch (error) {
        console.error('Error al registrar la transacción:', error);
        alert('Ocurrió un error al finalizar tu compra. Inténtalo de nuevo.');
    }
}

// Escuchar el evento de clic en el botón "Finalizar compra"
document.getElementById('checkout-button').addEventListener('click', finalizePurchase);

// Función para cargar las transacciones en el panel del vendedor
async function loadTransactions() {
    if (!isSeller) return;

    try {
        const response = await fetch('http://localhost:3000/transactions');
        if (!response.ok) {
            throw new Error(`Error al obtener transacciones: ${response.statusText}`);
        }

        const transactions = await response.json();
        const transactionListDiv = document.getElementById('transaction-list');
        transactionListDiv.innerHTML = ''; // Limpiar la lista

        // Mostrar transacciones
        transactions.forEach(transaction => {
            const transactionDiv = document.createElement('div');
            transactionDiv.classList.add('transaction-item');
            transactionDiv.innerHTML = `
                <h4>Transacción de ${transaction.user} (${transaction.email})</h4>
                <p>Fecha: ${new Date(transaction.date).toLocaleString()}</p>
                <ul>
                    ${transaction.products.map(product => `
                        <li>${product.name} - $${product.price}</li>
                    `).join('')}
                </ul>
            `;
            transactionListDiv.appendChild(transactionDiv);
        });
    } catch (error) {
        console.error('Error al cargar transacciones:', error);
    }
}

// Llama a `loadTransactions` cuando el vendedor inicia sesión
document.getElementById('seller-login-form').addEventListener('submit', (e) => {
    // Después de la autenticación exitosa del vendedor
    loadTransactions();
});

//----------Se ocultan elementos y se muestran otros para el vendedor-----
// Mostrar el contenedor de transacciones al iniciar sesión como vendedor
document.getElementById('seller-login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('seller-login-email').value;
    const password = document.getElementById('seller-login-password').value;

    const seller = sellerUsersDb[email];
    if (seller && seller.password === password) {
        isSeller = true;
        alert(`Bienvenido, ${seller.name}`);

        // Mostrar el panel de administración y las transacciones
        sellerAuthDiv.style.display = 'none';
        loginButton.style.display = 'none';
        userAuthDiv.style.display = 'none';
        cartDiv.style.display = 'none';

        adminPanel.style.display = 'block';
        logoutButton.style.display = 'block';
        document.getElementById('transaction-list').style.display = 'block'; // Mostrar transacciones

        displayAdminProducts();
        loadTransactions(); // Cargar las transacciones
    } else {
        alert('Correo o contraseña incorrectos para vendedor.');
    }
});

// Ocultar el contenedor de transacciones al cerrar sesión como vendedor
logoutButton.addEventListener('click', () => {
    isSeller = false;
    alert('Sesión cerrada correctamente.');

    // Ocultar el panel de administración y las transacciones
    adminPanel.style.display = 'none';
    document.getElementById('transaction-list').style.display = 'none'; // Ocultar transacciones

    // Recargar la página para restablecer el estado inicial
    window.location.reload();
});
//----------------------------ELIMINAR Y EDITAR-----------------------------------
// Función para manejar la eliminación de productos

// Guardar productos en localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}
// Mostrar productos en el panel de administración
function displayAdminProducts() {
    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = ''; // Limpiar productos existentes

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('admin-product');
        
        // Mostrar nombre, precio, stock y la imagen del producto
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock disponible: ${product.stock}</p>
            <img src="${product.images[0]}" alt="${product.name}" style="width: 150px; height: auto; border-radius: 8px;">
            <div class="button-container">
                <button onclick="deleteProduct(${index})">Eliminar</button>
                <button onclick="editProduct(${index})">Editar</button>
            </div>
        `;
        productListDiv.appendChild(productDiv);
    });
}


// Eliminar un producto
function deleteProduct(index) {
    // Eliminar el producto del array
    products.splice(index, 1);

    // Guardar la nueva lista en localStorage
    saveProductsToLocalStorage();
    displayAdminProducts(); // Volver a mostrar la lista actualizada
}
// Editar un producto
function editProduct(index) {
    const product = products[index]; // Obtener el producto

    // Solicitar nuevos valores al usuario
    const newName = prompt('Nuevo nombre del producto:', product.name) || product.name;
    const newPrice = parseFloat(prompt('Nuevo precio del producto:', product.price)) || product.price;
    const newStock = parseInt(prompt('Nuevo stock del producto:', product.stock)) || product.stock;

    // Crear el nuevo producto actualizado
    const updatedProduct = { ...product, name: newName, price: newPrice, stock: newStock };

    // Actualizar el producto en la lista
    products[index] = updatedProduct;

    // Guardar la lista de productos actualizada en localStorage
    saveProductsToLocalStorage();
    displayAdminProducts(); // Volver a mostrar la lista actualizada
}
// Función para agregar producto
function addProduct(e) {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    const images = document.getElementById('product-images').value.split(',');

    // Crear el nuevo producto
    const newProduct = {
        id: Date.now(), // Crear un ID único
        name,
        price,
        stock,
        images,
    };

    // Agregar el producto a la lista de productos
    products.push(newProduct);

    // Guardar los productos en localStorage
    saveProductsToLocalStorage();

    // Actualizar la vista de productos
    displayAdminProducts();
    alert('Producto agregado con éxito.');
}
// Función para mostrar productos en la página principal (compradores)
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Limpiar lista existente

    // Iterar sobre los productos
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        
        // Mostrar el nombre, precio, stock y la primera imagen
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
            <p>Stock disponible: ${product.stock}</p>
            <img src="${product.images[0]}" alt="${product.name}" style="max-width: 100%; height: auto; border-radius: 8px;">
        `;

        // Crear el botón de "Añadir al carrito"
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Añadir al carrito';
        addToCartButton.onclick = () => addToCart(product.id);
        productDiv.appendChild(addToCartButton);

        productsContainer.appendChild(productDiv);
    });
}
// Cargar los productos desde localStorage al cargar la página
window.onload = function() {
    displayAdminProducts(); // Mostrar los productos del panel de administración
    displayProducts(); // Mostrar productos en la página principal (compradores)
};