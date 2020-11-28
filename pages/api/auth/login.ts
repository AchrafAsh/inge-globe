import { withIronSession, Handler } from 'next-iron-session'
import * as bcrypt from 'bcrypt'
import db from '@config/db'

const handler: Handler = async (req, res) => {
    if (req.method === 'POST') {
        let { email, password } = req.body

        email = `${email}@ensta-paris.fr`

        try {
            // check for user in database
            const user = await db
                .select('*')
                .from('users')
                .where({ email })
                .first()

            if (!user) {
                return res.status(404).send('no user with that email')
            }

            const hash = user.password

            if (await bcrypt.compare(password, hash)) {
                req.session.set('user', user)
                await req.session.save()
                return res.redirect('/')
            }

            await db.destroy()
            return res.status(400).send('Wrong Password')
        } catch (error) {
            console.log(error)
            await db.destroy()
            return res.redirect('/')
        }
    }
    return res.status(404).send('')
}

export default withIronSession(handler, {
    cookieName: process.env.COOKIE_NAME!,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    },
    password: process.env.SESSION_SECRET!
})
