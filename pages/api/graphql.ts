import { ApolloServer, gql } from 'apollo-server-micro'
import db from '@config/db'

const typeDefs = gql`
    type Query {
        posts(first: Int = 10, skip: Int = 0): [Post!]!
        user(uid: ID!): [User!]!
    }

    type User {
        id: ID!
        email: String!
        firstname: String!
        lastname: String!
        promotion: Int!
        posts: [Post!]!
        comments: [Comment!]!
        createdAt: Int!
    }

    type Post {
        id: ID!
        title: String!
        author: User!
        body: String!
        likes: String!
        comments: [Comment!]!
        createdAt: Int!
    }

    type Comment {
        id: ID!
        post: Post!
        replyTo: Comment!
        author: User!
        body: String!
        createdAt: Int!
    }

    type University {
        id: ID!
        name: String!
        country: String!
        city: String!
        description: String!
        image: String!
    }
`

const resolvers = {
    Query: {
        posts: (_parent: any, args: any, _context: any) => {
            return db
                .select('*')
                .from('posts')
                .orderBy('created_at', 'desc')
                .limit(Math.min(args.first, 20))
                .offset(args.skip)
        },

        user: (_parent: any, args: any, _context: any) => {
            return db.select('*').from('users').where({ uid: args.uid })
        }
    },

    Post: {
        comments: (post: any, _args: any, _context: any) => {
            return db.select('*').from('comments').where({ post_id: post.id })
        }
    },

    User: {
        posts: (user: any, _args: any, _context: any) => {
            return db.select('*').from('posts').where({ author_id: user.uid })
        },
        comments: (user: any, _args: any, _context: any) => {
            return db
                .select('*')
                .from('comments')
                .where({ author_id: user.uid })
        }
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({})
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
