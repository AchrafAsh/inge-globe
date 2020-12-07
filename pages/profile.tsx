import Layout from '@components/layout'
import { FC, FormEvent, useState } from 'react'
import { useMutation, useQuery } from 'urql'
import Post from '@components/Post'

const ProfileQuery = `
    query {
        me {
            id
            email
            firstname
            lastname
            promotion
            major
        }
    }
`
const UpdateUser = `
    mutation ($id: ID!, $firstname: String, $lastname: String, $major: String, $promotion: Int) {
        updateUser (data: { id: $id, firstname: $firstname, lastname: $lastname, major: $major, promotion: $promotion })
    }
`

const CheckList: FC = () => {
    const profileFields = [
        { value: 'firstname', completed: true },
        { value: 'lastname', completed: true },
        { value: 'major', completed: true },
        { value: 'promotion', completed: true }
    ]

    const [result, executeQuery] = useQuery({
        query: ProfileQuery
    })
    const { data, fetching, error } = result

    if (fetching) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>
    if (
        data.me.email === null ||
        data.me.firstname === null ||
        data.me.lastname === null
    )
        return (
            <div className='absolute bottom-0 right-0 m-12 bg-white rounded-md shadow-md p-6'>
                {profileFields.map((field) => (
                    <div
                        key={field.value}
                        className='flex flex-row items-center space-x-3'
                    >
                        <input
                            type='checkbox'
                            name='completed'
                            id='completed'
                            checked={field.completed}
                        />
                        <label
                            htmlFor='completed'
                            className={`${
                                field.completed ? 'line-through' : ''
                            }`}
                        >
                            {field.value}
                        </label>
                    </div>
                ))}
            </div>
        )
    return null
}

const Page: FC = () => {
    const [tab, setTab] = useState<'posts' | 'comments' | 'settings'>('posts')

    return (
        <Layout>
            {/* <CheckList /> */}
            <header className='max-w-4xl mx-auto border-b'>
                <div className='py-12  flex flex-row space-x-6'>
                    <div className='h-32 w-32 rounded-full overflow-hidden bg-purple-400 shadow-lg'>
                        <img
                            src='https://storage.googleapis.com/indie-hackers.appspot.com/avatars/300x300_5g9kXEGrD6N2fcwdvkmjGgTvq8I2.webp'
                            alt=''
                        />
                    </div>
                    <div>
                        <div className='flex flex-row space-x-3 items-center'>
                            <div className='text-2xl'>Achraf</div>
                            <span>•</span>
                            <div className='text-2xl'>AIT SIDI HAMMOU</div>
                        </div>
                        <div className='flex flex-row space-x-3 items-center'>
                            <div>2022</div>
                            <span>•</span>
                            <div>Maths App</div>
                        </div>
                    </div>
                </div>
                <nav className='flex flex-row items-center space-x-6'>
                    <a
                        onClick={() => setTab('posts')}
                        className={`cursor-pointer font-semibold border-purple-400 px-2 ${
                            tab === 'posts' ? 'border-b-2' : ''
                        }`}
                    >
                        Posts
                    </a>
                    <a
                        onClick={() => setTab('comments')}
                        className={`cursor-pointer font-semibold border-purple-400 px-2 ${
                            tab === 'comments' ? 'border-b-2' : ''
                        }`}
                    >
                        Commentaires
                    </a>
                    <a
                        onClick={() => setTab('settings')}
                        className={`cursor-pointer font-semibold border-purple-400 px-2 ${
                            tab === 'settings' ? 'border-b-2' : ''
                        }`}
                    >
                        Paramètres
                    </a>
                </nav>
            </header>
            <main className='max-w-4xl mx-auto py-12'>
                {tab === 'posts' ? (
                    <PostTab />
                ) : tab === 'comments' ? (
                    <CommentTab />
                ) : (
                    <SettingTab />
                )}
            </main>
        </Layout>
    )
}

const PostTab: FC = () => {
    return (
        <div className='flex flex-col space-x-3'>
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
    )
}

const CommentTab: FC = () => {
    return <div className='flex flex-col space-x-3'>comments</div>
}
const SettingTab: FC = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [major, setMajor] = useState('')
    const [promotion, setPromotion] = useState(2020)

    const [updateUserResult, updateUser] = useMutation(UpdateUser)
    console.log({ updateUserResult })

    const handleUserUpdate = async (e: FormEvent) => {
        console.log('submit')
        e.preventDefault()

        const variables = { id: 2, firstname, lastname, major, promotion }
        const result = await updateUser(variables)
        console.log({ result })
    }

    return (
        <div className='flex flex-col space-y-3 max-w-lg mx-auto'>
            <form
                onSubmit={handleUserUpdate}
                className='bg-white shadow-md rounded-md p-4 flex flex-col space-y-4'
            >
                <div className='flex flex-col'>
                    <label
                        className='px-3 pb-1 text-gray-400 font-semibold'
                        htmlFor='firstname'
                    >
                        Prénom
                    </label>
                    <input
                        className='rounded-md px-3 py-2 shadow-inner'
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Prénom'
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        className='px-3 pb-1 text-gray-400 font-semibold'
                        htmlFor='lastname'
                    >
                        Nom
                    </label>
                    <input
                        className='rounded-md px-3 py-2 shadow-inner'
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Nom'
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        className='px-3 pb-1 text-gray-400 font-semibold'
                        htmlFor='promotion'
                    >
                        Promotion
                    </label>
                    <input
                        className='rounded-md px-3 py-2 shadow-inner'
                        type='number'
                        name='promotion'
                        id='promotion'
                        placeholder='Promotion'
                        value={promotion}
                        onChange={(e) => setPromotion(parseInt(e.target.value))}
                    />
                </div>
                <div className='flex flex-col'>
                    <label
                        className='px-3 pb-1 text-gray-400 font-semibold'
                        htmlFor='major'
                    >
                        Majeure
                    </label>
                    <input
                        className='rounded-md px-3 py-2 shadow-inner'
                        type='text'
                        name='major'
                        id='major'
                        placeholder='Majeure'
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    className='cursor-pointer bg-purple-400 px-3 py-2 text-gray-50 rounded-md'
                    value='modifier'
                />
            </form>
        </div>
    )
}

export default Page
