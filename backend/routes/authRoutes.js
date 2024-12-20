const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const { authenticate } = require("../middleware/authMiddleware"); // Middleware

// Ruta registrar un usuario
router.post(
    "/register",
    (req, res, next) => {
      console.log("Solicitud de registro recibida");
      next();
    },
    authController.register
  );
  
  // Ruta sesión
  router.post("/login", authController.login);
  
  // Ruta para obtener los datos del perfil del usuario
  router.get("/profiles", authenticate, authController.getProfile);
  
  // Ruta para actualizar los datos del usuario
  router.put("/update", authenticate, authController.updateProfile);
  
  // Ruta administrador
  router.post("/add-admin", authController.addAdministrator);
  
  // Rutas para productos
  router.get("/products", authenticate, productController.getProducts);

  router.patch("/products/:id", productController.updateProduct);

module.exports = router;
