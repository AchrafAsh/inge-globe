import { withIronSession, Handler } from 'next-iron-session'
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt'
import db from '@config/db'

const handler: Handler = async (req, res) => {
    if (req.method === 'POST') {
        let {
            firstname,
            lastname,
            email,
            password,
            promotion,
            major
        } = req.body

        email = `${email}@ensta-paris.fr`

        // check if user already exists
        const userResponse = await db
            .select('*')
            .from('users')
            .where({ email })
            .first()

        if (userResponse) {
            console.log('user already registered with this email')
            return res.redirect('/login')
        }

        const hashedpwd = await bcrypt.hash(password, 10)

        const uid = uuid()
        const user = {
            uid,
            firstname,
            lastname,
            email,
            password: hashedpwd,
            promotion,
            major,
            created_at: Date.now()
        }

        console.log({ user })

        await db('users').insert(user)

        // save user session
        req.session.set('user', user)
        await req.session.save()

        return res.redirect('/')
    }
    return res.redirect('/')
}

export default withIronSession(handler, {
    cookieName: process.env.COOKIE_NAME!,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    },
    password: process.env.SESSION_SECRET!
})
