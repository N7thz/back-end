import { Injectable } from "@nestjs/common"
import { Image, Role, User } from "@prisma/client"

type UserResponseProps = User & {
	image: Image | null
}

@Injectable()
export class UserResponse {
	private id: string
	private name: string
	private email: string
	private imageUrl: string | null
	private isActive: boolean
	private role: Role

	constructor({ id, email, image, role, isActive }: UserResponseProps) {
		this.id = id
		this.email = email
		this.imageUrl = ""
		this.isActive = isActive
		this.role = role
	}
}