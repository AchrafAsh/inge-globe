import { AppProps } from 'next/app'
import '@styles/index.css'
import { useRouter } from 'next/router'
import { useSession, Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {
    const [session, loading] = useSession()
    const router = useRouter()

    console.log(router.pathname)

    if (loading) {
        return (
            <main className='w-full h-screen bg-purple-50 flex justify-center items-center'>
                <p className=''>loading...</p>
            </main>
        )
    }

    if (session === null && !router.pathname.includes('login')) {
        return router.push('/login')
    }

    if (session && router.pathname.includes('/login')) {
        return router.push('/')
    }

    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
