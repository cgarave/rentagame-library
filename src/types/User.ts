export interface User {
    id?: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    name: string
    image?: string | null | undefined
    isAdmin: boolean
    rentals?: string[]
}