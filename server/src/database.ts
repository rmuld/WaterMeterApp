const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'watermeter',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

export default pool;