import { Field, ID, ObjectType } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('comments')
export class Comment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => ID)
    @Column({ name: 'author_id' })
    authorId!: number

    @Field(() => ID)
    @Column({ name: 'post_id' })
    postId!: number

    @Field(() => ID)
    @Column({
        name: 'reply_to',
        comment: 'Only if the comment is a response to another comment.'
    })
    replyTo?: number

    @Field(() => String)
    @Column()
    body!: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
