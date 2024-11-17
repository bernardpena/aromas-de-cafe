const { Pool } = require("pg");

//instancia del pool de conexiones
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "aromas_de_cafe",
  password: "Admin",
  port: 5432,
});

// obtener los productos
const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error en el servidor");
  }
};

module.exports = {
  getProducts,
};
