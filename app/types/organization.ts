export interface CreateOrganizationRequest {
  name: string
}

export interface Organization {
  id: string
  name: string
}

export interface CreateOrganizationResponse {
  message: string
  organization: Organization
}

export interface CreateOrganizationError {
  error?: string
  detail?: string
  message?: string
  errors?: {
    name?: string[]
    [key: string]: string[] | undefined
  }
}

export interface OrganizationUser {
  id: string
  username: string
  email: string
  organization: Organization
}

export interface GetOrganizationUsersResponse {
  message: string
  organization: string
  count: number
  users: OrganizationUser[]
}

export interface GetOrganizationUsersError {
  error: string
}

export interface AssignUserResponse {
  message: string
  organization: string
  user: {
    id: string
    username: string
    email: string
  }
}

export interface AssignUserError {
  message: string
}