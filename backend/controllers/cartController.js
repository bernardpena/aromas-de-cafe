const pool = require("../config/db");

// Obtener productos
exports.getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
            SELECT carrito.id, productos.nombre, carrito.cantidad, carrito.email, carrito.descripcion, carrito.imagen, carrito.nombre
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
  const { usuario_id, invitado, items } = req.body;

  console.log("Datos recibidos:", { usuario_id, invitado, items });

  try {
    if (invitado) {
      const { nombre_completo, email, telefono, calle, numero, ciudad } =
        invitado;

      // Validación de campos del invitado
      if (
        !nombre_completo ||
        !email ||
        !telefono ||
        !calle ||
        !numero ||
        !ciudad
      ) {
        return res
          .status(400)
          .json({ error: "Todos los campos del invitado son requeridos." });
      }

      const inviteeResult = await pool.query(
        "INSERT INTO invitados (nombre_completo, email, telefono, calle, numero, ciudad) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [nombre_completo, email, telefono, calle, numero, ciudad]
      );

      const invitadoId = inviteeResult.rows[0].id;

      // Guardar compras del invitado
      for (const item of items) {
        const { producto, cantidad, precio } = item; // Asegúrate de que 'precio' esté definido en el objeto item
        const valor = precio * cantidad; // Cálculo de el valor

        console.log("Insertando compra de invitado:", {
          invitadoId,
          producto,
          cantidad,
          valor,
        });
        await pool.query(
          "INSERT INTO compras (invitado_id, producto_id, cantidad, valor) VALUES ($1, $2, $3, $4)",
          [invitadoId, item.producto_id, cantidad, valor] // Incluyendo valor calculado
        );
      }
    } else if (usuario_id) {
      // Guardar compras para el usuario registrado
      for (const item of items) {
        const {
          producto_id,
          cantidad,
          email,
          descripcion,
          imagen,
          nombre,
          precio,
        } = item; // Asegúrate de que 'precio' esté aquí también
        const valor = precio * cantidad; // Cálculo de el valor

        console.log("Insertando compra de usuario:", {
          usuario_id,
          producto_id,
          cantidad,
          email,
          descripcion,
          imagen,
          nombre,
          valor,
        });

        await pool.query(
          "INSERT INTO compras (usuario_id, producto_id, cantidad, email, descripcion, imagen, nombre, valor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [
            usuario_id,
            producto_id,
            cantidad,
            email,
            descripcion,
            imagen,
            nombre,
            valor,
          ] // Incluyendo 'valor'
        );
      }
    } else {
      return res
        .status(400)
        .json({ error: "Debes proporcionar usuario_id o datos de invitado." });
    }

    res.status(201).json({ message: "Compra guardada exitosamente" });
  } catch (err) {
    console.error("Error al guardar la compra:", err);
    res.status(500).json({ error: "Error al guardar la compra" });
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
