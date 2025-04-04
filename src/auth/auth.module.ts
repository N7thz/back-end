import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { EnvModule } from "@/env/env.module"
import { EnvService } from "@/env/env.service"
import { JwtStrategy } from "./jwt-strategy"

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			global: true,
			useFactory(env: EnvService) {
				const privateKey = env.get("JTW_PRIVATE_KEY")
				const publicKey = env.get("JTW_PUBLIC_KEY")

				return {
					signOptions: {
						algorithm: "RS256",
						expiresIn: "7 days",
					},
					privateKey: Buffer.from(privateKey, "base64"),
					publicKey: Buffer.from(publicKey, "base64"),
				}
			},
		}),
	],
	providers: [EnvService, JwtStrategy],
})
export class AuthModule {}
