const express = require("express");
const router = express.Router();
const productsRoutes = require("../controllers/productController");

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/", productsController.getProducts);

// Middleware de manejo de errores (opcional)
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en la autenticación!");
});

module.exports = router;
