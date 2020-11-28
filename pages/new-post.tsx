import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'
import Layout from '@components/layout'

interface User {
    uid: string
    firstname: string
    lastname: string
    email: string
}

const tagList = ['catalogue', 'démarches', 'expérience', 'question']

const Page: React.FC<{ user: User }> = ({ user }) => {
    const [tags, setTags] = useState<string[]>([])

    const handleTagClick = (tag: string) => {
        if (tags.includes(tag)) {
            setTags(tags.filter((value) => value !== tag))
        } else {
            setTags([...tags, tag])
        }
    }

    return (
        <Layout initials={user.firstname[0] + user.lastname[0]} uid={user.uid}>
            <main className='max-w-6xl mx-auto'>
                <div className='p-12'>
                    <form
                        className='w-full flex flex-col items-stretch justify-center space-y-3'
                        action='api/new-post'
                    >
                        <div>
                            <input
                                className='py-2 px-6 text-2xl rounded-md w-full'
                                type='text'
                                name='title'
                                placeholder='Titre'
                            />
                        </div>
                        <div className='py-3 flex flex-row items-center space-x-3'>
                            {tagList.map((tag, idx) => (
                                <Tag
                                    key={idx}
                                    title={tag}
                                    active={tags.includes(tag)}
                                    onClick={() => handleTagClick(tag)}
                                />
                            ))}
                        </div>
                        <div>
                            <textarea
                                className='w-full p-6 rounded-md'
                                name='content'
                                placeholder={`Une question, un conseil, un retour d'expérience, écrivez ce que vous voulez 👍`}
                                rows={10}
                            ></textarea>
                        </div>
                        <div>
                            <input
                                className='cursor-pointer px-6 py-1 bg-purple-500 text-gray-50 rounded'
                                type='submit'
                                value='Publier'
                            />
                        </div>
                        <input
                            type='text'
                            name='tags'
                            hidden
                            value={tags.join()}
                        />
                    </form>
                </div>
            </main>
        </Layout>
    )
}

const Tag: React.FC<{
    title: string
    active: boolean
    onClick(): void
}> = ({ title, active, onClick }) => (
    <div
        onClick={() => onClick()}
        className={`cursor-pointer py-1 px-3 rounded-md ${
            active ? 'bg-purple-400 text-gray-50' : 'bg-purple-100'
        }`}
    >
        {title}
    </div>
)

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
