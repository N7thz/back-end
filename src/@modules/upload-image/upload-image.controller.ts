import {
    Controller,
    FileTypeValidator,
    MaxFileSizeValidator,
    ParseFilePipe,
    Post,
    Req,
    UploadedFile,
    UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { UploadImageService } from "./upload-image.service"
import { Request } from "express"
import { Acess, UserRole } from "@/common/decorators/acess.decorator"

const fileValidation = new ParseFilePipe({
    validators: [
        new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5, //5MB
            message: "O arquivo dev ter no máximo 5MB",
        }),
        new FileTypeValidator({ fileType: ".(png|jpg|jpeg)" }),
    ],
})

@Acess(UserRole.ADMIN, UserRole.CLIENT)
@Controller("upload-image")
export class UploadImageController {

    constructor(private uploadImageService: UploadImageService) { }

    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async uploadImage(
        @Req() request: Request,
        @UploadedFile(fileValidation) file: Express.Multer.File,
    ) {
        return await this.uploadImageService.uploadImage({
            file,
            request
        })
    }
}
