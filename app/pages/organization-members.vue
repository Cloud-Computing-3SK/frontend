<template>
    <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
        <div class="max-w-4xl mx-auto px-8 py-16 bg-white rounded-[20px]">
            <h2 class="text-[2rem] font-bold italic mb-6 text-start"
                style="font-family: 'Poppins', sans-serif; color: #000;">
                {{ orgName }} Organization Members
            </h2>
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-[1.2rem] font-semibold" style="font-family: 'Poppins', sans-serif; color: #222;">Members
                </h3>
                <UButton @click="isAddMemberOpen = true" size="md" class="rounded-xl shadow-sm bg-[#222] text-white text-[1rem] font-base hover:bg-[#333] transition-colors px-4 flex items-center gap-2" style="font-family: 'Poppins', sans-serif; background:#222;">
                    <UIcon name="i-lucide-user-plus" class="w-5 h-5" />
                    Add Member
                </UButton>
            </div>
            <div class="overflow-x-auto">
               
                    <div class="flex flex-col gap-4">
                        <div v-for="member in members" :key="member.email"
                            class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] p-6 border border-[#E5E5E5] hover:shadow-lg transition-shadow">
                            <div class="text-[1.1rem] font-semibold mb-1"
                                style="font-family: 'Poppins', sans-serif; color: #000;">{{ member.name }}</div>
                            <div class="text-[0.95rem] text-gray-600"
                                style="font-family: 'Poppins', sans-serif;">{{ member.email }}</div>
                        </div>
                        <div v-if="members.length === 0" class="text-center py-16">
                            <div class="text-gray-400 mb-4 flex justify-center">
                                <UIcon name="i-lucide-users" class="text-6xl" />
                            </div>
                            <p class="text-gray-600" style="font-family: 'Poppins', sans-serif;">No members yet
                            </p>
                        </div>
              
                </div>
            </div>

            <!-- Add Member Modal -->
            <div v-if="isAddMemberOpen" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                @click.self="isAddMemberOpen = false">
                <div class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] px-8 py-8 mx-4 flex flex-col items-center"
                    style="max-width:340px; width:100%;">
                    <h3 class="text-[1.3rem] font-bold italic mb-4 text-center"
                        style="font-family: 'Poppins', sans-serif; color: #000;">Add Member</h3>
                    <form @submit.prevent="" class="w-full flex flex-col gap-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-[1rem] font-base text-black"
                                style="font-family: 'Poppins', sans-serif;">Username</label>
                            <UInput v-model="newMember.name" placeholder="Enter name" size="lg"
                                class="rounded-xl text-[1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
                                style="font-family: 'Poppins', sans-serif;" />
                        </div>
                        <div class="flex gap-3 mt-2">
                            <UButton block size="lg" type="button" @click="isAddMemberOpen = false"
                                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm border-2 hover:bg-[#333] border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                style="font-family: 'Poppins', sans-serif;">
                                Cancel
                            </UButton>
                            <UButton block size="lg" type="submit" :disabled="!newMember.name"
                                class="flex-1 text-[1.1rem] font-base rounded-xl shadow-sm hover:bg-[#333]"
                                style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
                                Add
                            </UButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const newMember = ref<{ name: string; }>({ name: '' })
const route = useRoute()
const orgName = ref(route.query.name || 'Organization')
const members = ref<Array<{ name: string; email: string }>>([
    { name: 'alice', email: 'alice@example.com' },
    { name: 'bob', email: 'bob@example.com' },
    { name: 'charlie', email: 'charlie@example.com' },
    { name: 'david', email: 'david@example.com' },
    { name: 'eve', email: 'eve@example.com' }
])
const isAddMemberOpen = ref(false)
</script>
