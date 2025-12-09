<script setup lang="ts">
import { ref } from 'vue'
import { useRegister } from '@/data/auth/register'

const form = ref({
  username: '',
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const { register } = useRegister()
const toast = useToast()

const onRegister = async () => {
  loading.value = true
  error.value = ''
  try {
    await register(form.value)
    
    toast.add({
      title: 'Registration Successful',
      description: 'Your account has been created. Please login.',
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    
    setTimeout(() => {
      navigateTo('/login')
    }, 1000)
  } catch (e: any) {
    error.value = e.message || 'Registration failed'
  
    toast.add({
      title: 'Registration Failed',
      description: e.message || 'Something went wrong. Please try again.',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20 flex items-center justify-center">
    <div class="w-full max-w-7xl px-4 md:px-20 py-12 flex justify-center">
      <div class="bg-white rounded-[20px] shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] p-12 border border-[#E5E5E5] flex flex-col" style="min-width:500px; max-width:550px;">
        <h2 class="text-[2.5rem] font-bold italic mb-6" style="font-family: 'Poppins', sans-serif; color: #000;">Register</h2>
        <form @submit.prevent="onRegister" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Username</label>
            <UInput v-model="form.username" placeholder="Username" size="xl"
              class="rounded-xl text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
              style="font-family: 'Poppins', sans-serif;" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Email</label>
            <UInput v-model="form.email" placeholder="Email" size="xl"
              class="rounded-xl text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
              style="font-family: 'Poppins', sans-serif;" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[1rem] font-base text-black" style="font-family: 'Poppins', sans-serif;">Password</label>
            <UInput v-model="form.password" placeholder="Password" type="password" size="xl"
              class="rounded-xl text-[1.1rem] font-medium border-none focus:ring-2 focus:ring-[#222] focus:outline-none"
              style="font-family: 'Poppins', sans-serif;" />
          </div>
          <UButton block size="xl" type="submit" :disabled="loading"
            class="mt-3 text-[1.1rem] font-base rounded-xl shadow-sm py-4"
            style="font-family: 'Poppins', sans-serif; background:#222; color:white;">
            Register
          </UButton>
        </form>
        <div v-if="error" class="mt-5 text-red-600 font-semibold" style="font-family: 'Poppins', sans-serif;">{{ error }}</div>
        <div class="mt-5 text-center">
          <span class="text-gray-600" style="font-family: 'Poppins', sans-serif;">Already have an account? </span>
          <NuxtLink to="/login" class="text-[#222] font-semibold hover:underline" style="font-family: 'Poppins', sans-serif;">
            Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>