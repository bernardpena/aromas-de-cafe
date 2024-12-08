const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM productos");
    res.json(products.rows);
  } catch (err) {
    console.error("Error al obtener los productos:", err);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { activo },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).json({ message: "Error al buscar el producto" });
  }
};
