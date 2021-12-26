import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()


export class conectionDatabase {
    dbConnection(): Pool {
        const dbServer = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        });

        return dbServer
    }
} 