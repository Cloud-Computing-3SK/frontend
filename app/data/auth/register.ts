import type { RegisterRequest, RegisterResponse } from "~/types/register"
import { AUTH_REGISTER } from "./endpoint"

export const useRegister = () => {
  const config = useRuntimeConfig()

  const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const fullUrl = `${config.public.apiBase}${AUTH_REGISTER}`

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to register user")
    }

    return await response.json()
  }

  return { register }
}