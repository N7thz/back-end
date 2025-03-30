import { z } from "zod"

export const updatePasswordSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	old_password: z.string().min(6),
})

export type UpdatePasswordBody = z.infer<typeof updatePasswordSchema>
