import {
    BadRequestException, Injectable, NotFoundException,
    UnauthorizedException
} from "@nestjs/common"
import { CreateInput, TrainingRepository } from "./training.repository"
import { Payload, ValidateIdProps } from "@/@types"
import { UserTrainingService } from "../user-training/user-training.service"
import { Request } from "express"
import { UpdateTrainingProps } from "@/schemas/edit-training-schema"
import { ExerciseService } from "../exercise/exercise.service"
import { ExerciseTrainingService } from "../exercise-training/exercise-training.service"
import { Validate } from "@/utils/validate-request"

const notFoundExceptionMessage = "Não foi possivel encontrar o usuário desejado"

type CreateRequest = CreateInput & {
    userId: string
}

type UpdateTrainingRequest = {
    id: string
    training: UpdateTrainingProps
}
@Injectable()
export class TrainingService {

    constructor(
        private trainingRepository: TrainingRepository,
        private userTrainingsService: UserTrainingService,
        private exerciseService: ExerciseService,
        private exerciseTrainingService: ExerciseTrainingService
    ) { }

    async create({ userId, ...data }: CreateRequest) {

        const trainingWithSameName =
            await this.trainingRepository.findSameNameAndDay(data.name)

        if (trainingWithSameName) {
            throw new BadRequestException("Um treino com esse nome já foi adicionado hoje.")
        }

        const newTraining = await this.trainingRepository.create(data)

        await this.userTrainingsService.connect({
            trainingId: newTraining.id,
            userId,
        })

        for (const exercise of newTraining.exercises) {
            await this.exerciseTrainingService.connect({
                exerciseId: exercise.id,
                trainingId: newTraining.id
            })
        }

        return newTraining
    }

    async update({
        id,
        training: {
            exercises,
            ...training
        }
    }: UpdateTrainingRequest) {

        await this.validateId({ id, message: "Treino não encontrado" })

        await this.exerciseService.deleteMany()

        for (const exercise of exercises) {
            await this.exerciseService.create({
                trainingId: id,
                ...exercise
            })
        }

        return await this.trainingRepository.update({
            id,
            training
        })
    }

    async remove(id: string) {
        await this.validateId({ id })
        await this.trainingRepository.remove(id)
    }

    async findById(id: string) {

        const training = await this.validateId({ id })

        return training
    }

    async findByName(name: string) {

        const training = await this.trainingRepository.findByName(name)

        if (!training) throw new NotFoundException(notFoundExceptionMessage)

        return training
    }

    async findManyByUserId(request: Request) {

        const userId = new Validate(request).getUserId()

        return await this.trainingRepository.findManyByUserId(userId)
    }

    async findSameNameAndDay(name: string) {
        return await this.trainingRepository.findSameNameAndDay(name)
    }

    private async validateId({
        id,
        message = notFoundExceptionMessage,
    }: ValidateIdProps) {

        const user = await this.trainingRepository.findById(id)

        if (!user) throw new NotFoundException(message)

        return user
    }
}
