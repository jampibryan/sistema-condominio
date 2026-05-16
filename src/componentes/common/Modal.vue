<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  maxWidth: {
    type: String,
    default: 'max-w-xl' // Clase tailwind
  }
})

const emit = defineEmits(['close'])

const handleKeydown = (e) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" @click="emit('close')">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
        
        <!-- Modal Content -->
        <div 
          class="relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all" 
          :class="maxWidth"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 hide-on-print">
            <h3 class="text-lg font-bold text-slate-800">{{ title }}</h3>
            <button class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500" @click="emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-0 sm:p-2 overflow-y-auto max-h-[80vh]">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 hide-on-print">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active > div:nth-child(2) {
  animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.modal-fade-leave-active > div:nth-child(2) {
  animation: modal-pop-reverse 0.2s ease-in forwards;
}

@keyframes modal-pop {
  0% { transform: scale(0.95) translateY(10px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes modal-pop-reverse {
  0% { transform: scale(1) translateY(0); opacity: 1; }
  100% { transform: scale(0.95) translateY(10px); opacity: 0; }
}
</style>
