import { z } from "zod"

export const changeRoleSchema = z.object({
	clientId: z.string().uuid(),
	password: z.string().min(6),
})

export type ChangeRoleBody = z.infer<typeof changeRoleSchema>
