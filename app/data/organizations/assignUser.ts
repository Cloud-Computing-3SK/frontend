import type { AssignUserResponse } from "~/types/organization"
import { ORGANIZATION_ASSIGN_USER } from "./endpoint"
import { authenticatedFetch } from "@/utils/apiInterceptor"

export const useAssignUser = () => {
  const config = useRuntimeConfig()

  const assignUser = async (userId: string): Promise<AssignUserResponse> => {
    const fullUrl = `${config.public.apiBase}${ORGANIZATION_ASSIGN_USER(userId)}`
    
    const response = await authenticatedFetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to assign user to organization")
    }

    return await response.json()
  }

  return { assignUser }
}