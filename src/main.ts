import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { EnvService } from "./env/env.service"

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["error", "warn", "debug", "verbose"],
	})

	app.enableCors({ origin: "*" })
	app.setGlobalPrefix("api")

	const envService = app.get(EnvService)
	const port = envService.get("PORT")

	await app
		.listen(port)
		.then(() => console.log(`server is running in ${port}`))
}
bootstrap()
