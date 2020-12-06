import { Field, ID, ObjectType, Root } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'
import { Comment } from '@models/comment.model'

@ObjectType()
@Entity('post')
export class Post extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => ID)
    @Column({ name: 'author_id' })
    authorId!: number

    @Field(() => String)
    @Column({ unique: true })
    slug!: string

    @Field(() => String)
    @Column()
    title!: string

    @Field(() => String)
    @Column()
    body!: string

    @Field(() => [Comment])
    comments(@Root() parent: Post) {
        return Comment.find({ where: { postId: parent.id } })
    }

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
