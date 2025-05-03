import { Injectable } from "@nestjs/common"
import { NotFoundException } from "@nestjs/common/exceptions"
import { createClient } from "@supabase/supabase-js"
import { EnvService } from "@/env/env.service"

export type CreateImageProps = {
    avatarName: string
    avatar: Buffer
    contentType: string
}

@Injectable()
export class SupabaseService {

    constructor(private env: EnvService) { }

    private supabaseUrl = this.env.get("SUPABASE_URL")
    private supabaseKey = this.env.get("SUPABASE_KEY")

    supabase = createClient(this.supabaseUrl, this.supabaseKey)

    private files() {
        return this.supabase.storage.from("whey-gym")
    }

    async create({ avatar, avatarName, contentType }: CreateImageProps) {
        
        const { data, error } = await this.files().upload(avatarName, avatar, {
            contentType,
            upsert: true,
        })

        if (error) throw new NotFoundException(error.message)

        return data
    }

    async delete(path: string) {

        const { error } = await this.files().remove([path])

        if (error) throw new NotFoundException(error.message)      
    }

    getPublicUrl(path: string) {

        const { data } = this.files().getPublicUrl(path)

		return data.publicUrl
    }
}
