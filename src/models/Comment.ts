import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity('comments')
@ObjectType()
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    authorId!: string

    @Field(() => Number)
    @Column()
    postId!: number

    @Field(() => Number)
    @Column()
    replyTo?: number

    @Field(() => String)
    @Column()
    body!: string

    @Field(() => Date)
    @CreateDateColumn()
    createdAt?: Date
}
