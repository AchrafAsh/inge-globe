import { FC, FormEvent, useState } from 'react'
import { signIn } from 'next-auth/client'
import EmailInput from './EmailInput'

interface User {
    email: string
    promotion: number
    major: string
    firstname: string
    lastname: string
}

const SignupForm: FC = () => {
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [promotion, setPromotion] = useState('2020')
    const [major, setMajor] = useState('')

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        let fullEmail = `${email}@ensta-paris.fr`
        const newUser: User = {
            email: fullEmail,
            firstname,
            lastname,
            promotion: parseInt(promotion),
            major
        }
        // signin with next-auth
        signIn('email', { email: fullEmail })
        // add user in database
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-semibold text-purple-400'>
                Créer mon compte
            </h1>
            <div className='pt-6'>
                <form
                    // action='api/auth/signup'
                    // method='POST'
                    onSubmit={onSubmit}
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
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
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
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
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
                        <EmailInput
                            value={email}
                            handleChange={(email) => setEmail(email)}
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
                    {/* <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='confirm-password'
                        >
                            confirmer le mot de passe
                        </label>
                        <PasswordInput name='confirm-password' />
                    </div> */}
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
                                value={promotion}
                                onChange={(e) => setPromotion(e.target.value)}
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
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
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

export default SignupForm
