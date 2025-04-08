<!-- <template>
  <SideBar />
  <div>
    <button @click="toggleModal">모달 열기</button>
    <BaseModal :isModal="isModalOpen" @close="toggleModal" />
  </div>
</template> -->

<template>
  <Header />
  <div class="layout">
    <SideBar />
    <router-view class="router-view" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './components/common/BaseModal.vue'
import SideBar from './components/layout/SideBar.vue'
import Header from './components/layout/Header.vue'

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped>
.layout {
  display: flex;
}
.router-view {
  flex: 1;
  padding: 0.6rem;
}
</style>
