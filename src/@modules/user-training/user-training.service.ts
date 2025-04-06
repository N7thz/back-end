import { Injectable } from "@nestjs/common"
import { UserTrainingCreateInput, UserTrainingRepository } from "./user-training.repository"

@Injectable()
export class UserTrainingService {

    constructor(private userTrainingRepository: UserTrainingRepository) { }

    async connect(request: UserTrainingCreateInput) {
        return await this.userTrainingRepository.connect(request)
    }
}
