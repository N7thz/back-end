import { z } from "zod"

const CreateExerciseSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "O nome é um campo obrigatório.",
		})
		.max(255, {
			message: "Nome muito longo.",
		}),
	series: z
		.string()
		.transform(Number),
	reps: z
		.string()
		.transform(Number),
})

export const CreateTrainingSchema = z.object({
	name: z
		.string()
		.min(1, {
			message: "O nome é um campo obrigatório.",
		})
		.max(255, {
			message: "Nome muito longo.",
		}),
	obs: z
		.string()
		.max(255, {
			message: "Nome muito longo.",
		})
		.nullable()
		.default(null),
	exercises: z.array(CreateExerciseSchema)
})

export type CreateExerciseProps = z.infer<typeof CreateExerciseSchema>

export type CreateTrainingProps = z.infer<typeof CreateTrainingSchema>
