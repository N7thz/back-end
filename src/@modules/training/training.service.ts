import {
    BadRequestException, Injectable, NotFoundException
} from "@nestjs/common"
import {
    CreateInput, TrainingRepository, UpdateInput
} from "./training.repository"
import { Payload, ValidateIdProps } from "@/@types"
import { UserTrainingService } from "../user-training/user-training.service"
import { Request } from "express"

const notFoundExceptionMessage = "Não foi possivel encontrar o usuário desejado"

type CreateRequest = CreateInput & {
    userId: string
}

@Injectable()
export class TrainingService {

    constructor(
        private trainingRepository: TrainingRepository,
        private userTrainingsService: UserTrainingService,
    ) { }

    async create({ userId, ...data }: CreateRequest) {

        const trainingWithSameName =
            await this.trainingRepository.findSameNameAndDay(data.name)

        if (trainingWithSameName)
            throw new BadRequestException("Um treino com esse nome já foi adicionado hoje.")

        const newTraining = await this.trainingRepository.create(data)

        await this.userTrainingsService.connect({
            trainingId: newTraining.id,
            userId,
        })

        return newTraining
    }

    async update({ id, data }: UpdateInput) {

        await this.validateId({ id })

        return await this.trainingRepository.update({ id, data })
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

        if (!request.user) throw new NotFoundException("User not found")

        const { sub: { id: userId } } = request.user as Payload

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

        if (!user) {
            throw new NotFoundException(message)
        }

        return user
    }
}
