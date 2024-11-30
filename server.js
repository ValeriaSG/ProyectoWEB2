const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = './data.json';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Función para leer datos del archivo JSON
function readData() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Función para escribir datos al archivo JSON
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Obtener usuarios
app.get('/users', (req, res) => {
    const data = readData();
    res.json(data.users);
});

// Agregar un usuario
app.post('/users', (req, res) => {
    const data = readData();
    const newUser = req.body;
    newUser.id = Date.now().toString(); // Generar un ID único
    data.users.push(newUser);
    writeData(data);
    res.status(201).json(newUser);
});

// Obtener productos
app.get('/products', (req, res) => {
    const data = readData();
    res.json(data.products);
});

// Agregar un producto
app.post('/products', (req, res) => {
    const data = readData();
    const newProduct = req.body;
    newProduct.id = Date.now().toString(); // Generar un ID único
    data.products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
});

// Editar un producto
app.put('/products/:id', (req, res) => {
    const data = readData();
    const productId = req.params.id;
    const updatedProduct = req.body;

    const productIndex = data.products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        data.products[productIndex] = { ...data.products[productIndex], ...updatedProduct };
        writeData(data);
        res.json(data.products[productIndex]);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Eliminar un producto
app.delete('/products/:id', (req, res) => {
    const data = readData();
    const productId = req.params.id;
    data.products = data.products.filter(p => p.id !== productId);
    writeData(data);
    res.status(204).send();
});

// Obtener transacciones
app.get('/transactions', (req, res) => {
    const data = readData();
    res.json(data.transactions);
});

// Agregar una transacción
app.post('/transactions', (req, res) => {
    const data = readData();
    const newTransaction = req.body;
    newTransaction.id = Date.now().toString(); // Generar un ID único
    data.transactions.push(newTransaction);
    writeData(data);
    res.status(201).json(newTransaction);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
