import { Body, Controller, Get, Param, Post, Put, Req, UnauthorizedException } from "@nestjs/common"
import { TrainingService } from "./training.service"
import { CreateTrainingProps } from "@/schemas/create-training-schema"
import { Request } from "express"
import { Acess, UserRole } from "@/common/decorators/acess.decorator"
import { UpdateTrainingProps } from "@/schemas/edit-training-schema"
import { Validate } from "@/utils/validate-request"

@Acess(UserRole.CLIENT, UserRole.ADMIN)
@Controller("trainings")
export class TrainingController {

    constructor(private trainingService: TrainingService) { }

    @Post()
    async create(
        @Body() { exercises, ...data }: CreateTrainingProps,
        @Req() request: Request
    ) {

        const id = new Validate(request).getUserId()

        return await this.trainingService.create({
            userId: id,
            ...data,
            createManyExerciseInput: exercises
        })
    }

    @Get()
    async findAll(@Req() request: Request) {
        return await this.trainingService.findManyByUserId(request)
    }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return await this.trainingService.findById(id)
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() training: UpdateTrainingProps
    ) {
        return await this.trainingService.update({ id, training })
    }
}