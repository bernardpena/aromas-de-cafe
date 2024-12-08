const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { register, login } = require("../controllers/authController");


router.post("/register", register);
router.post("/login", login);
router.get("/", productController.getProducts);
router.get("/products/:id", async (req, res) => {
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

router.get("/:id", productController.getProductById);
router.patch("/:id", productController.updateProduct);

// Middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en la autenticación!");
});

module.exports = router;
