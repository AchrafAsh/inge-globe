import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'

@Entity('universities')
@ObjectType()
export class University extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => String)
    @Column()
    name!: string

    @Field(() => String)
    @Column()
    country!: string

    @Field(() => String)
    @Column()
    city!: string

    @Field(() => String)
    @Column()
    description!: string
}
