const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const {
      nombre,
      email,
      password,
      calle,
      ciudad,
      comuna,
      rol = "usuario",
    } = req.body; // Asignar rol por defecto

    //verifica email
    const existingUser = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(409).send("El email ya está en uso");
    }

    // Hasear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserción en la base de datos
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, calle, ciudad, comuna, rol) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nombre, email, hashedPassword, calle, ciudad, comuna, rol]
    );

    res.status(201).send("Registro exitoso");
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).send("Error al registrar el usuario");
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
      res.status(200).send("Inicio de sesión exitoso");
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).send("Error al iniciar sesión");
  }
};
