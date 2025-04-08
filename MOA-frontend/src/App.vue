<template>
  <div>
    <button @click="toggleModal">모달 열기</button>
    <baseModal :isModal="isModalOpen" @close="toggleModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import baseModal from './components/common/baseModal.vue' 

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>
