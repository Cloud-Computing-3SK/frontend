import { UPDATE } from "./endpoint"
import type { NotesRequest, NotesResponse } from "~/types/notes"

export const useUpdateNotes = () => {
  const config = useRuntimeConfig()

  const updateNotes = async (id: string, data: NotesRequest): Promise<NotesResponse> => {
    const fullUrl = `${config.public.apiBase}${UPDATE(id)}`

    const response = await fetch(fullUrl, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update notes")
    }

    return await response.json()
  }

  return { updateNotes }
}
