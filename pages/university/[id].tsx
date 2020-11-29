import Layout from '@components/layout'
import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'

interface User {
    uid: string
    email: string
    firstname: string
    lastname: string
}

const Page: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Layout initials={user.firstname[0] + user.lastname[0]} uid={user.uid}>
            <div>{}</div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            // fetch university information
            // const university =
            return {
                props: {
                    user
                    // university
                }
            }
        }

        if (!user) {
            // redirect to login page

            res.writeHead(301, {
                Location: '/login'
            })
            res.end()
            return { props: {} }
        }
    },
    {
        cookieName: process.env.COOKIE_NAME!,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production'
        },
        password: process.env.SESSION_SECRET!
    }
)
