<template>
  <!-- Edit Modal -->
  <div v-if="isEditModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="isEditModalOpen = false">
    <div class="bg-white rounded-[30px] shadow-[0_8px_8px_0_rgba(0,0,0,0.25)] px-10 py-8 mx-4"
      style="max-width:500px; width:100%;">
      <h2 class="text-[2rem] font-bold italic mb-4" style="font-family: 'Poppins', sans-serif; color: #000;">Edit Task</h2>
      <form @submit.prevent="updateTask" class="flex flex-col gap-3">
        <div class="flex flex-col gap-2">
          <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Title</label>
          <UInput v-model="editForm.title" placeholder="Title" size="lg"
            class="rounded-xl text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
            style="font-family: 'Poppins', sans-serif;" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Notes</label>
          <UTextarea v-model="editForm.notes" placeholder="Notes" :rows="3"
            class="text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
            style="font-family: 'Poppins', sans-serif;" />
        </div>
        <div class="flex gap-4">
          <div class="flex flex-col gap-2 w-1/2">
            <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Due Date</label>
            <UInput v-model="editForm.deadline" type="date"
              class="text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
              style="font-family: 'Poppins', sans-serif;" />
          </div>
          <div class="flex flex-col gap-2 w-1/2">
            <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Status</label>
            <USelect v-model="editForm.status" :items="statusOptions" option-attribute="label" value-attribute="value"
              class="rounded-l text-[0.85rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
              style="font-family: 'Poppins', sans-serif;" />
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <UButton block size="lg" type="submit" :disabled="!editForm.title || !editForm.deadline"
            class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm"
            style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
            Update
          </UButton>
          <UButton block size="lg" type="button" @click="isEditModalOpen = false"
            class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            style="font-family: 'Poppins', sans-serif;">
            Cancel
          </UButton>
        </div>
      </form>
    </div>
  </div>

  <!-- Delete Modal -->
  <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="isDeleteModalOpen = false">
    <div class="bg-white rounded-[30px] shadow-[0_8px_8px_0_rgba(0,0,0,0.25)] px-10 py-8 mx-4"
      style="max-width:400px; width:100%;">
      <div class="flex flex-col items-center justify-center">
        <div class="text-[1.5rem] font-bold mb-3" style="font-family: 'Poppins', sans-serif; color: #000;">Delete Task?
        </div>
        <div class="text-[1rem] text-gray-700 mb-6 text-center" style="font-family: 'Poppins', sans-serif;">Are you sure
          you want to delete this task?</div>
        <div class="flex gap-3 w-full">
          <button @click="confirmDelete"
            class="flex-1 text-[1rem] font-semibold rounded-xl py-3 bg-red-600 text-white hover:bg-red-700"
            style="font-family: 'Poppins', sans-serif;">
            Delete
          </button>
          <button @click="isDeleteModalOpen = false"
            class="flex-1 text-[1rem] font-semibold rounded-xl py-3 border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            style="font-family: 'Poppins', sans-serif;">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
    <div class="max-w-7xl mx-auto px-20 pt-8 mx-12">
      <div class="grid grid-cols-1 md:grid-cols-2 items-center ">
        <div>
          <span class="text-[2.5rem] font-bold italic" style="font-family: 'Poppins', sans-serif; color: #000;">My Task</span>
        </div>
        <div class="flex items-center justify-end mt-4 md:mt-0 gap-2">
          <label class="text-[1rem] font-medium" style="font-family: 'Poppins', sans-serif;">Sort by date:</label>
          <USelect
            v-model="sortOrder"
            :items="[
              { value: 'desc', label: 'Newest' },
              { value: 'asc', label: 'Oldest' }
            ]"
            option-attribute="label"
            value-attribute="value"
            class="w-32 text-[1rem] font-medium"
            style="font-family: 'Poppins', sans-serif;"
          />
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-20 pt-8 pb-12 mx-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div class="flex flex-col gap-8">
            <div v-for="task in sortedTasks" :key="task.id" class="flex gap-4 items-stretch">
              <!-- Date Left -->
              <div class="flex flex-col items-center justify-center w-20 flex-shrink-0 pt-2"
                style="font-family: 'Poppins', sans-serif;">
                <div class="text-[2rem] font-bold leading-none" style="color:#000">{{ task.day }}</div>
                <div class="text-[1.2rem] font-bold text-[#222] tracking-wide uppercase">{{ task.month }}</div>
              </div>
              <!-- Task Card -->
              <div
                class="flex-1 bg-white rounded-[20px] shadow-[0_8px_8px_0_rgba(0,0,0,0.25)] p-7 border border-[#E5E5E5] flex flex-col justify-center"
                style="min-width:260px;">
                <div class="flex justify-between items-start mb-1">
                  <div>
                    <div class="text-[1.4rem] font-bold leading-tight mb-1"
                      style="font-family: 'Poppins', sans-serif; color:#000">{{ task.title }}</div>
                    <div class="text-[1rem] text-[#222] mb-2" style="font-family: 'Poppins', sans-serif;">{{ task.notes
                      }}</div>
                  </div>
                  <div class="relative">
                    <button @click="toggleDropdown(task.id)" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </button>
                    <div v-if="activeDropdown === task.id"
                      class="absolute right-0  w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <button @click="openEditModal(task); activeDropdown = null"
                        class="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left rounded-t-lg transition-colors"
                        style="font-family: 'Poppins', sans-serif;">
                        Edit
                      </button>
                      <button @click="openDeleteModal(task.id); activeDropdown = null"
                        class="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-left text-red-600 rounded-b-lg transition-colors"
                        style="font-family: 'Poppins', sans-serif;">
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
                <div>
                  <span v-if="task.status === 'done'"
                    class="bg-[#CFF7D1] text-[#2B7A2B] text-[1rem] font-medium rounded-md px-4 py-1 inline-block shadow-sm"
                    style="font-family: 'Poppins', sans-serif;">Done</span>
                  <span v-else-if="task.status === 'in_progress'"
                    class="bg-[#F8F7C1] text-[#8A7B00] text-[1rem] font-medium rounded-md px-4 py-1 inline-block shadow-sm"
                    style="font-family: 'Poppins', sans-serif;">In Progress</span>
                  <span v-else
                    class="bg-[#FFD6D6] text-[#B91C1C] text-[1rem] font-medium rounded-md px-4 py-1 inline-block shadow-sm"
                    style="font-family: 'Poppins', sans-serif;">To Do</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Empty State -->
          <div v-if="tasks.length === 0" class="text-center py-16">
            <div class="text-gray-400 dark:text-gray-600 mb-4">
              <UIcon name="i-lucide-inbox" class="text-6xl" />
            </div>
            <h3 class="text-xl font-semibold mb-2">No tasks yet</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">Create your first task to get started</p>
          </div>
        </div>

        <div>
          <div
            class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] p-10 border border-[#E5E5E5] sticky flex flex-col "
            style="min-width:380px; max-width:440px;">
            <h2 class="text-[2.5rem] font-bold italic mb-3" style="font-family: 'Poppins', sans-serif; color: #000;">New
              Task</h2>
            <form @submit.prevent="saveTask" class="flex flex-col gap-3">
              <div class="flex flex-col gap-2">
                <label class="text-[1rem] font-base text-black"
                  style="font-family: 'Poppins', sans-serif;">Title</label>
                <UInput v-model="form.title" placeholder="Title" size="lg"
                  class=" rounded-xl text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                  style="font-family: 'Poppins', sans-serif;" />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-[1rem] font-base text-black"
                  style="font-family: 'Poppins', sans-serif;">Notes</label>
                <UTextarea v-model="form.notes" placeholder="Notes" :rows="3"
                  class="text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                  style="font-family: 'Poppins', sans-serif;" />
              </div>
              <div class="flex gap-4">
                <div class="flex flex-col gap-2 w-1/2">
                  <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Due
                    Date</label>
                  <UInput v-model="form.deadline" type="date"
                    class="text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                    style="font-family: 'Poppins', sans-serif;" />
                </div>
                <div class="flex flex-col gap-2 w-1/2">
                  <label class="text-[1rem] font-base text-black"
                    style="font-family: 'Poppins', sans-serif;">Status</label>
              <USelect v-model="form.status" :items="statusOptions" option-attribute="label" value-attribute="value"
                    class="rounded-l text-[0.85rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                    style="font-family: 'Poppins', sans-serif;" />
                </div>
              </div>
              <UButton block size="lg" type="submit" :disabled="!form.title || !form.deadline"
                class="mt-2 text-[1.1rem] font-base rounded-xl shadow-sm"
                style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
                Add Task
              </UButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

import { useCreateNotes } from '~/data/notes/create'
import { useUpdateNotes } from '~/data/notes/update'
import { useDeleteNotes } from '~/data/notes/delete'
import { useCreateNotes as useReadNotes } from '~/data/notes/read'
import type { NotesRequest, NotesResponse } from '~/types/notes'

interface Task {
  id: number
  title: string
  notes: string
  status: string
  deadline: string
  day: string
  month: string
}

const tasks = ref<Task[]>([])

const { createNotes } = useCreateNotes()
const { updateNotes } = useUpdateNotes()
const { deleteNotes } = useDeleteNotes()
const { createNotes: readNotes } = useReadNotes()

onMounted(async () => {
  try {
    const res = await readNotes({} as any)
    tasks.value = res.map((item: NotesResponse) => {
      const dateDisplay = formatDateDisplay(item.deadline)
      return {
        ...item,
        day: dateDisplay.day,
        month: dateDisplay.month
      }
    })
  } catch (e) {
    // handle error
  }
})

const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const editingTask = ref<Task | null>(null)
const taskToDelete = ref<number | null>(null)
const activeDropdown = ref<number | null>(null)

const form = ref({
  title: '',
  notes: '',
  status: 'To Do',
  deadline: ''
})

const editForm = ref({
  title: '',
  notes: '',
  status: 'To Do',
  deadline: ''
})

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
]

const sortOrder = ref<'asc' | 'desc'>('desc')
const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    } else {
      return new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
    }
  })
})

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Pending': 'red',
    'On Progress': 'yellow',
    'Complete': 'green'
  }
  return colors[status] || 'gray'
}

const getTaskActions = (task: Task) => [
  [{
    label: 'Edit',
    icon: 'i-lucide-pencil',
    click: () => openEditModal(task)
  }],
  [{
    label: 'Delete',
    icon: 'i-lucide-trash-2',
    click: () => openDeleteModal(task.id)
  }]
]

const formatDateDisplay = (deadline: string) => {
  const date = new Date(deadline)
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  return {
    day: date.getDate().toString(),
    month: months[date.getMonth()]
  }
}

const saveTask = async () => {
  if (!form.value.title || !form.value.deadline) {
    return
  }

  try {
    if (editingTask.value) {
      // Update existing task
      const updated = await updateNotes(editingTask.value.id.toString(), {
        ...form.value,
        deadline: form.value.deadline // string 'YYYY-MM-DD'
      })
      const dateDisplay = formatDateDisplay(updated.deadline)
      const index = tasks.value.findIndex(t => t.id === editingTask.value!.id)
      if (index !== -1) {
        tasks.value[index] = {
          ...updated,
          day: dateDisplay.day,
          month: dateDisplay.month
        }
      }
      editingTask.value = null
    } else {
      // Create new task
      const created = await createNotes({
        ...form.value,
        deadline: form.value.deadline // string 'YYYY-MM-DD'
      })
      const dateDisplay = formatDateDisplay(created.deadline)
      tasks.value.push({
        ...created,
        day: dateDisplay.day,
        month: dateDisplay.month
      })
    }
    // Reset form
    form.value = {
      title: '',
      notes: '',
      status: 'Pending',
      deadline: ''
    }
  } catch (e) {
    // handle error
  }
}

const openEditModal = (task: Task) => {
  editingTask.value = task
  editForm.value = {
    title: task.title,
    notes: task.notes,
    status: task.status,
    deadline: task.deadline
  }
  isEditModalOpen.value = true
}

const updateTask = async () => {
  if (!editForm.value.title || !editForm.value.deadline || !editingTask.value) {
    return
  }
  try {
    const updated = await updateNotes(editingTask.value.id.toString(), {
      ...editForm.value,
      deadline: editForm.value.deadline // string 'YYYY-MM-DD'
    })
    const dateDisplay = formatDateDisplay(updated.deadline)
    const index = tasks.value.findIndex(t => t.id === editingTask.value!.id)
    if (index !== -1) {
      tasks.value[index] = {
        ...updated,
        day: dateDisplay.day,
        month: dateDisplay.month
      }
    }
    isEditModalOpen.value = false
    editingTask.value = null
  } catch (e) {
    // handle error
  }
}

const cancelEdit = () => {
  editingTask.value = null
  form.value = {
    title: '',
    notes: '',
    status: 'Pending',
    deadline: ''
  }
}

const openDeleteModal = (id: number) => {
  taskToDelete.value = id
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (taskToDelete.value) {
    try {
      await deleteNotes(taskToDelete.value.toString())
      tasks.value = tasks.value.filter(t => t.id !== taskToDelete.value)
    } catch (e) {
      // handle error
    }
  }
  isDeleteModalOpen.value = false
  taskToDelete.value = null
}

const toggleDropdown = (taskId: number) => {
  activeDropdown.value = activeDropdown.value === taskId ? null : taskId
}
</script>
