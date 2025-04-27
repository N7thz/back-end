import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

@Injectable()
export class ExerciseRepository {

    constructor(private prisma: PrismaService) { }

    async create(exercise: Prisma.ExerciseCreateInput) {
        return await this.prisma.exercise.create({ data: exercise })
    }

    async createMany(exercises: Prisma.ExerciseCreateInput[]) {
        return await this.prisma.exercise.createMany({ data: exercises })
    }

    async update({
        id, exercise
    }: {
        id: string,
        exercise: Prisma.ExerciseUpdateInput
    }) {
        return await this.prisma.exercise.update({
            where: {
                id
            },
            data: exercise
        })
    }

    async updateMany({
        trainingId, exercises
    }: {
        trainingId: string,
        exercises: Prisma.ExerciseUpdateInput[]
    }) {
        return await this.prisma.exercise.updateMany({
            where: {
                trainingId
            },
            data: exercises
        })
    }

    async delete(id: string) {
        await this.prisma.exercise.delete({
            where: {
                id
            }
        })
    }

    async deleteMany() {
        await this.prisma.exercise.deleteMany()
    }

    async findById(id: string) {
        return await this.prisma.exercise.findUnique({
            where: {
                id
            }
        })
    }

    async findMany(trainingId: string) {
        return await this.prisma.exercise.findMany({
            where: {
                trainingId
            }
        })
    }
}