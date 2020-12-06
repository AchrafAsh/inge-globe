import { AppProps } from 'next/app'
import '@styles/index.css'
import { Provider as AuthProvider } from 'next-auth/client'
import { createClient, Provider } from 'urql'

const client = createClient({
    url: `${process.env.NEXTAUTH_URL}/api/graphql`
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            <AuthProvider session={pageProps.session}>
                <Component {...pageProps} />
            </AuthProvider>
        </Provider>
    )
}

export default MyApp
