import { FC, useState, FormEvent } from 'react'
import { signIn } from 'next-auth/client'
import EmailInput from './EmailInput'

const LoginForm: FC = () => {
    const [email, setEmail] = useState('')

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        let fullEmail = `${email}@ensta-paris.fr`
        signIn('email', {
            email: fullEmail,
            callbackUrl: 'http://localhost:3000/'
        })
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-semibold text-purple-400'>
                Se connecter
            </h1>
            <div className='pt-6'>
                <form
                    onSubmit={onSubmit}
                    className='flex flex-col space-y-3 items-stretch w-full'
                >
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='email'
                        >
                            email
                        </label>
                        <EmailInput
                            value={email}
                            handleChange={(value) => setEmail(value)}
                        />
                    </div>
                    {/* <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            mot de passe
                        </label>
                        <PasswordInput name='password' />
                    </div> */}
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

export default LoginForm
