import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Observable } from "rxjs"
import { UserPayload } from "@/auth/jwt-strategy"
import { UserRole, ROLES_KEY } from "@/common/decorators/acess.decorator"
import { IS_PUBLIC_KEY } from "@/common/decorators/public.decorator"

type CanActivateReturn = boolean | Promise<boolean> | Observable<boolean>

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): CanActivateReturn {
		const isPublic = this.reflector.getAllAndOverride<boolean>(
			IS_PUBLIC_KEY,
			[context.getHandler(), context.getClass()],
		)

		if (isPublic) return true

		const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
			ROLES_KEY,
			[context.getHandler(), context.getClass()],
		) || [UserRole.ADMIN]

		const request = context.switchToHttp().getRequest()
		const user = request.user as UserPayload
		const userRole = user?.sub?.role as UserRole

		if (!user || !requiredRoles.includes(userRole)) {
			throw new ForbiddenException(
				`Access denied. Requires role(s): ${requiredRoles.join(", ")}`,
			)
		}

		return true
	}
}
