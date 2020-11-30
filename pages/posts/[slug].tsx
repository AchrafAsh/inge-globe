import { FC } from 'react'
import Layout from '@components/layout'
import { GetServerSideProps } from 'next'

interface Post {
    title: string
    body: string
    author: string // name
    comments: Comment[]
    likes: number
    createdAt: Date
}

const Page: FC<{ post: Post }> = ({ post }) => {
    return (
        <Layout>
            <div>
                <pre>{JSON.stringify(post)}</pre>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const slug = context.params?.slug

    if (!slug) {
        context.res.writeHead(301, { Location: '/' })
        context.res.end()
        return { props: {} }
    }

    // fetch post from graphql api with urql
    // const post = ...
    // if (!post) {
    //     context.res.writeHead(301, { Location: '/' })
    //     context.res.end()
    //     return { props: {} }
    // }
    // return {
    //     props: { post }
    // }

    return {
        props: {
            post: {}
        }
    }
}

export default Page
