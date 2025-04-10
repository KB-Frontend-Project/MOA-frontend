<template>
  <div :class="{ 'dark-mode': isDarkMode }" class="app-wrapper">
    <Header v-if="!noHeader" />
    <div class="layout">
      <SideBar v-if="!noSideBar" />
      <main class="router-view">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import BaseModal from './components/common/BaseModal.vue'
import SideBar from './components/layout/SideBar.vue'
import Header from './components/layout/Header.vue'
import SignUpPage from './pages/SignUpPage.vue'
import ProfileSettingPage from './pages/ProfileSettingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import ResetPasswordPage from './pages/ResetPasswordPage.vue'
import { useMoaStore } from '@/stores/moaStore'

const route = useRoute()
const store = useMoaStore()
const isModalOpen = ref(false)
const noHeader = computed(() => route.meta.noHeader)
const noSideBar = computed(() => route.meta.noSideBar)
const isDarkMode = computed(() => store.isDarkMode)
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

onMounted(() => {
  store.initDarkMode()
})
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.router-view {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.dark-mode {
  background-color: #1e1e1e;
  color: #eee;
}

.dark-mode .bg-light {
  background-color: #2b2b2b !important;
}
.dark-mode .text-dark {
  color: #eee !important;
}
.dark-mode .form-control {
  background-color: #3a3a3a;
  color: #eee;
  border-color: #555;
}
.dark-mode .card {
  background-color: #2a2a2a;
  color: #f0f0f0;
  border: 1px solid #444;
}
.app-wrapper.dark-mode {
  /* 다크모드 */
  background: #222;
  color: #eee;
}

.dark-mode .bg-light {
  background-color: #2b2b2b !important;
}
.dark-mode .text-dark {
  color: #eee !important;
}
.dark-mode .form-control {
  background-color: #3a3a3a;
  color: #eee;
  border-color: #555;
}
.dark-mode .card {
  background-color: #2a2a2a;
  color: #f0f0f0;
  border: 1px solid #444;
}
</style>
