import {
    InputType,
    Field,
    Int,
    Resolver,
    Query,
    Arg,
    Mutation,
    Ctx
} from 'type-graphql'
import { User } from '@models/user.model'
import { getSession, signIn } from 'next-auth/client'
import { Context } from 'src/types'

@InputType()
export class SignupInput {
    @Field(() => String)
    email!: string

    @Field(() => String)
    firstname!: string

    @Field(() => String)
    lastname!: string

    @Field(() => String)
    major?: string

    @Field(() => Int)
    promotion?: number
}

@InputType()
export class LoginInput {
    @Field(() => String)
    email!: string
}

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Query(() => User)
    user(@Arg('id') id: string) {
        return User.findOne({ where: { id } })
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: Context) {
        const session = await getSession({ req: ctx.req })
        if (!session) return null

        const user = await User.findOne({
            where: { email: session.user.email }
        })
        if (!user) return null

        return user
    }

    @Mutation(() => User)
    async signup(@Arg('data') data: SignupInput) {
        const user = User.create(data)
        await user.save()

        signIn('email', { email: data.email })
        return user
    }

    @Mutation(() => User, { nullable: true })
    async login(@Arg('data') data: LoginInput) {
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            return null
        }

        signIn('email', { email: data.email })
        return user
    }
}
