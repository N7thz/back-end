import { SetMetadata } from "@nestjs/common"

export enum UserRole {
	CLIENT = "CLIENT",
	ADMIN = "ADMIN",
}

export const ROLES_KEY = "roles"
export const Acess = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
