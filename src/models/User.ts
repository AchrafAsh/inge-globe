import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { IsEmail } from 'class-validator'

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    uid!: string

    @Field(() => String)
    @Column()
    firstname!: string

    @Field(() => String)
    @Column()
    lastname!: string

    @Field(() => String)
    @IsEmail()
    @Column({ unique: true })
    email!: string

    @Field(() => Number)
    @Column()
    promotion!: number

    @Field(() => String)
    @Column({ default: 2000 })
    major!: string

    @Field(() => Date)
    @CreateDateColumn()
    createdAt?: Date
}
