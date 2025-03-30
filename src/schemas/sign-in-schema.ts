import { z } from "zod"

export const SigninSchema = z.object({
	email: z
		.string()
		.email({
			message: "E-mail inválido",
		})
		.max(255, {
			message: "E-mail do usuário muito longo",
		}),
	password: z
		.string()
		.min(6, {
			message: "A senha deve ter no mínimo 6 caracteres",
		})
		.max(255, {
			message: "Senha muito longa",
		}),
})

export type SigninProps = z.infer<typeof SigninSchema>
