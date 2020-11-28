import { Handler, withIronSession } from 'next-iron-session'

const handler: Handler = (req, res) => {
    req.session.destroy()
    return res.redirect('/login')
}

export default withIronSession(handler, {
    password: `${process.env.SESSION_SECRET}`,
    cookieName: `${process.env.COOKIE_NAME}`,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
})
