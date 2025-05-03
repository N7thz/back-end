import { PrismaService } from "@/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"

@Injectable()
export class UploadImageRepository {

    constructor(private prisma: PrismaService) { }

    async create(image: Prisma.ImageCreateInput) {
        return await this.prisma.image.create({
            data: image
        })
    }

    async update({ id, image }: {
        id: string,
        image: Prisma.ImageUpdateInput
    }) {
        return await this.prisma.image.update({
            where: {
                id
            },
            data: image,
        })
    }

    async delete(id: string) {
        return await this.prisma.image.delete({ where: { id } })
    }

    async findByFileName(fileName: string) {
        return await this.prisma.image.findUnique({
            where: { fileName }
        })
    }
}
