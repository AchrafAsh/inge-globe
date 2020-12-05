import { InputType, Field } from 'type-graphql'

@InputType()
export class CreatePostInput {
    @Field({ name: 'author_id' })
    authorId!: number

    @Field()
    title!: string

    @Field()
    body!: string
}
