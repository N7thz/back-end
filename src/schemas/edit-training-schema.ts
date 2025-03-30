import { z } from 'zod'

export const editTrainingSchema = z.object({
    name: z.string().nullable(),
    obs: z.string().nullable(),
    exercises: z.array(z.object({
        name: z.string().nullable(),
        series: z.string().transform(Number).nullable(),
        reps: z.string().transform(Number).nullable(),
        toFailure: z.boolean().nullable(),
    })),
})    

export type EditTrainingProps = z.infer<typeof editTrainingSchema>