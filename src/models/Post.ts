import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity('posts')
@ObjectType()
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    authorId!: string

    @Field(() => String)
    @Column()
    title!: string

    @Field(() => String)
    @Column()
    body!: string

    @Field(() => Number)
    @Column()
    likes!: number

    @Field(() => Date)
    @CreateDateColumn()
    createdAt?: Date
}
