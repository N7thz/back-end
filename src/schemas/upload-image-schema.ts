import { z } from "zod"

export const UploadImageSchema = z.object({
    imageUrl: z.string().url({
        message: "url inválida"
    })
})

export type UploadImageProps = z.infer<typeof UploadImageSchema>