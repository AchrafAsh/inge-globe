import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity('students')
export class Student extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => ID)
    @Column({ unique: true })
    uid!: number // id in the users table

    @Field(() => String)
    @Column({ unique: true })
    email!: string

    @Field(() => String)
    @Column()
    firstname?: string

    @Field(() => String)
    @Column()
    lastname?: string

    @Field(() => String)
    @Column({ length: 256 })
    major?: string

    @Field(() => Int)
    @Column()
    promotion?: number

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
