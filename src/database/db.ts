import { Pool } from 'pg'
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'
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


    querySelectByEmailAndPassword(email: string, password: string, req: Request, res: any): any {
        this.dbConnection().query(`select * from user_account where email = '${email}' and password = '${password}'`).then((result) => {
            if (result.rowCount > 0) {
                const tokenAccount = jwt.sign(
                        { userid: result.rows[0].password },
                        process.env.TOKEN_COMPARE,
                        {
                          expiresIn: 60 * 60,
                        }
                      );
                return res.json({
                    user: result.rows[0],
                    token: tokenAccount,
                    login: true
                })
            } else {
                return res.json({ login: false })
            }
        })
    }
} 
