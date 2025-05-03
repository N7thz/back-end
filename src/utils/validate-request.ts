import { Payload } from "@/@types";
import { UnauthorizedException } from "@nestjs/common"
import { Request } from "express"

export class Validate {

    private userId: string

    constructor(private request: Request) {

        if (!this.request.user) {
            throw new UnauthorizedException("Não foi possível encontrar o usuário");
        }

        const { sub: { id } } = this.request.user as Payload

        this.userId = id
    }

    getUserId() {
        return this.userId
    }
}
