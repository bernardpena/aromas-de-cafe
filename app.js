<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());
// app.use('/api/cart', cartRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
=======
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const db = require("./config/db");

const app = express();
app.use(express.json());

// Middleware
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
>>>>>>> 28acc8e702435464962e13cc330d00be9c71a55d

// Connect to the database
db.connect();

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
