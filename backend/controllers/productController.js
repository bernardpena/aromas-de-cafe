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
  const { activo } = req.body; // Por ejemplo, el campo que se está actualizando

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { activo },
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};
