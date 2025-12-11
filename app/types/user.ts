import type { Organization } from "./organization"

export interface SearchedUser {
  id: string
  username: string
  email: string
  organization: Organization | null
}

export interface SearchUserResponse {
  message: string
  count: number
  users: SearchedUser[]
}