import { Public } from "@/common/decorators/public.decorator"
import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe"
import {
	AuthenticateBody,
	authenticateBodySchema,
} from "@/schemas/authenticate-schema"
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UsePipes,
} from "@nestjs/common"
import { AuthenticateService } from "./authenticate.service"
import { Acess, UserRole } from "@/common/decorators/acess.decorator"
import { Request } from "express"

@Controller("authenticate")
export class AuthenticateController {
	constructor(private authenticateService: AuthenticateService) { }

	@Post()
	@Public()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async login(@Body() body: AuthenticateBody) {
		
		const acessToken = await this.authenticateService.login(body)

		return { acess_token: acessToken }
	}

	@Get()
	@Acess(UserRole.ADMIN, UserRole.CLIENT)
	async authenticate(@Req() request: Request) {
		return await this.authenticateService.authenticate(request)
	}
}