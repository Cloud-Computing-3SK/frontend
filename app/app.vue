<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'biarInget - Your Task Manager'
const description = 'Organize your tasks at light speed with biarInget. Build your productivity workflow with powerful task management and beautiful interface.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})

// Use auth composable
const { isAuthenticated, logout: authLogout, checkAuth } = useAuth()

// Check auth on mount
onMounted(() => {
  checkAuth()
})

const logout = () => {
  authLogout()
  navigateTo('/login')
}
</script>

<template>
  <UApp>
    <!-- Header/Nav - Always Show -->
    <div class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm max-w-7xl mx-auto px-20 pt-4 pb-4 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <NuxtLink to="/">
          <h1 class="text-[1.7rem] font-bold italic cursor-pointer hover:opacity-80 transition-opacity" style="font-family: 'Poppins', sans-serif; color: #000;">
            biarInget
          </h1>
        </NuxtLink>
        <div class="flex items-center gap-6">
          <template v-if="isAuthenticated">
            <button @click="logout" class="px-6 py-2 text-[0.86rem] font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              style="font-family: 'Poppins', sans-serif;">
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <button class="px-6 py-2 text-[0.86rem] font-medium text-gray-700 hover:text-gray-900"
                style="font-family: 'Poppins', sans-serif;">
                Sign in
              </button>
            </NuxtLink>
            <NuxtLink to="/register">
              <button class="px-6 py-2 text-[0.86rem] font-semibold rounded-xl bg-[#222] text-white hover:bg-[#333] transition-colors flex items-center gap-2 shadow-sm"
                style="font-family: 'Poppins', sans-serif;">
                Sign up
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          3SK • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>