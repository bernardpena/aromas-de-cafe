const { Pool } = require("pg");

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'aromas_de_cafe',
//   password: 'Admin',
//   port: 5432,
// });

// const pool = new Pool({
//   user: "aromas_de_cafe_9wde_user",
//   host: "dpg-ct6d2g2lqhvc73ahvsp0-a.oregon-postgres.render.com",
//   database: "aromas_de_cafe_9wde",
//   password: "IYisTbEkZz7fvtZHqPIsB1ZNdVHCJ2gv",
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// module.exports = pool;
// require("dotenv").config();

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

module.exports = pool;
