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
@Entity('posts')
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

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
