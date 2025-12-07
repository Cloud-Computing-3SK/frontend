<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50/30 to-yellow-50/20">
    <!-- Hero Section -->
    <div class="max-w-6xl mx-auto px-20 py-16 text-left mt-12">
      <h2 class="text-[3.3rem] font-bold text-left mb-6" style="font-family: 'Poppins', sans-serif; color: #000;">
        Organize Your <span class="text-orange-500">Tasks</span> at light speed
      </h2>
      <p class="text-[1.3rem] text-gray-700 mb-10 max-w-4xl leading-relaxed" style="font-family: 'Poppins', sans-serif;">
        Build your productivity workflow with biarInget's powerful task management, beautiful interface, and seamless organization. The same simplicity trusted by productive teams everywhere.
      </p>
      
      <div class="flex gap-4 justify-start">
        <NuxtLink to="/register">
          <button class="px-8 py-4 text-[1.1rem] font-semibold rounded-xl bg-[#222] text-white hover:bg-[#333] transition-colors flex items-center gap-2 shadow-[0_4px_12px_0_rgba(0,0,0,0.10)]"
            style="font-family: 'Poppins', sans-serif;">
            Get started
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Landing page
</script>
