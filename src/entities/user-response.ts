import { Injectable } from "@nestjs/common"
import { Role, User } from "@prisma/client"

@Injectable()
export class UserResponse {
	private id: string
	private name: string
	private email: string
	private imageUrl: string | null
	private isActive: boolean
	private role: Role

	constructor({ id, email, imageUrl, role, isActive }: User) {
		this.id = id
		this.email = email
		this.imageUrl = imageUrl
		this.isActive = isActive
		this.role = role
	}
}
