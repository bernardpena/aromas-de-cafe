// const pool = require("../config/db");

// exports.getProducts = async (req, res) => {
//   try {
//   const { activo } = req.body;

//   try {
//     const result = await pool.query( // Cambiado de db a pool
//       "UPDATE productos SET activo = $1 WHERE id = $2 RETURNING *",
//       [activo, id]
//     );

//   const { id } = req.params;

//   try {
//     const result = await pool.query("SELECT * FROM productos WHERE id = $1", [id]); // Corrección aquí
//     const product = result.rows[0];
//     if (!product) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.status(500).json({ message: "Error al buscar el producto" });
//   }
// };


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
    const result = await db.query(
      "UPDATE productos SET activo = $1 WHERE id = $2 RETURNING *",
      [activo, id]
    );

    const product = result.rows[0];

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