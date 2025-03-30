import { z } from "zod"

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	DIRECT_URL: z.string().url(),
	SUPABASE_URL: z.string().url(),
	SUPABASE_KEY: z.string(),
	JTW_PRIVATE_KEY: z.string(),
	JTW_PUBLIC_KEY: z.string(),
	PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>
