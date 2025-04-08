<template>
  <div>
    <button @click="toggleModal">모달 열기</button>
    <BaseModal :isModal="isModalOpen" @close="toggleModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './components/common/BaseModal.vue' // 경로는 네 폴더구조에 맞게

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>
