import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common"
import { UserService } from "./user.service"
import { UpdateUserProps } from "@/schemas/update-user-schema"

@Controller("users")
export class UserController {

    constructor(private userService: UserService) { }

    @Get(":id")
    async findById(
        @Query("type") type: "simple" | "complete",
        @Param("id") id: string
    ) {
        return await this.userService.findById({ id, type })
    }

    @Get()
    async findMany() {
        return this.userService.findMany()
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() { email, imageUrl }: UpdateUserProps
    ) {
        return this.userService.update({ id, email, imageUrl })
    }
}
