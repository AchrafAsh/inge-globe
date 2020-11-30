import Head from 'next/head'
import { signIn, useSession } from 'next-auth/client'
import LoginForm from '@components/LoginForm'
import SignupForm from '@components/SignupForm'

const Page: React.FC = () => {
    const handleLogin = (email: string) => {
        signIn('email', { email })
    }

    const handleSignup = ({ email }: { email: string }) => {
        // check if no user with that email
        // if new user, insert information in DB
        signIn('email', { email })
    }

    return (
        <>
            <Head>
                <title>Connexion</title>
            </Head>
            <main className='min-h-screen w-full md:py-12 md:px-3 bg-purple-50 flex items-center justify-center'>
                <div className='bg-white rounded-md shadow-md'>
                    <div className='flex flex-col justify-between lg:flex-row lg:space-x-6 px-6 py-12 md:px-12'>
                        <div className='flex-1'>
                            <LoginForm handleLogin={handleLogin} />
                        </div>
                        <div className='flex items-center flex-row lg:flex-col lg:space-y-3 py-12 lg:py-0'>
                            <hr className='lg:hidden flex-1' />
                            <span className='text-gray-200 font-semibold px-6'>
                                OU
                            </span>
                            <hr className='lg:hidden flex-1' />
                            <div className='border border-gray-100 w-0 h-0 lg:h-full' />
                        </div>
                        <div className='flex-1'>
                            <SignupForm handleSignup={handleSignup} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

// const PasswordInput: React.FC<{ name: string }> = ({ name }) => {
//     const [visible, setVisible] = useState(false)
//     return (
//         <div className='flex flex-row items-stretch bg-purple-50 rounded-md overflow-hidden'>
//             <input
//                 className='py-2 px-3 bg-transparent flex-1'
//                 type={visible ? 'text' : 'password'}
//                 name={name}
//                 required
//             />
//             <button
//                 className='px-3 rounded-md'
//                 onClick={() => setVisible(!visible)}
//             >
//                 <img src={visible ? 'img/eye.svg' : 'img/crossed-eye.svg'} />
//             </button>
//         </div>
//     )
// }

export default Page
