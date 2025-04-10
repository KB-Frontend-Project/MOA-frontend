<template>
  <div class="modal" v-if="isModal" @click="$emit('close')">
    <div class="card page" @click.stop>
      <div class="card-header d-flex align-items-center justify-content-between">
        <div class="title text-center flex-grow-1">{{ title }}</div>
        <button class="close-btn" aria-label="Close" @click="$emit('close')">×</button>
      </div>
      <div class="card-body p-4">
        {{ message }}
        <slot name="ledgerPopup"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  isModal: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '알림',
  },
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
.page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 32rem;
  border-radius: 0.5rem;
  overflow: hidden;
}
.card-header {
  background-color: #f8f9fa;
  padding: 1rem;
}
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
  color: #000;
}
.card-body {
  padding: 1.5rem;
  font-size: 1rem;
  color: #333;
}
</style>
