import Head from 'next/head'
import LoginForm from '@components/LoginForm'

const Page: React.FC = () => {
    return (
        <>
            <Head>
                <title>Connexion</title>
            </Head>
            <main className='min-h-screen w-full md:py-12 md:px-3 bg-purple-50 flex items-center justify-center'>
                <div className='bg-white rounded-md shadow-md'>
                    <div className='p-6'>
                        <div className='flex-1'>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Page
