const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Ruta para obtener los productos
router.get("/cart/:userId", cartController.getCartItems);

// Ruta para agregar un producto
router.post("/cart/:userId", cartController.addToCart);

// Ruta para eliminar
router.delete("/cart/:userId/:producto_id", cartController.removeFromCart);

// Ruta para guardar
router.post("/cart", cartController.saveCart);

module.exports = router;
