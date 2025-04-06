import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

export type CreateInput = Prisma.TrainingCreateInput & {
    createManyExerciseInput: Prisma.ExerciseCreateManyInput[]
}

export type UpdateInput = {
    id: string
    data: Prisma.TrainingUpdateInput
}

export type FindSameNameAndDayInput = {
    name: string,
    date: Date
}

@Injectable()
export class TrainingRepository {

    constructor(private prisma: PrismaService) { }

    async create({ createManyExerciseInput, ...data }: CreateInput) {
        return await this.prisma.training.create({
            data: {
                ...data,
                exercises: {
                    createMany: {
                        data: createManyExerciseInput
                    }
                }
            },
            include: {
                exercises: true,
            },
        })
    }

    async update({ id, data, }: UpdateInput) {
        return await this.prisma.training.update({
            where: {
                id,
            },
            data
        })
    }

    async remove(id: string) {
        await this.prisma.training.delete({
            where: {
                id
            },
        })
    }

    async findById(id: string) {
        return await this.prisma.training.findUnique({
            where: { id },
            include: {
                exercises: true,
            }
        })
    }

    async findByName(name: string) {
        return await this.prisma.training.findFirst({
            where: {
                name
            },
        })
    }

    async findSameNameAndDay(name: string) {

        const date = new Date

        const startOfDay = new Date(date)
        startOfDay.setHours(0, 0, 0, 0)

        const endOfDay = new Date(date)
        endOfDay.setHours(23, 59, 59, 999)

        return await this.prisma.training.findFirst({
            where: {
                name,
                madeAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                }
            }
        })
    }

    async findManyByUserId(id: string) {

        const trainings = await this.prisma.training.findMany({
            where: {
                UserTraining: {
                    some: {
                        userId: id
                    }
                }
            },
            orderBy: {
                madeAt: "asc"
            },
            include: {
                exercises: true,
            },
        })

        return trainings
    }
}
