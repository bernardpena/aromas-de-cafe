const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Agrega un log para verificar la llegada a la ruta
router.post(
  "/register",
  (req, res, next) => {
    console.log("Solicitud de registro recibida Register");
    next();
  },
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
