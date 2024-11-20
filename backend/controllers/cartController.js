const pool = require("../config/db");

// Obtener productos
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT carrito.id, productos.nombre, carrito.cantidad
      FROM carrito
      JOIN productos ON carrito.producto_id = productos.id
      WHERE carrito.usuario_id = $1
    `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al obtener los productos del carrito" });
  }
};

// Añadir producto
exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { producto_id, cantidad } = req.body;

  try {
    const productCheck = await pool.query(
      "SELECT * FROM productos WHERE id = $1",
      [producto_id]
    );
    if (productCheck.rows.length === 0) {
      return res.status(400).json({ error: "El producto no existe" });
    }

    const existingItem = await pool.query(
      "SELECT * FROM carrito WHERE usuario_id = $1 AND producto_id = $2",
      [userId, producto_id]
    );
    if (existingItem.rows.length > 0) {
      await pool.query(
        "UPDATE carrito SET cantidad = cantidad + $1 WHERE usuario_id = $2 AND producto_id = $3",
        [cantidad, userId, producto_id]
      );
    } else {
      await pool.query(
        "INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES ($1, $2, $3)",
        [userId, producto_id, cantidad]
      );
    }
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al añadir producto al carrito" });
  }
};

// Guardar el carrito
exports.saveCart = async (req, res) => {
  const { usuario_id, items } = req.body;

  if (!usuario_id || !items || items.length === 0) {
    return res.status(400).json({ error: "usuario_id y items son requeridos." });
  }

  try {
    // Evitar duplicados
    await pool.query("DELETE FROM carrito WHERE usuario_id = $1", [usuario_id]);

    // Insertar nuevos ítems
    for (const item of items) {
      const { producto_id, cantidad, email, descripcion, imagen, nombre } = item;

      // Verificar valores
      if (!producto_id || !cantidad || !email) { 
        console.error('Error: item falta campos', { item });
        continue; 
      }

      await pool.query(
        "INSERT INTO carrito (usuario_id, producto_id, cantidad, email, descripcion, imagen, nombre) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [usuario_id, producto_id, cantidad, email, descripcion, imagen, nombre]
      );
    }

    res.status(201).json({ message: "Carrito guardado exitosamente" });
  } catch (err) {
    console.error("Error al guardar el carrito:", err);
    res.status(500).json({ error: "Error al guardar el carrito" });
  }
};

// Eliminar producto
exports.removeFromCart = async (req, res) => {
  const { userId, producto_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2",
      [userId, producto_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
  }
};
