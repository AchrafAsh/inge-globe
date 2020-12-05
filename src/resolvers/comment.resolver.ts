import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { Comment } from '@models/comment.model'
// import { CreatePostInput } from 'src/inputs/createCommentInput'

@Resolver()
export class CommentResolver {
    @Query(() => [Comment])
    comments() {
        return Comment.find()
    }

    @Query(() => Comment)
    comment(@Arg('id') id: string) {
        return Comment.findOne({ where: { id } })
    }

    // @Mutation(() => Comment)
    // async createPost(@Arg('data') data: CreateCommentInput) {
    //     const comment = Comment.create(data)
    //     await comment.save()
    //     return comment
    // }
}
