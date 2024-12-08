const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const salesRoutes = require("./routes/salesRoutes");
require("dotenv").config();
const db = require("./config/db");
// const path = require("path");

const app = express();
app.use(express.json());

//modificaciones para conectarse con el frontend
app.use(
  cors({
    origin: "https://aromas-de-cafe.onrender.com",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/profiles", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api", cartRoutes);
app.use("/api/sales", salesRoutes);

// Middleware de errores internos
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

db.query('SELECT NOW()', [])
  .then(res => {
    console.log("Base de datos conectada y consulta inicial exitosa:", res.rows);
  })
  .catch(err => {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  });

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
