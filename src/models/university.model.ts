import { Field, ID, ObjectType } from 'type-graphql'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'universities' })
@ObjectType()
export class University extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column({ unique: true })
    name!: string

    @Field(() => String)
    @Column()
    country!: string

    @Field(() => String)
    @Column()
    city!: string

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date
}
