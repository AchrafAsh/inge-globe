import { AppProps } from 'next/app'
import '@styles/index.css'
import { Provider as AuthProvider } from 'next-auth/client'
import { createClient, Provider } from 'urql'

let url: string

if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:3000/api/graphql'
} else {
    url = 'https://inge-globe.vercel.app/api/graphql'
}

const client = createClient({
    url
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
