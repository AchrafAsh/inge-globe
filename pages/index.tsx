import Link from 'next/link'
import Post from '@components/Post'
import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'
import Layout from '@components/layout'

interface User {
    uid: string
    firstname: string
    lastname: string
    email: string
}

const Home: React.FC<{ user: User }> = ({ user }) => {
    return (
        <Layout uid={user.uid} initials={user.firstname[0] + user.lastname[0]}>
            <main className='max-w-6xl mx-auto py-12'>
                <div className='px-6 py-3'>
                    <Link href='/new-post'>
                        <a className='px-3 py-2 bg-purple-400 text-gray-50 rounded'>
                            Écrire un post
                        </a>
                    </Link>
                </div>
                <div
                    id='feed'
                    className='px-6 py-3 flex flex-col items-center space-y-6'
                >
                    <Post
                        slug='comment-reviser-toefl'
                        autor='Achraf ASH'
                        comments={3}
                        likes={3}
                        createdAt={new Date()}
                        title='Comment j’ai révisé pour le TOEFL'
                        excerpt='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis neque ut purus malesuada, non sagittis enim sodales. Nulla fermentum suscipit arcu, ut tempor leo. Nunc vehicula laoreet metus, vitae laoreet odio aliquet quis...'
                    />
                    <Post
                        slug='comment-reviser-toefl'
                        autor='Achraf ASH'
                        comments={3}
                        likes={3}
                        createdAt={new Date()}
                        title='Comment j’ai révisé pour le TOEFL'
                        excerpt='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis neque ut purus malesuada, non sagittis enim sodales. Nulla fermentum suscipit arcu, ut tempor leo. Nunc vehicula laoreet metus, vitae laoreet odio aliquet quis...'
                    />
                </div>
            </main>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            // fetch some more information
            console.log({ user })
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

export default Home
