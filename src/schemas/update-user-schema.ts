import { z } from "zod"

export const UpdateUserSchema = z.object({
    email: z
        .string()
        .email({
            message: "E-mail inválido",
        })
        .max(255, {
            message: "E-mail muito longo",
        })
        .optional(),
    imageUrl: z
        .string()
        .url({
            message: "url inválida"
        })
        .optional()
})

export type UpdateUserProps = z.infer<typeof UpdateUserSchema>