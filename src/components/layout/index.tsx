import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'

import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
    uid: string
    initials: string
}

const Layout: FC = ({ children }) => {
    const [session, loading] = useSession()
    const router = useRouter()

    if (loading) {
        return (
            <main className='w-full h-screen bg-purple-50 flex justify-center items-center'>
                <p className=''>loading...</p>
            </main>
        )
    }

    if (session === null && !router.pathname.includes('login')) {
        router.push('/login')
    }

    if (session && router.pathname.includes('/login')) {
        router.push('/')
    }

    return (
        <div className='bg-purple-50 min-h-screen'>
            <Head>
                <title>International</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
