export interface NotesRequest {
  title: string
  notes: string
  deadline: string
  status: string
}

export interface NotesResponse {
  id: number
  title: string
  notes: string
  deadline: string
  status: string
  created_at: string
  updated_at: string
  user: number
}