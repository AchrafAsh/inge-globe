import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class UpdateStudentInput {
    @Field(() => String)
    firstname!: string

    @Field(() => String)
    lastname!: string

    @Field(() => String)
    major?: string

    @Field(() => Int)
    promotion?: number
}
