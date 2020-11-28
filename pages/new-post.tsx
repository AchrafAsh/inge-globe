const Page: React.FC = () => {
    return (
        <main className='max-w-6xl mx-auto'>
            <div className='py-12'>
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
                </form>
            </div>
        </main>
    )
}

export default Page
