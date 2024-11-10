const pool = require('../config/db');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  const { email, password, calle, ciudad, comuna } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO usuarios (email, password, calle, ciudad, comuna) VALUES ($1, $2, $3, $4, $5)',
    [email, hashedPassword, calle, ciudad, comuna]
  );
  res.sendStatus(201);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

  if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {
    res.sendStatus(200);
  } else {
    res.status(401).send('Invalid credentials');
  }
};
