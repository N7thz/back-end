import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AuthenticateBody as LoginProps } from "@/schemas/authenticate-schema"
import { UserService } from "../user/user.service"
import { Hash } from "@/entities/hash"
import { Request } from "express"
import { UserPayload } from "@/auth/jwt-strategy"

const badRequestExceptionMessage = "Usuário ou senha incorretos"

@Injectable()
export class AuthenticateService {

	constructor(
		private jwt: JwtService,
		private userService: UserService,
	) { }

	async login({ email, password }: LoginProps) {
		
		const user = await this.userService.findByEmail(email)

		const { compare } = new Hash()

		const isPasswordCorrectly = compare(password, user.password)

		if (!isPasswordCorrectly) {
			throw new BadRequestException(badRequestExceptionMessage)
		}

		const acessToken = this.jwt.sign({
			sub: {
				id: user.id,
				role: user.role,
			},
		})

		return acessToken
	}

	async authenticate(request: Request) {

		if (!request.user)
			throw new BadRequestException(
				"Não foi possivel encontrar o usuário"
			)

		const { sub: { id } } = request.user as UserPayload

		return await this.userService.findById(id)
	}	
}
