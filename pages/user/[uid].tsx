import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'
import Layout from '@components/layout'

interface User {
    uid: string
    firstname: string
    lastname: string
    email: string
    promotion: number
    major: string
}

const Page: React.FC<{ user: User; profile: User }> = ({ user, profile }) => {
    return (
        <Layout initials={user.firstname[0] + user.lastname[0]} uid={user.uid}>
            <div>
                {profile.firstname} {profile.lastname}
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            // fetch some more information
            // get profile from uid
            const uid = req.query
            console.log({ uid })

            return {
                props: {
                    user,
                    profile: user
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
