<template>
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
        <div class="max-w-7xl mx-auto px-20 pt-8 pb-12">
          <!-- Loading State -->
          <div v-if="loading" class="max-w-4xl mx-auto px-8 py-16 bg-white rounded-[20px] flex flex-col items-center">
            <UIcon name="i-lucide-loader-2" class="text-6xl text-gray-300 mb-6 animate-spin" />
            <p class="text-[1rem] text-gray-600" style="font-family: 'Poppins', sans-serif;">Loading members...</p>
          </div>

          <!-- Members List -->
          <div v-else class="max-w-4xl mx-auto px-8 py-16 bg-white rounded-[20px]">
            <h2 class="text-[2rem] font-bold italic mb-6 text-start"
                style="font-family: 'Poppins', sans-serif; color: #000;">
                {{ orgName }} Members
            </h2>
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-[1.2rem] font-semibold" style="font-family: 'Poppins', sans-serif; color: #222;">
                  {{ members.length }} {{ members.length === 1 ? 'Member' : 'Members' }}
                </h3>
                <UButton @click="openAddMemberModal" size="md" class="rounded-xl shadow-sm bg-[#222] text-white text-[1rem] font-base hover:bg-[#333] transition-colors px-4 flex items-center gap-2" style="font-family: 'Poppins', sans-serif; background:#222;">
                    <UIcon name="i-lucide-user-plus" class="w-5 h-5" />
                    Add Member
                </UButton>
            </div>
            <div class="overflow-x-auto">
                <div class="flex flex-col gap-4">
                    <div v-for="member in members" :key="member.id"
                        class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] p-6 border border-[#E5E5E5] hover:shadow-lg transition-shadow">
                        <div class="flex items-center gap-4">
                          <div class="flex-shrink-0">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                              <span class="text-white font-bold text-lg" style="font-family: 'Poppins', sans-serif;">
                                {{ member.username.charAt(0).toUpperCase() }}
                              </span>
                            </div>
                          </div>
                          <div class="flex-1">
                            <div class="text-[1.1rem] font-semibold mb-1"
                                style="font-family: 'Poppins', sans-serif; color: #000;">{{ member.username }}</div>
                            <div class="text-[0.95rem] text-gray-600"
                                style="font-family: 'Poppins', sans-serif;">{{ member.email }}</div>
                          </div>
                        </div>
                    </div>
                    <div v-if="members.length === 0" class="text-center py-16">
                        <div class="text-gray-400 mb-4 flex justify-center">
                            <UIcon name="i-lucide-users" class="text-6xl" />
                        </div>
                        <p class="text-gray-600" style="font-family: 'Poppins', sans-serif;">No members yet</p>
                    </div>
                </div>
            </div>

            <!-- Add Member Modal -->
            <div v-if="isAddMemberOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                @click.self="closeAddMemberModal">
                <div class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] px-8 py-8 mx-4 flex flex-col items-center"
                    style="max-width:380px; width:100%;">
                    <h3 class="text-[1.3rem] font-bold italic mb-4 text-center"
                        style="font-family: 'Poppins', sans-serif; color: #000;">Add Member</h3>
                    
                    <!-- Search Input -->
                    <div class="w-full flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-[1rem] font-base text-black"
                                style="font-family: 'Poppins', sans-serif;">Username</label>
                            <UInput v-model="searchQuery" @input="handleSearchInput" placeholder="Enter username" size="lg"
                                class="rounded-xl text-[1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                                style="font-family: 'Poppins', sans-serif;" />
                        </div>

                        <!-- Search Results -->
                        <div v-if="searchResults.length > 0" class="flex flex-col gap-2 max-h-64 overflow-y-auto">
                            <div v-for="user in searchResults" :key="user.id"
                                @click="selectUser(user)"
                                class="p-3 rounded-xl border border-gray-200 hover:border-[#222] hover:bg-gray-50 cursor-pointer transition-all">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                                        <span class="text-white font-bold text-sm" style="font-family: 'Poppins', sans-serif;">
                                            {{ user.username.charAt(0).toUpperCase() }}
                                        </span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="text-[0.95rem] font-semibold truncate" style="font-family: 'Poppins', sans-serif; color: #000;">
                                            {{ user.username }}
                                        </div>
                                        <div class="text-[0.85rem] text-gray-600 truncate" style="font-family: 'Poppins', sans-serif;">
                                            {{ user.email }}
                                        </div>
                                        <div v-if="user.organization" class="text-[0.75rem] text-gray-500 truncate" style="font-family: 'Poppins', sans-serif;">
                                            {{ user.organization.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- No Results -->
                        <div v-else-if="searchQuery && !loadingSearch && searchResults.length === 0" class="text-center py-4">
                            <p class="text-gray-500 text-sm" style="font-family: 'Poppins', sans-serif;">No users found</p>
                        </div>

                        <!-- Loading Search -->
                        <div v-if="loadingSearch" class="flex justify-center py-4">
                            <UIcon name="i-lucide-loader-2" class="text-2xl text-gray-400 animate-spin" />
                        </div>

                        <!-- Selected User -->
                        <div v-if="selectedUser" class="p-4 rounded-xl bg-gray-50 border border-gray-200">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center">
                                    <span class="text-white font-bold text-lg" style="font-family: 'Poppins', sans-serif;">
                                        {{ selectedUser.username.charAt(0).toUpperCase() }}
                                    </span>
                                </div>
                                <div class="flex-1">
                                    <div class="text-[1rem] font-semibold" style="font-family: 'Poppins', sans-serif; color: #000;">
                                        {{ selectedUser.username }}
                                    </div>
                                    <div class="text-[0.9rem] text-gray-600" style="font-family: 'Poppins', sans-serif;">
                                        {{ selectedUser.email }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3 mt-2">
                            <UButton block size="lg" type="button" @click="closeAddMemberModal"
                                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm border-2 hover:bg-[#333] border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                style="font-family: 'Poppins', sans-serif;">
                                Cancel
                            </UButton>
                            <UButton block size="lg" type="button" @click="handleAddMember" :disabled="!selectedUser || loadingAdd"
                                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm hover:bg-[#333]"
                                style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
                                {{ loadingAdd ? 'Adding...' : 'Add' }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGetOrganizationUsers } from '@/data/organizations/getUsers'
import { useAssignUser } from '@/data/organizations/assignUser'
import { useSearchUser } from '@/data/user/search'
import type { OrganizationUser } from '~/types/organization'
import type { SearchedUser } from '~/types/user'

definePageMeta({
  middleware: 'auth'
})

const searchQuery = ref('')
const searchResults = ref<SearchedUser[]>([])
const selectedUser = ref<SearchedUser | null>(null)
const orgName = ref('Organization')
const members = ref<OrganizationUser[]>([])
const isAddMemberOpen = ref(false)
const loading = ref(true)
const loadingAdd = ref(false)
const loadingSearch = ref(false)

let searchTimeout: NodeJS.Timeout | null = null

const { getOrganizationUsers } = useGetOrganizationUsers()
const { assignUser } = useAssignUser()
const { searchUser } = useSearchUser()
const toast = useToast()

onMounted(async () => {
  await fetchMembers()
})

const fetchMembers = async () => {
  loading.value = true
  try {
    const data = await getOrganizationUsers()
    orgName.value = data.organization
    members.value = data.users
  } catch (e: any) {
    toast.add({
      title: 'Error',
      description: e.message || 'Failed to load members',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    navigateTo('/organization')
  } finally {
    loading.value = false
  }
}

const openAddMemberModal = () => {
  isAddMemberOpen.value = true
  searchQuery.value = ''
  searchResults.value = []
  selectedUser.value = null
}

const closeAddMemberModal = () => {
  isAddMemberOpen.value = false
  searchQuery.value = ''
  searchResults.value = []
  selectedUser.value = null
}

const handleSearchInput = async () => {
  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Reset selected user when typing
  selectedUser.value = null

  // If search query is empty, clear results
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  // Debounce search
  searchTimeout = setTimeout(async () => {
    loadingSearch.value = true
    try {
      const data = await searchUser(searchQuery.value.trim())
      searchResults.value = data.users
    } catch (e: any) {
      toast.add({
        title: 'Search Failed',
        description: e.message || 'Failed to search users',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      searchResults.value = []
    } finally {
      loadingSearch.value = false
    }
  }, 500)
}

const selectUser = (user: SearchedUser) => {
  selectedUser.value = user
  searchQuery.value = user.username
  searchResults.value = []
}

const handleAddMember = async () => {
  if (!selectedUser.value) {
    toast.add({
      title: 'Invalid Selection',
      description: 'Please select a user to add.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  loadingAdd.value = true
  
  try {
    const response = await assignUser(selectedUser.value.id)
    
    toast.add({
      title: 'Member Added',
      description: `${response.user.username} has been added to ${response.organization}!`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    // Close modal and reset
    closeAddMemberModal()
    
    // Refresh members list
    await fetchMembers()
    
  } catch (e: any) {
    toast.add({
      title: 'Failed to Add Member',
      description: e.message || 'Something went wrong. Please try again.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loadingAdd.value = false
  }
}
</script>