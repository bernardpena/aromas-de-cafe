const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Ruta registrar un usuario
router.post(
  "/register",
  (req, res, next) => {
    console.log("Solicitud de registro recibida");
    next();
  },
  authController.register
);

// Ruta sesión
// router.post("/login", authController.login);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user && user.validatePassword(password)) {
      const token = user.generateAuthToken();

      return res.json({
        token,
        user: {
          nombre: user.nombre,
          email: user.email,
          calle: user.calle,
          ciudad: user.ciudad,
          comuna: user.comuna,
        },
      });
    }

    return res.status(401).json({ error: "Credenciales inválidas" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener los datos del usuario (protegido)
router.get("/me", async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({
      nombre: user.nombre,
      email: user.email,
      calle: user.calle,
      ciudad: user.ciudad,
      comuna: user.comuna,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Ruta administrador
router.post("/add-admin", authController.addAdministrator);

module.exports = router;
