import { Payload } from "@/@types"
import { Request } from "express"

export class ValidateRequest {

    validate(request: Request) {

        if (!request.user) {
            throw new Error("Request body is required")
        }

        const { sub: { id } } = request.user as Payload

        return id
    }
}