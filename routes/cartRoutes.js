

// backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// router.delete('/:userId/:productId', cartController.removeFromCart);
router.delete('/api/cart/:userId/:producto_id', cartController.removeFromCart);

// Ruta para obtener los productos del carrito del usuario
router.get('/:userId', cartController.getCartItems);

// Ruta para agregar un producto al carrito
router.post('/:userId', cartController.addToCart);

module.exports = router;

