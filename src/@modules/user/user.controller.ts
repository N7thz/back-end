import { Body, Controller, Get, Param, Put } from "@nestjs/common"
import { UserService } from "./user.service";
import { UpdateUserProps } from "@/schemas/update-user-schema";

@Controller("users")
export class UserController {

    constructor(private userService: UserService) { }

    @Get(":id")
    async findById(@Param("id") id: string) {
        return await this.userService.findById(id)
    }

    @Get()
    async findMany() {
        return this.userService.findMany()
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() { email }: UpdateUserProps
    ) {
        return this.userService.update({ id, email })
    }
}
