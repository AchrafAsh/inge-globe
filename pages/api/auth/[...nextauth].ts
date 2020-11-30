import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        })
    ],
    secret: process.env.SESSION_SECRET,
    debug: process.env.NODE_ENV === 'development',
    // A database is optional, but required to persist accounts in a database
    jwt: {
        secret: process.env.JWT_SECRET
    },
    database: process.env.DB_URI
}

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options)
