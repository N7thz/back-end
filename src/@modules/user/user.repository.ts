import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

export type FindByIdRequest = {
    id: string
    type?: "simple" | "complete"
}

type UserUpdateInput = Prisma.UserUpdateInput & {
    id: string
}

export type UpdateImage = {
    id: string
    imageUrl: string
}

@Injectable()
export class UserRepository {

    constructor(private prisma: PrismaService) { }

    async create(userInput: Prisma.UserCreateInput) {
        return await this.prisma.user.create({
            data: userInput
        })
    }

    async update({ id, ...userInput }: UserUpdateInput) {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: userInput
        })
    }

    async updateImage({ id, imageUrl }: UpdateImage) {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: {
                imageUrl
            }
        })
    }

    async remove(id: string) {
        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async findById({ id, type }: FindByIdRequest) {

        if (type === "complete") {
            return await this.prisma.user.findUnique({
                where: {
                    id
                },
                include: {
                    UserTraining: {
                        include: {
                            training: {
                                include: {
                                    exercises: true
                                }
                            }
                        }
                    }
                }
            })
        }

        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async findMany() {
        return await this.prisma.user.findMany()
    }
}
