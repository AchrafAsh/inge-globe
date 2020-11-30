import { FC } from 'react'
import Layout from '@components/layout'
import { GetServerSideProps } from 'next'

const Page: FC = () => {
    return (
        <Layout>
            <div>{}</div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {}
    }
}

export default Page
