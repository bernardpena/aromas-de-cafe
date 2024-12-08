const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { register, login } = require("../controllers/authController");
// const path = require("path");

router.post("/register", register);
router.post("/login", login);

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
    console.log("ID recibido en el backend:", id);
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

// Actualizar un producto por ID
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;
    console.log("ID recibido en el backend:", id);
  
    try {
        const result = await db.query(
            "UPDATE productos SET activo = $1 WHERE id = $2 RETURNING *",
            [activo, id]
        );
  
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
  
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
  });

// Middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en la autenticación!");
});

module.exports = router;
