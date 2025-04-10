<template>
  <div class="app-wrapper">
    <!-- Header, SideBar는 특정 페이지에서만 숨김 -->
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import BaseModal from './components/common/BaseModal.vue'
import SideBar from './components/layout/SideBar.vue'
import Header from './components/layout/Header.vue'
import SignUpPage from './pages/SignUpPage.vue'
import ProfileSettingPage from './pages/ProfileSettingPage.vue'
import LoginPage from './pages/LoginPage.vue'
import HomePage from './pages/HomePage.vue'
import RessetPasswordPage from './pages/RessetPasswordPage.vue'

const route = useRoute()

const isModalOpen = ref(false)
const noHeader = computed(() => route.meta.noHeader)
const noSideBar = computed(() => route.meta.noSideBar)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
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
</style>
