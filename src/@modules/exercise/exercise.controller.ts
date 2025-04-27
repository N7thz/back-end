import { Body, Controller, Get, Param, Put } from "@nestjs/common"
import { ExerciseService } from "./exercise.service"
import { ExerciseProps } from "@/schemas/edit-training-schema"

@Controller("exercises")
export class ExerciseController {

    constructor(private exerciseService: ExerciseService) { }

    @Get(":id")
    async findMany(@Param("id") id: string,) {
        return await this.exerciseService.findMany(id)
    }
}
