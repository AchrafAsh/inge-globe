import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { NextApiRequest, NextApiResponse } from 'next'
import { getOrCreateConnection } from '@utils/index'
import { UserResolver } from '@resolvers/user.resolver'
import { PostResolver } from '@resolvers/post.resolver'
import { CommentResolver } from '@resolvers/comment.resolver'
import { Context } from 'src/types'

export const config = {
    api: {
        bodyParser: false
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await getOrCreateConnection()
    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, CommentResolver]
    })

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: Context) => ({ req })
    })

    return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
}
