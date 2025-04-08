<template>
  <router-view />
</template>

<script setup>
import { ref } from 'vue'
import baseModal from './components/common/BaseModal.vue'
import SideBar from './components/layout/SideBar.vue'
import Header from './components/layout/Header.vue'
import SignUpPage from './pages/SignUpPage.vue'


const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped></style>
