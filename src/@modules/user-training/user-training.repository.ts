import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

export type UserTrainingCreateInput = {
    userId: string
    trainingId: string
}

@Injectable()
export class UserTrainingRepository {

    constructor(private prisma: PrismaService) { }

    async connect({ trainingId, userId }: UserTrainingCreateInput) {
        return await this.prisma.userTraining.create({
            data: {
                user: {
                    connect: {
                        id: userId
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
