import type { GetOrganizationUsersResponse } from "~/types/organization"
import { ORGANIZATION_GET_USERS } from "./endpoint"
import { authenticatedFetch } from "@/utils/apiInterceptor"

export const useGetOrganizationUsers = () => {
  const config = useRuntimeConfig()

  const getOrganizationUsers = async (): Promise<GetOrganizationUsersResponse> => {
    const fullUrl = `${config.public.apiBase}${ORGANIZATION_GET_USERS}`
    
    const response = await authenticatedFetch(fullUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (errorData.error === "You are not part of any organization") {
        throw new Error("NO_ORGANIZATION")
      }
      throw new Error(errorData.error || "Failed to get organization users")
    }

    return await response.json()
  }

  return { getOrganizationUsers }
}