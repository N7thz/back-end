import { ZodValidationPipe } from "@/common/pipes/zod-validation.pipe"
import {
	CreateAccountProps, CreateAccountSchema
} from "@/schemas/create-account-schema"
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UsePipes,
} from "@nestjs/common"
import { UserService } from "../user/user.service"
import { Public } from "@/common/decorators/public.decorator"

@Controller("create-account")
export class CreateAccountController {

	constructor(private userService: UserService) { }

	@Post()
	@Public()
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ZodValidationPipe(CreateAccountSchema))
	async create(@Body() { email, password }: CreateAccountProps) {

		const user = await this.userService.create({
			email,
			password,
		})

		return user
	}
}
