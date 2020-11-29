import { Resolver, Query, Arg } from 'type-graphql'
import { User } from '../models/User'
// import { CreateUserInput } from '../inputs/CreateUserInput'
// import { UpdateUserInput } from '../inputs/UpdateUserInput'

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Query(() => User)
    user(@Arg('uid') uid: string) {
        return User.findOne({ where: { uid } })
    }

    // @Mutation(() => User)
    // async createBook(@Arg('data') data: CreateUserInput) {
    //     const book = User.create(data)
    //     await book.save()
    //     return book
    // }

    // @Mutation(() => User)
    // async updateUser(
    //     @Arg('id') id: string,
    //     @Arg('data') data: UpdateUserInput
    // ) {
    //     const user = await User.findOne({ where: { id } })
    //     if (!user) throw new Error('User not found!')
    //     Object.assign(user, data)
    //     await user.save()
    //     return user
    // }

    // @Mutation(() => Boolean)
    // async deleteBook(@Arg('id') id: string) {
    //     const book = await Book.findOne({ where: { id } })
    //     if (!book) throw new Error('Book not found!')
    //     await book.remove()
    //     return true
    // }
}
