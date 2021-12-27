import { conectionDatabase } from '../database/db'
import { router } from './index'

export class routesList {
    private getUserbyEmail() {
        router.post('/login', (req: any, res: any) => {
            const email = req.body.email
            const password = req.body.password

            new conectionDatabase().querySelectByEmailAndPassword(email, password, req, res)
            
        })
    }

    init() {
        this.getUserbyEmail()
    }
}