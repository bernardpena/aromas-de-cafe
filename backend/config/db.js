const { Pool } = require("pg");

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'aromas_de_cafe',
//   password: 'Admin',
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// monitorear conexiones
pool.on('connect', () => {
  console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
  console.error('Error en la conexión a la base de datos', err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
