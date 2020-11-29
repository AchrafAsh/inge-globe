import { ApolloServer, gql } from 'apollo-server-micro'
import knex from 'knex'

const db = knex({
    client: 'pg',
    connection: process.env.DB_URI
})

const typeDefs = gql`
    type Query {
        users: [User]!
        user(uid: ID!): User
    }

    type User {
        uid: ID!
        firstname: String!
        lastname: String!
        email: String!
        promotion: Int!
        major: String!
        createdAt: Int!
    }

    type Post {
        id: ID!
        authorId: ID!
        title: String!
        body: String!
        likes: Int!
        createdAt: Int!
    }

    type Comment {
        id: ID!
        authorId: ID!
        postId: ID!
        replyTo: ID!
        body: String!
        createdAt: Int!
    }

    type University {
        id: ID!
        name: String!
        country: String!
        city: String!
        description: String!
    }
`

const resolvers = {
    Query: {
        users: (_parent: any, _args: any, _context: any) => {
            return db.select('*').from('users')
        },
        user: (_parent: any, { uid }: { uid: string }, _context: any) => {
            return db.select('*').from('users').where({ uid }).first()
        }
    }

    // Mutation: {
    //     createUser: async (
    //         _: any,
    //         { description, done }: { description: any; done: any },
    //         _context: any
    //     ) => {
    //         return (
    //             await db('todos').insert({ description, done }).returning('*')
    //         )[0]
    //     }
    // }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return {}
    }
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: '/api/graphql' })
