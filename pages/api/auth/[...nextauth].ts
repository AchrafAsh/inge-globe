import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const options: InitOptions = {
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
    database: process.env.DB_URI,
    events: {
        error: async (message: any) => {
            /* error in authentication flow */
            console.log({ message })
            // remove the created User if no user created
        }
    }
}

export default (req: NextApiRequest, res: NextApiResponse) =>
    NextAuth(req, res, options)
