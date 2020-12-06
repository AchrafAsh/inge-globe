import {
    Resolver,
    Query,
    Mutation,
    Arg,
    InputType,
    Field,
    ID
} from 'type-graphql'
import { Post } from '@models/post.model'

@InputType()
export class CreatePostInput {
    @Field(() => ID)
    authorId!: number

    @Field()
    title!: string

    @Field()
    body!: string
}

@Resolver(Post)
export class PostResolver {
    @Query(() => [Post])
    posts() {
        return Post.find()
    }

    @Query(() => Post)
    post(@Arg('id') id: string) {
        return Post.findOne({ where: { id } })
    }

    @Mutation(() => Post)
    async createPost(@Arg('data') data: CreatePostInput) {
        let slug = data.title.toLowerCase().replace(/' '/g, '-')
        // check that the slug doesn't already exist somehow
        const post = Post.create({ ...data, slug })
        await post.save()
        return post
    }
}
