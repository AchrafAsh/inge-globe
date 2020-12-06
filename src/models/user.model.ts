import { Field, ID, Int, ObjectType, Root } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'
import { Comment } from '@models/comment.model'
import { Post } from '@models/post.model'

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({ unique: true })
    email!: string

    @Field()
    @Column()
    firstname!: string

    @Field()
    @Column()
    lastname!: string

    @Field(() => Int)
    @Column()
    promotion!: number

    @Field()
    @Column()
    major?: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date

    @Field(() => [Comment])
    comments(@Root() parent: User) {
        return Comment.find({ where: { authorId: parent.id } })
    }

    @Field(() => [Post])
    posts(@Root() parent: User) {
        return Post.find({ where: { authorId: parent.id } })
    }
}
