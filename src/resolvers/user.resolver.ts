import {
    InputType,
    Field,
    Int,
    ID,
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

@InputType()
export class UpdateInput {
    @Field(() => ID)
    id!: number

    @Field(() => String, { nullable: true })
    firstname?: string

    @Field(() => String, { nullable: true })
    lastname?: string

    @Field(() => String, { nullable: true })
    major?: string

    @Field(() => Int, { nullable: true })
    promotion?: number
}

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Query(() => User)
    user(@Arg('email') email: string) {
        return User.findOne({ where: { email } })
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

    @Mutation(() => Boolean)
    async deleteUser(@Arg('id') id: number) {
        try {
            const user = await User.findOne({ where: { id } })
            if (!user) throw `No user found with id ${id}`

            await user.remove()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    @Mutation(() => Boolean)
    async updateUser(@Arg('data') data: UpdateInput) {
        try {
            const user = await User.findOne({ where: { id: data.id } })
            if (!user) throw `No user found with id ${data.id}`

            if (data.firstname) user.firstname = data.firstname
            if (data.lastname) user.lastname = data.lastname
            if (data.major) user.major = data.major
            if (data.promotion) user.promotion = data.promotion

            await user.save()

            return true
        } catch (error) {
            console.error(error)

            return false
        }
    }
}
