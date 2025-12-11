import type { SearchUserResponse } from "~/types/user"
import { USER_SEARCH } from "./endpoint"
import { authenticatedFetch } from "@/utils/apiInterceptor"

export const useSearchUser = () => {
  const config = useRuntimeConfig()

  const searchUser = async (username: string): Promise<SearchUserResponse> => {
    const fullUrl = `${config.public.apiBase}${USER_SEARCH(username)}`
    
    const response = await authenticatedFetch(fullUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to search users")
    }

    return await response.json()
  }

  return { searchUser }
}