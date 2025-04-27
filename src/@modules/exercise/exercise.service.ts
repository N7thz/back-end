import { Injectable } from "@nestjs/common"
import { ExerciseRepository } from "./exercise.repository"
import { Prisma } from "@prisma/client"

@Injectable()
export class ExerciseService {

    constructor(private exerciseRepository: ExerciseRepository) { }

    async create(exercise: Prisma.ExerciseCreateInput & {
        trainingId: string
    }) {
        return await this.exerciseRepository.create({
            ...exercise,
            ExerciseTraining: {
                create: {
                    trainingId: exercise.trainingId
                }
            }
        })
    }

    async deleteMany() {
        await this.exerciseRepository.deleteMany()
    }

    async findById(id: string) {
        return await this.exerciseRepository.findById(id)
    }

    async findMany(id: string) {
        return await this.exerciseRepository.findMany(id)
    }
}
