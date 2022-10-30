import * as dotenv from "dotenv";

dotenv.config();

const config = {
    port: 3000,
    jwtSecret: process.env.JWT_SECRET,
    saltRounds: process.env.SALTROUNDS,
    apiPath: '/api/v1',
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        databas: process.env.DATABASE,
        host: 'localhost',
        port: 3306, //3306?
    }
};

export default config;