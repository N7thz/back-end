import { Injectable } from "@nestjs/common";
import { ExerciseTrainingCreateInput, ExerciseTrainingRepository } from "./exercise-training.repository";

@Injectable()
export class ExerciseTrainingService {

    constructor(private userTrainingRepository: ExerciseTrainingRepository) { }

    async connect(request: ExerciseTrainingCreateInput) {
        return await this.userTrainingRepository.connect(request)
    }
}
