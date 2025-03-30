import { compareSync, hashSync } from "bcryptjs"

export class Hash {
	constructor() {}

	hash(password: string) {
		return hashSync(password, 8)
	}

	compare(password: string, hash: string) {
		return compareSync(password, hash)
	}
}
