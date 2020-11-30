import { FC } from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
    uid: string
    initials: string
}

const Layout: FC = ({ children }) => {
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
