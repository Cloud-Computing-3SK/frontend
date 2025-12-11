import { READ } from "./endpoint"
import type { ReadNotesResponse } from "~/types/notes"

export const useCreateNotes = () => {
  const config = useRuntimeConfig()

  const createNotes = async (): Promise<ReadNotesResponse> => {
    const fullUrl = `${config.public.apiBase}${READ}`

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      // Check for "not part of any organization" error
      if (errorData.error && errorData.error.includes("not part of any organization")) {
        throw new Error("NO_ORGANIZATION")
      }
      throw new Error(errorData.error || errorData.message || "Failed to fetch notes")
    }

    return await response.json()
  }

  return { createNotes }
}