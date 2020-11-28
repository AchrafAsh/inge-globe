import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
    uid: string
    initials: string
}

const Layout: React.FC<LayoutProps> = ({ initials, uid, children }) => {
    return (
        <div className='bg-purple-50 min-h-screen'>
            <Head>
                <title>International</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar initials={initials} uid={uid} />
            {children}
            <Footer />
        </div>
    )
}

export default Layout
