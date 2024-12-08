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

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
      const result = await db.query("SELECT * FROM productos");
      res.json(result.rows);
  } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ message: "Error al obtener productos" });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query("SELECT * FROM productos WHERE id = $1", [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(result.rows[0]);
  } catch (error) {
      console.error("Error al buscar el producto:", error);
      res.status(500).json({ message: "Error al buscar el producto" });
  }
});

router.patch("/products/:id", productController.updateProduct);

module.exports = router;
