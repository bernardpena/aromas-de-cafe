
const pool = require('../config/db');

// Obtener productos del carrito
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query(`
    SELECT carrito.id, productos.nombre, carrito.cantidad
    FROM carrito
    JOIN productos ON carrito.producto_id = productos.id
    WHERE carrito.usuario_id = $1
  `, [userId]);

  res.json(result.rows);
};

// Añadir producto al carrito
exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { producto_id, cantidad } = req.body;

  // Verificar si el producto existe en la tabla productos
  const productCheck = await pool.query('SELECT * FROM productos WHERE id = $1', [producto_id]);
  if (productCheck.rows.length === 0) {
    return res.status(400).json({ error: 'El producto no existe' });
  }

  // Verificar si el producto ya está en el carrito
  const existingItem = await pool.query('SELECT * FROM carrito WHERE usuario_id = $1 AND producto_id = $2', [userId, producto_id]);
  if (existingItem.rows.length > 0) {
    // Si existe, actualizar la cantidad
    await pool.query('UPDATE carrito SET cantidad = cantidad + $1 WHERE usuario_id = $2 AND producto_id = $3', [cantidad, userId, producto_id]);
  } else {
    // Si no existe, agregar el nuevo producto
    await pool.query('INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES ($1, $2, $3)', [userId, producto_id, cantidad]);
  }
  res.sendStatus(201);
};

exports.removeFromCart = async (req, res) => {
  const { userId, producto_id } = req.params;

  try {
    const result = await pool.query('DELETE FROM carrito WHERE usuario_id = $1 AND producto_id = $2', [userId, producto_id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};




