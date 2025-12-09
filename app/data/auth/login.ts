import type { LoginRequest, LoginResponse } from "~/types/login"
import { AUTH_LOGIN } from "./endpoint"

export const useLogin = () => {
  const config = useRuntimeConfig()

  const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const fullUrl = `${config.public.apiBase}${AUTH_LOGIN}`

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to login")
    }

    return await response.json()
  }

  return { login }
}