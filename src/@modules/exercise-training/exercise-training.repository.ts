import { Injectable } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"

export type ExerciseTrainingCreateInput = {
    exerciseId: string
    trainingId: string
}

@Injectable()
export class ExerciseTrainingRepository {

    constructor(private prisma: PrismaService) { }

    async connect({ trainingId, exerciseId }: ExerciseTrainingCreateInput) {
        return await this.prisma.exerciseTraining.create({
            data: {
                exercise: {
                    connect: {
                        id: exerciseId
                    }
                },
                training: {
                    connect: {
                        id: trainingId
                    }
                }
            }
        })
    }
}