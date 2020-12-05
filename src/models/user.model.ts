import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'users' })
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    name?: string

    @Field(() => String)
    @Column()
    firstname!: string

    @Field(() => String)
    @Column()
    lastname!: string

    @Field(() => String)
    @Column({ length: 256 })
    major!: string

    @Field(() => Int)
    @Column()
    promotion!: number

    @Field(() => String)
    @Column({ unique: true })
    email!: string

    @Field(() => Date)
    @Column({ name: 'email_verified' })
    emailVerified?: Date

    @Field(() => String)
    @Column()
    image?: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
