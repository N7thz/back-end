import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { z } from "zod"
import { EnvService } from "@/env/env.service"

const UserPayloadSchema = z.object({
	sub: z.object({
		id: z.string().uuid(),
		role: z.enum(["CLIENT", "ADMIN"]),
	}),
})

export type UserPayload = z.infer<typeof UserPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: EnvService) {
		const publibKey = config.get("JTW_PUBLIC_KEY")

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(publibKey, "base64"),
			algorithms: ["RS256"],
		})
	}

	validate(payload: UserPayload) {
		return UserPayloadSchema.parse(payload)
	}
}
