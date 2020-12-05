import { Comment } from '@models/comment.model'
import { Post } from '@models/post.model'
import { University } from '@models/university.model'
import { User } from '@models/user.model'
import { getConnection, createConnection, Connection } from 'typeorm'

export async function getOrCreateConnection(): Promise<Connection> {
    try {
        const conn = getConnection()
        return conn
    } catch (e) {
        return createConnection({
            type: 'postgres',
            host: process.env.POSTGRES_HOST as string,
            port: parseInt(process.env.POSTGRES_PORT as string),
            username: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DB as string,
            entities: [User, Post, Comment, University],
            synchronize: true,
            logging: false
        })
    }
}
