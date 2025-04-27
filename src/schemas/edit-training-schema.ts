import { z } from "zod"

const exerciseSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    series: z.any().transform(Number),
    reps: z.any().transform(Number),
    toFailure: z.boolean(),
})

export const updateTrainingSchema = z.object({
    name: z.string().optional(),
    obs: z.string().optional(),
    exercises: z.array(exerciseSchema),
})

export type ExerciseProps = z.infer<typeof exerciseSchema>[]

export type UpdateTrainingProps = z.infer<typeof updateTrainingSchema>