<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
    <div class="max-w-7xl mx-auto px-20 pt-8 pb-12">
      <!-- Loading State -->
      <div v-if="loading" class="max-w-4xl mx-auto px-8 py-16 bg-white rounded-[20px] flex flex-col items-center">
        <UIcon name="i-lucide-loader-2" class="text-6xl text-gray-300 mb-6 animate-spin" />
        <p class="text-[1rem] text-gray-600" style="font-family: 'Poppins', sans-serif;">Loading organization...</p>
      </div>

      <!-- No Organization State -->
      <div v-else-if="!hasOrganization" class="max-w-l mx-auto px-8 py-16 bg-white rounded-[20px] flex flex-col items-center">
        <UIcon name="i-lucide-users" class="text-6xl text-gray-300 mb-6" />
        <h2 class="text-[1.5rem] font-bold italic mb-3 text-center" style="font-family: 'Poppins', sans-serif; color: #000;">You haven't joined any organization</h2>
        <p class="text-[0.8rem] text-gray-700 mb-8 text-center" style="font-family: 'Poppins', sans-serif;">To manage tasks with your team, join or create an organization.</p>
        <div class="flex flex-col items-center w-full max-w-xs mt-6">
          <UButton
            size="lg"
            class="rounded-xl shadow-sm bg-[#222] text-white text-[1.1rem] font-base hover:bg-[#333] transition-colors w-56"
            style="font-family: 'Poppins', sans-serif; background:#222;"
            @click="openModal"
          >
            Create New Organization
          </UButton>
        </div>
      </div>

      <!-- Has Organization - Show Organization Info & Redirect Button -->
      <div v-else class="max-w-4xl mx-auto px-8 py-16 bg-white rounded-[20px] flex flex-col items-center">
        <UIcon name="i-lucide-building-2" class="text-6xl text-gray-300 mb-6" />
        <h2 class="text-[2rem] font-bold italic mb-3 text-center" style="font-family: 'Poppins', sans-serif; color: #000;">
          {{ organizationData?.organization }}
        </h2>
        <p class="text-[1rem] text-gray-600 mb-8 text-center" style="font-family: 'Poppins', sans-serif;">
          {{ organizationData?.count }} {{ organizationData?.count === 1 ? 'Member' : 'Members' }}
        </p>
        <UButton
          size="lg"
          @click="navigateTo('/organization-members')"
          class="rounded-xl shadow-sm bg-[#222] text-white text-[1.1rem] font-base hover:bg-[#333] transition-colors w-56 flex items-center justify-center gap-2"
          style="font-family: 'Poppins', sans-serif; background:#222;">
          <UIcon name="i-lucide-users" class="w-5 h-5" />
          View Members
        </UButton>
      </div>

      <!-- Create Organization Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="closeModal">
        <div class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] px-8 py-8 mx-4 flex flex-col items-center" style="max-width:340px; width:100%;">
          <h3 class="text-[1.3rem] font-bold italic mb-4 text-center" style="font-family: 'Poppins', sans-serif; color: #000;">Create Organization</h3>
          <form @submit.prevent="handleCreateOrg" class="w-full flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Organization Name</label>
              <UInput v-model="orgName" placeholder="Enter organization name" size="lg"
                class="rounded-xl text-[1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                style="font-family: 'Poppins', sans-serif;" />
            </div>
            <div class="flex gap-3 mt-2"> 
              <UButton block size="lg" type="button" @click="closeModal"
                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                style="font-family: 'Poppins', sans-serif;">
                Cancel
              </UButton>
              <UButton block size="lg" type="submit" :disabled="!orgName || loadingCreate"
                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm"
                style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
                {{ loadingCreate ? 'Creating...' : 'Create' }}
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCreateOrganization } from '@/data/organizations/create'
import { useGetOrganizationUsers } from '@/data/organizations/getUsers'
import type { GetOrganizationUsersResponse } from '~/types/organization'

definePageMeta({
  middleware: 'auth'
})

const isModalOpen = ref(false)
const orgName = ref('')
const loadingCreate = ref(false)
const loading = ref(true)
const hasOrganization = ref(false)
const organizationData = ref<GetOrganizationUsersResponse | null>(null)

const { createOrganization } = useCreateOrganization()
const { getOrganizationUsers } = useGetOrganizationUsers()
const toast = useToast()

// Fetch organization data on mount
onMounted(async () => {
  await fetchOrganizationData()
})

const fetchOrganizationData = async () => {
  loading.value = true
  try {
    const data = await getOrganizationUsers()
    organizationData.value = data
    hasOrganization.value = true
  } catch (e: any) {
    if (e.message === "NO_ORGANIZATION") {
      hasOrganization.value = false
    } else {
      toast.add({
        title: 'Error',
        description: e.message || 'Failed to load organization data',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
    }
  } finally {
    loading.value = false
  }
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  orgName.value = ''
}

const handleCreateOrg = async () => {
  if (!orgName.value.trim()) {
    toast.add({
      title: 'Invalid Input',
      description: 'Organization name cannot be empty.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
    return
  }

  loadingCreate.value = true
  
  try {
    const response = await createOrganization({ name: orgName.value.trim() })
    
    toast.add({
      title: 'Organization Created',
      description: `${response.organization.name} has been created successfully!`,
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    closeModal()
    
    // Refresh organization data
    await fetchOrganizationData()
    
  } catch (e: any) {
    toast.add({
      title: 'Failed to Create Organization',
      description: e.message || 'Something went wrong. Please try again.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loadingCreate.value = false
  }
}
</script>