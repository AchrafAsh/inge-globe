import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { Student } from '@models/student.model'
import { CreateStudentInput } from '@inputs/createStudentInput'
import { UpdateStudentInput } from '@inputs/updateStudentInput'

@Resolver()
export class StudentResolver {
    @Query(() => [Student])
    students() {
        return Student.find()
    }

    @Query(() => Student)
    student(@Arg('id') id: string) {
        return Student.findOne({ where: { id } })
    }

    @Mutation(() => Student)
    async createStudent(@Arg('data') data: CreateStudentInput) {
        const student = Student.create(data)
        await student.save()
        return student
    }

    @Mutation(() => Student)
    async updateStudent(
        @Arg('id') id: string,
        @Arg('data') data: UpdateStudentInput
    ) {
        const student = await Student.findOne({ where: { id } })
        if (!student) throw new Error('Student not found!')
        Object.assign(student, data)
        await student.save()
        return student
    }

    @Mutation(() => Boolean)
    async deleteStudent(@Arg('id') id: string) {
        const student = await Student.findOne({ where: { id } })
        if (!student) throw new Error('Student not found!')
        await student.remove()
        return true
    }
}
