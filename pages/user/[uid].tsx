import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

import Layout from '@components/layout'

interface User {
    email: string
    firstname: string
    lastname: string
    promotion: number
    major: string
}

const Page: FC<{ user: User | undefined }> = () => {
    return (
        <Layout>
            <div>User profile here!</div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const uid = context.params?.uid
    console.log({ uid })

    if (!uid) {
        return {
            props: { user: undefined }
        }
    }

    // get user with that uid with urql
    // const user =
    // if (!user) {
    //     return {
    //         props: {
    //             user: undefined
    //         }
    //     }
    // }

    return {
        props: {
            user: {}
        }
    }
}

export default Page
