<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
    <div class="max-w-7xl mx-auto px-20 pt-8 mx-12">
    <div class="max-w-l mx-auto px-8 py-16 bg-white rounded-[20px]   flex flex-col items-center">
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

      <!-- Create Organization Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click.self="isModalOpen = false">
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
            <UButton block size="lg" type="submit" :disabled="!orgName"
            class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm"
            style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
            Create
          </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)
const orgName = ref('')

const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const handleCreateOrg = () => {
  // Simulate organization creation and redirect to members page
  const name = orgName.value.trim() || 'Organization'
  closeModal()
  orgName.value = ''
  navigateTo({ path: '/organization-members', query: { name } })
}
</script>
