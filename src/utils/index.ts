import { Comment } from '@models/comment.model'
import { Post } from '@models/post.model'
import { Student } from '@models/student.model'
import { getConnection, createConnection, Connection } from 'typeorm'

export async function getOrCreateConnection(): Promise<Connection> {
    try {
        const conn = getConnection()
        return conn
    } catch (e) {
        console.log('creating a new connection...')
        return createConnection({
            type: 'postgres',
            host: process.env.POSTGRES_HOST as string,
            port: parseInt(process.env.POSTGRES_PORT as string),
            username: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DB as string,
            entities: [Post, Student, Comment],
            synchronize: false,
            logging: true
        })
    }
}
