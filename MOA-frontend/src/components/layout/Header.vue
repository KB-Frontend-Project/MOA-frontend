<template>
    <header class="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div class="d-flex align-items-center">
            <RouterLink to="/" class="d-flex align-items-center text-decoration-none text-dark">
                <img src="@/assets/logo.png" alt="moa logo" class="me-2" width="32" />
                <span class="navbar-brand mb-0 h1">moA</span>
            </RouterLink>
        </div>
  
      <div class="ms-auto position-relative">
        <button class="btn btn-success rounded-circle" @click="toggleMenu">+</button>
  
        <div
          v-if="menuOpen"
          class="position-absolute bg-white border rounded shadow mt-2 end-0"
          style="z-index: 1000; min-width: 180px"
        >
          <ul class="list-unstyled mb-0 py-2">
            <li class="px-3 py-2 hover-bg" @click="openSharedLedger">공동 가계부 생성</li>
            <li class="px-3 py-2 hover-bg" @click="openShakePiggyBank">통장 흔들기</li>
            <li class="px-3 py-2 hover-bg" @click="openTransactionPopup">거래 내역 작성</li>
          </ul>
        </div>
      </div>
      <div class="header-underline"></div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  const menuOpen = ref(false)
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  // 임시
  const openSharedLedger = () => {
    console.log('공동 가계부 생성')
    menuOpen.value = false
  }
  
  const openShakePiggyBank = () => {
    console.log('통장 흔들기')
    menuOpen.value = false
  }
  
  const openTransactionPopup = () => {
    console.log('거래 내역 작성 팝업 열기')
    menuOpen.value = false
  }
  </script>
  
  <style scoped>
  .hover-bg:hover {
    background-color: #ffffff;
    cursor: pointer;
  }

  .header-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background-color: #55B4A1;
}

  </style>
  