import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

type UserUpdateInput = Prisma.UserUpdateInput & {
    id: string
}

@Injectable()
export class UserRepository {

    constructor(private prisma: PrismaService) { }

    async create(userInput: Prisma.UserCreateInput) {
        return await this.prisma.user.create({
            data: userInput,
            include:{
                image:true
            }
        })
    }

    async update({ id, ...userInput }: UserUpdateInput) {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: userInput,
            include: {
                image: true
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

    async findById({ id, type = "simple" }: {
        id: string
        type?: "simple" | "complete"
    }) {

        if (type === "complete") {
            return await this.prisma.user.findUnique({
                where: {
                    id
                },
                include: {
                    userTraining: {
                        include: {
                            training: {
                                include: {
                                    exercises: true,
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

    async findByIdWithImage(id: string) {
        return await this.prisma.user.findUnique({
            where: {
                id
            },
            include: {
                image: true,
                userTraining: {
                    include: {
                        training: {
                            include: {
                                exercises: true,
                            }
                        }
                    }
                }
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
        return await this.prisma.user.findMany({
            include: { image: true }
        })
    }
}
