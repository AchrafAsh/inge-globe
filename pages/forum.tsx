import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'
import Layout from '@components/layout'

interface User {
    uid: string
    email: string
    firstname: string
    lastname: string
}

const Page: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Layout initials={user.firstname[0] + user.lastname[0]} uid={user.uid}>
            <main className='max-w-6xl mx-auto'>
                <div>Forum</div>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            // fetch some more information
            return {
                props: {
                    user
                }
            }
        }

        if (!user) {
            // redirect to login page

            res.writeHead(301, {
                Location: '/login'
            })
            res.end()
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

export default Page
