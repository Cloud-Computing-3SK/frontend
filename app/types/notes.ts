export interface NotesRequest {
  title: string
  notes: string
  deadline: string
  status: string
}

export interface NotesResponse {
  id: number
  username: string
  title: string
  notes: string
  deadline: string
  status: string
  created_at: string
  updated_at: string
  user: number
  organization: string
}

export interface ReadNotesResponse {
  organization: string
  notes: NotesResponse[]
}