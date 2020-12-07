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
@Entity('users')
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field({ nullable: true })
    @Column({ unique: true, nullable: true })
    email?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    email_verified?: Date

    @Field({ nullable: true })
    @Column({ nullable: true })
    image?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    name?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    firstname?: string

    @Field({ nullable: true })
    @Column({ nullable: true })
    lastname?: string

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    promotion?: number

    @Field({ nullable: true })
    @Column({ nullable: true })
    major?: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date

    @Field(() => [Comment])
    comments(@Root() parent: User) {
        return Comment.find({ where: { authorId: parent.id } })
    }

    @Field(() => [Post])
    posts(@Root() parent: User) {
        return Post.find({ where: { authorId: parent.id } })
    }
}
