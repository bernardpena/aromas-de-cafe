  // const express = require('express');
  // const router = express.Router();
  // const { register, login } = require('../controllers/authController');
  // router.post('/register', (req, res) => {
  //   res.send('Registro exitoso');
  // });
  // router.post('/login', (req, res) => {
  //   res.send('Inicio de sesión exitoso');
  // });
  // module.exports = router;  

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;







