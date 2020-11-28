import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { withIronSession } from 'next-iron-session'

const Page: React.FC = () => {
    return (
        <main className='py-12 bg-purple-50 flex items-center justify-center'>
            <div className='bg-white rounded-md shadow-md'>
                <div className='flex flex-row justify-between space-x-6 p-12'>
                    <div className='flex-1'>
                        <Login />
                    </div>
                    <div className='flex flex-col items-center space-y-3'>
                        <span className='text-gray-200 font-semibold'>OU</span>
                        <div className='border border-gray-100 w-0 h-full' />
                    </div>
                    <div className='flex-1'>
                        <Signup />
                    </div>
                </div>
            </div>
        </main>
    )
}

const EmailInput: React.FC = () => {
    return (
        <div className='flex flex-row items-center bg-purple-50 rounded-md overflow-hidden'>
            <input
                className='p-2 bg-transparent text-right'
                placeholder='prenom.nom'
                type='text'
                name='email'
                required
            />
            <div className='px-3 text-gray-500'>ensta-paris.fr</div>
        </div>
    )
}

const PasswordInput: React.FC<{ name: string }> = ({ name }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className='flex flex-row items-stretch bg-purple-50 rounded-md overflow-hidden'>
            <input
                className='py-2 px-3 bg-transparent flex-1'
                type={visible ? 'text' : 'password'}
                name={name}
                required
            />
            <button
                className='px-3 rounded-md'
                onClick={() => setVisible(!visible)}
            >
                <img src={visible ? 'img/eye.svg' : 'img/crossed-eye.svg'} />
            </button>
        </div>
    )
}

const Login: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-semibold text-purple-400'>
                Se connecter
            </h1>
            <div className='pt-6'>
                <form
                    action='api/auth/login'
                    method='POST'
                    className='flex flex-col space-y-3 items-stretch w-full'
                >
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='email'
                        >
                            email
                        </label>
                        <EmailInput />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            mot de passe
                        </label>
                        <PasswordInput name='password' />
                    </div>
                    <div className='pt-3 w-full'>
                        <input
                            className='cursor-pointer bg-purple-500 text-gray-100 py-2 px-3 rounded-md w-full'
                            type='submit'
                            value='se connecter'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

const Signup: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-semibold text-purple-400'>
                Créer mon compte
            </h1>
            <div className='pt-6'>
                <form
                    action='api/auth/signup'
                    method='POST'
                    className='flex flex-col space-y-3 items-stretch w-full'
                >
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            prénom
                        </label>
                        <input
                            className='px-3 py-2 bg-purple-50 rounded-md'
                            type='firstname'
                            name='firstname'
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='passwolastnamerd'
                        >
                            nom
                        </label>
                        <input
                            className='px-3 py-2 bg-purple-50 rounded-md'
                            type='lastname'
                            name='lastname'
                            required
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='email'
                        >
                            email
                        </label>
                        <EmailInput />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            mot de passe
                        </label>
                        <PasswordInput name='password' />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='confirm-password'
                        >
                            confirmer le mot de passe
                        </label>
                        <PasswordInput name='confirm-password' />
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='flex flex-col w-40'>
                            <label
                                className='font-semibold text-gray-300'
                                htmlFor='promotion'
                            >
                                promo de sortie
                            </label>
                            <input
                                className='px-3 py-2 bg-purple-50 rounded-md'
                                placeholder='2020'
                                type='text'
                                name='promotion'
                                required
                            />
                        </div>
                        <div className='flex flex-col w-40'>
                            <label
                                className='font-semibold text-gray-300'
                                htmlFor='major'
                            >
                                majeure
                            </label>
                            <input
                                className='px-3 py-2 bg-purple-50 rounded-md'
                                placeholder='STIC'
                                type='text'
                                name='major'
                                required
                            />
                        </div>
                    </div>
                    <div className='pt-3 w-full'>
                        <input
                            className='cursor-pointer bg-purple-500 text-gray-100 py-2 px-3 rounded-md w-full'
                            type='submit'
                            value='créer mon compte'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withIronSession(
    async ({ req, res }) => {
        const user = req.session.get('user')

        if (user) {
            console.log({ user })
            // user already loggedin, redirect to home page
            res.writeHead(301, {
                Location: '/'
            })
            res.end()
        }

        return { props: {} }
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
