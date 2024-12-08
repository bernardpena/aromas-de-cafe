const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { register, login } = require("../controllers/authController");


router.post("/register", register);
router.post("/login", login);
router.get("/", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);

// Middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en la autenticación!");
});

module.exports = router;
