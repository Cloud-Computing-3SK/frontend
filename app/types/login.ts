export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
  auth_user_id: number
  app_user_id: string
  username: string
  email: string
}