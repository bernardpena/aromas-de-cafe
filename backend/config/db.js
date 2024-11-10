const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aromas_de_cafe',
  password: 'Skateforlife123',
  port: 5432,
});

module.exports = pool;
