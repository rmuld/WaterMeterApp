import mysql from 'mysql2';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
}).promise();

const querySql = (query: any, onData: any, onError:any) => {
  try {
    pool.query(query, function (error: any, results:any, fields: any) {
        if (error) {
            if(onError !== undefined)
                onError(error);
            return;
        }
        onData(results);
    })
}
catch (error) {
    if(onError !== undefined) onError(error)
}
}
export default pool;