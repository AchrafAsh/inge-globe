import { FC, FormEvent, ChangeEvent, useState } from 'react'
import EmailInput from './EmailInput'

interface User {
    email: string
    promotion: number
    major: string
    firstname: string
    lastname: string
}

interface FormProps {
    handleSignup: (user: User) => void
}

const SignupForm: FC<FormProps> = ({ handleSignup }) => {
    const [formData, setFormData] = useState<User>({
        email: '',
        promotion: 2020,
        firstname: '',
        lastname: '',
        major: ''
    })

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        const newUser: User = {
            ...formData,
            email: `${formData.email}@ensta-paris.fr`
        }
        // do something here
        handleSignup(newUser)
    }

    const handleFormChange = (
        key: keyof User,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prevState) => ({
            ...prevState,
            [key]: e.currentTarget.value
        }))
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
                            value={formData.firstname}
                            onChange={(e) => handleFormChange('firstname', e)}
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
                            value={formData.lastname}
                            onChange={(e) => handleFormChange('lastname', e)}
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
                            value={formData.email}
                            handleChange={(email) =>
                                setFormData((prev) => ({ ...prev, email }))
                            }
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
                                value={formData.major}
                                onChange={(e) =>
                                    handleFormChange('promotion', e)
                                }
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
                                value={formData.major}
                                onChange={(e) => handleFormChange('major', e)}
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
