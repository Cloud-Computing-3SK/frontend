import { CREATE } from "./endpoint"
import type { NotesRequest, NotesResponse } from "~/types/notes"

export const useCreateNotes = () => {
  const config = useRuntimeConfig()

  const createNotes = async (data: NotesRequest): Promise<NotesResponse> => {
    const fullUrl = `${config.public.apiBase}${CREATE}`

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to createNotes")
    }

    return await response.json()
  }

  return { createNotes }
}