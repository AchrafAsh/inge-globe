import { AppProps } from 'next/app'
import Head from 'next/head'
import '@styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>International</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
