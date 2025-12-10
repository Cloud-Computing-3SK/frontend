import { DELETE } from "./endpoint";

export const useDeleteNotes = () => {
  const config = useRuntimeConfig();

  const deleteNotes = async (id: string): Promise<void> => {
    const response = await fetch(`${config.public.apiBase}${DELETE(id)}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete notes");
    }
  };

  return { deleteNotes };
};