const Page: React.FC = () => {
    return (
        <main className='w-screen h-screen bg-purple-50 flex items-center justify-center'>
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

const Login: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-center text-2xl font-semibold text-purple-400'>
                Se connecter
            </h1>
            <div className='pt-6'>
                <form
                    action='api/login'
                    className='flex flex-col space-y-3 items-stretch w-full'
                >
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='email'
                        >
                            email
                        </label>
                        <input
                            className='px-6 py-2 bg-purple-50 rounded-md'
                            placeholder='prenom.nom'
                            type='email'
                            name='email'
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            mot de passe
                        </label>
                        <input
                            className='px-6 py-2 bg-purple-50 rounded-md'
                            type='password'
                            name='password'
                        />
                    </div>
                    <div className='pt-3 w-full'>
                        <input
                            className='cursor-pointer bg-purple-500 text-gray-100 py-2 px-6 rounded-md w-full'
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
                    action='api/signup'
                    className='flex flex-col space-y-3 items-stretch w-full'
                >
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='email'
                        >
                            email
                        </label>
                        <input
                            className='px-6 py-2 bg-purple-50 rounded-md'
                            placeholder='prenom.nom'
                            type='email'
                            name='email'
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='password'
                        >
                            mot de passe
                        </label>
                        <input
                            className='px-6 py-2 bg-purple-50 rounded-md'
                            type='password'
                            name='password'
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label
                            className='font-semibold text-gray-300'
                            htmlFor='confirm-password'
                        >
                            confirmer le mot de passe
                        </label>
                        <input
                            className='px-6 py-2 bg-purple-50 rounded-md'
                            type='password'
                            name='confirm-password'
                        />
                    </div>
                    <div className='flex flex-row space-x-3'>
                        <div className='flex flex-col w-40'>
                            <label
                                className='font-semibold text-gray-300'
                                htmlFor='promotion'
                            >
                                Promo de sortie
                            </label>
                            <input
                                className='px-6 py-2 bg-purple-50 rounded-md'
                                placeholder='2020'
                                type='number'
                                name='promotion'
                            />
                        </div>
                        <div className='flex flex-col w-40'>
                            <label
                                className='font-semibold text-gray-300'
                                htmlFor='major'
                            >
                                Majeure
                            </label>
                            <input
                                className='px-6 py-2 bg-purple-50 rounded-md'
                                placeholder='STIC'
                                type='text'
                                name='major'
                            />
                        </div>
                    </div>
                    <div className='pt-3 w-full'>
                        <input
                            className='cursor-pointer bg-purple-500 text-gray-100 py-2 px-6 rounded-md w-full'
                            type='submit'
                            value='créer mon compte'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
