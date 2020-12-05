import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { PostResolver } from '@resolvers/post.resolver'
import { NextApiRequest, NextApiResponse } from 'next'
import { getOrCreateConnection } from '@utils/index'
import { UserResolver } from '@resolvers/user.resolver'
import { CommentResolver } from '@resolvers/comment.resolver'

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const connection = await getOrCreateConnection()
    const schema = await buildSchema({
        resolvers: [PostResolver, UserResolver, CommentResolver]
    })

    const apolloServer = new ApolloServer({ schema })

    return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}
