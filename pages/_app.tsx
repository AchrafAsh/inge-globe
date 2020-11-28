import { AppProps } from 'next/app'
import Head from 'next/head'
import '@styles/index.css'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className='bg-purple-50 min-h-screen'>
            <Head>
                <title>International</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    )
}

export default MyApp
