const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { nombre, email, password, calle, ciudad, comuna, rol } = req.body;

    // Verificar si el email está en uso
    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).send("Email ya está en uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hasear la contraseña

    // Inserción en la base de datos
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, calle, ciudad, comuna, rol) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nombre, email, hashedPassword, calle, ciudad, comuna, rol]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).send("Error en el registro");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    if (
      user.rows.length > 0 &&
      (await bcrypt.compare(password, user.rows[0].password))
    ) {
      res.sendStatus(200);
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).send("Error en el login");
  }
};
