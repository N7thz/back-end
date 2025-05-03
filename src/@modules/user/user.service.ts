import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common"
import { UserRepository } from "./user.repository"
import {
	UpdateUserProps, UpdateUserSchema
} from "@/schemas/update-user-schema"
import { UserResponse } from "@/entities/user-response"
import { Prisma } from "@prisma/client"
import { Hash } from "@/entities/hash"
import { Request } from "express"
import { Validate } from "@/utils/validate-request"

export type ValidateIdProps = {
	id: string
	message?: string
}

type UpdateUserBody = UpdateUserProps & {
	id: string
}

type UpdateImageProps = {
	request: Request
	imageUrl: string
}

const notFoundExceptionMessage = "Não foi possivel encontrar o usuário desejado"

@Injectable()
export class UserService {

	constructor(private userRepository: UserRepository) { }

	async create(userInput: Prisma.UserCreateInput) {

		const { email } = userInput

		const userAlreadyExist =
			await this.userRepository.findByEmail(email)

		if (userAlreadyExist) {
			throw new BadRequestException("Usuário já existe")
		}

		const { hash } = new Hash()

		const password = hash(userInput.password)

		const user = await this.userRepository.create({ email, password })

		return new UserResponse(user)
	}

	async findById({ id, type }: {
		id: string
		type?: "simple" | "complete"
	}) {

		const user = await this.userRepository.findById({ id, type })

		if (!user) throw new NotFoundException(notFoundExceptionMessage)

		return user
	}
	
	async findByIdWithImage(id: string) {

		const user = await this.userRepository.findByIdWithImage(id)

		if (!user) throw new NotFoundException(notFoundExceptionMessage)

		return user
	}

	async findMany() {

		const users = await this.userRepository.findMany()

		return users.map((user) => new UserResponse(user))
	}

	async update({ id, email, imageUrl }: UpdateUserBody) {

		await this.validateId({ id })

		this.validateBody({ email, imageUrl })

		const user = await this.userRepository.update({
			id,
			email
		})

		return new UserResponse(user)
	}

	async userAlreadyExist(email: string) {

		const user = await this.userRepository.findByEmail(email)

		if (user) return true

		return false
	}

	async findByEmail(email: string) {

		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new BadRequestException("Usuário ou senha incorretos")
		}

		return user
	}

	private async validateId({
		id,
		message = notFoundExceptionMessage,
	}: ValidateIdProps) {

		const user = await this.userRepository.findById({ id })

		if (!user) {
			throw new NotFoundException(message)
		}

		return user
	}

	private validateBody(body: UpdateUserProps) {

		const isValid = UpdateUserSchema.safeParse(body)

		if (isValid.success) {
			return
		}

		throw new BadRequestException(isValid.error)
	}
}