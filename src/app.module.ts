import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { MulterModule } from "@nestjs/platform-express"
import { PrismaService } from "./prisma/prisma.service"
import { UserService } from "./@modules/user/user.service"
import { UserRepository } from "./@modules/user/user.repository"
import { EnvModule } from "./env/env.module"
import { EnvService } from "./env/env.service"
import { envSchema } from "./env/env"
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard"
import { RolesGuard } from "./common/guards/role-auth.guard"
import { AuthModule } from "./auth/auth.module"
import { AuthenticateController } from "./@modules/authenticate/authenticate.controller"
import { AuthenticateService } from "./@modules/authenticate/authenticate.service"
import { CreateAccountController } from "./@modules/create-account/create-account.controller"
import { UserController } from "./@modules/user/user.controller"
import { TrainingController } from "./@modules/training/training.controller"
import { TrainingService } from "./@modules/training/training.service"
import { TrainingRepository } from "./@modules/training/training.repository"
import { UserTrainingRepository } from "./@modules/user-training/user-training.repository"
import { UserTrainingService } from "./@modules/user-training/user-training.service"
import { ExerciseService } from "./@modules/exercise/exercise.service"
import { ExerciseRepository } from "./@modules/exercise/exercise.repository"
import { ExerciseController } from "./@modules/exercise/exercise.controller"
import { ExerciseTrainingRepository } from "./@modules/exercise-training/exercise-training.repository"
import { ExerciseTrainingService } from "./@modules/exercise-training/exercise-training.service"
import { UploadImageController } from "./@modules/upload-image/upload-image.controller"
import { UploadImageService } from "./@modules/upload-image/upload-image.service"
import { UploadImageRepository } from "./@modules/upload-image/upload-image.repository"
import { SupabaseService } from "./@modules/supabase/supabase.service"

@Module({
	imports: [
		MulterModule.register(),
		ConfigModule.forRoot({
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
		EnvModule,
	],
	controllers: [
		AuthenticateController,
		CreateAccountController,
		UserController,
		TrainingController,
		ExerciseController,
		UploadImageController,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		EnvService,
		PrismaService,
		UserService,
		UserRepository,
		AuthenticateService,
		TrainingService,
		TrainingRepository,
		UserTrainingRepository,
		UserTrainingService,
		ExerciseService,
		ExerciseRepository,
		ExerciseTrainingRepository,
		ExerciseTrainingService,
		UploadImageService,
		UploadImageRepository,
		SupabaseService,
	],
})
export class AppModule { }
