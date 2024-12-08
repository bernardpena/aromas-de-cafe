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
  const { activo } = req.body; // Cambia este nombre según lo que estés pasando en el cuerpo de la solicitud

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { activo },
      { new: true }
    ); // Asegúrate de que esto funcione correctamente
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product); // Devuelve el producto actualizado
  } catch (error) {
    console.error("Error en la actualización del producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};
