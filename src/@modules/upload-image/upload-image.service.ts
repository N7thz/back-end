import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common"
import { UploadImageRepository } from "./upload-image.repository"
import { Request } from "express"
import { Validate } from "@/utils/validate-request"
import { UserService } from "../user/user.service"
import { Image } from "@prisma/client"
import { SupabaseService } from "../supabase/supabase.service"
import fs from "node:fs"

type UploadImageProps = {
    id: string
    file: Express.Multer.File
}

type UpdateImageProps = UploadImageProps & {
    image: Image
}

@Injectable()
export class UploadImageService {

    constructor(
        private uploadImageRepository: UploadImageRepository,
        private userService: UserService,
        private supabase: SupabaseService
    ) { }

    async uploadImage({
        file, request
    }: {
        file: Express.Multer.File,
        request: Request
    }) {

        const id = new Validate(request).getUserId()

        const fileName = this.createFileName(id, file)

        const { image } = await this.userService.findByIdWithImage(id)

        console.log(image)

        if (image) {
            await this.supabase.delete(image.fileName)
            await this.uploadImageRepository.delete(image.id)
        }

        return await this.create({
            file,
            fileName,
            userId: id
        })
    }

    private async create({
        file, fileName, userId
    }: {
        userId: string,
        fileName: string
        file: Express.Multer.File,
    }) {

        const image = await this.supabase.create({
            avatar: file.buffer,
            avatarName: fileName,
            contentType: file.mimetype
        })

        const imageUrl = this.supabase.getPublicUrl(image.path)

        await this.userService.update({
            id: userId,
            imageUrl
        })

        return await this.uploadImageRepository.create({
            ...image,
            imageUrl,
            fileName,
            userId,
            User: {
                connect: { id: userId }
            }
        })
    }

    private createFileName(id: string, file: Express.Multer.File) {
        return `${id}_${file.originalname}`
    }
}
