import { Role } from "@prisma/client"

export type ValidateIdProps = {
	id: string
	message?: string
}

export type Payload = {
    sub: {
        id: string
        role: Role
    }
}