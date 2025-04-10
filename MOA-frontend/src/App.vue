<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from './components/common/BaseModal.vue'
import SideBar from './components/layout/SideBar.vue'
import Header from './components/layout/Header.vue'
import SignUpPage from './pages/SignUpPage.vue'
import ProfileSettingPage from './pages/ProfileSettingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'

const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 90vh;
}
.router-view {
  flex: 1;
  padding: 0.6rem;
  height: inherit;
}
</style>
