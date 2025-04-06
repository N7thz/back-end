import { Body, Controller, Put, Req, UsePipes } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Request } from "express"
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe";
import { type UploadImageProps, UploadImageSchema } from "@/schemas/upload-image-schema"

@Controller("update-image")
export class UpdateImageController {

    constructor(private userService: UserService) { }

    @Put(":id")
    @UsePipes(new ZodValidationPipe(UploadImageSchema))
    async updateImage(
        @Req() request: Request,
        @Body() { imageUrl }: UploadImageProps
    ) {
        return await this.userService.updateImage({ imageUrl, request })
    }
}