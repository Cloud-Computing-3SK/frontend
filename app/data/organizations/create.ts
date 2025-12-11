import type { CreateOrganizationRequest, CreateOrganizationResponse, CreateOrganizationError } from "@/types/organization"
import { ORGANIZATION_CREATE } from "./endpoint"
import { authenticatedFetch } from "@/utils/apiInterceptor"

export const useCreateOrganization = () => {
  const config = useRuntimeConfig()

  const createOrganization = async (data: CreateOrganizationRequest): Promise<CreateOrganizationResponse> => {
    const fullUrl = `${config.public.apiBase}${ORGANIZATION_CREATE}`
    
    const response = await authenticatedFetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      // Handle different error types
      const errorData = result as CreateOrganizationError
      
      if (errorData.error) {
        throw new Error(errorData.error)
      }
      
      if (errorData.detail) {
        throw new Error(errorData.detail)
      }
      
      if (errorData.errors?.name) {
        throw new Error(errorData.errors.name[0])
      }
      
      throw new Error(errorData.message || "Failed to create organization")
    }

    return result as CreateOrganizationResponse
  }

  return {
    createOrganization
  }
}
