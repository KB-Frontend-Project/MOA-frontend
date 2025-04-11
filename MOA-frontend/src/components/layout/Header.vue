<template>
  <div :class="{ 'isDark-mode': isDarkMode }">
    <header class="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div class="d-flex align-items-center">
        <RouterLink to="/" class="d-flex align-items-center text-decoration-none text-dark">
          <img src="@/assets/logo.png" alt="moa logo" class="me-2" width="32" />
          <span class="navbar-brand mb-0 h1">moA</span>
        </RouterLink>
      </div>

      <div class="ms-auto d-flex align-items-center gap-3 position-relative">
        <label class="switch">
          <input type="checkbox" v-model="isDarkMode" />
          <span class="slider round">
            <span class="icon moon">🌙</span>
            <span class="icon sun">☀️</span>
          </span>
        </label>

        <!-- 종 아이콘 + 뱃지 -->
        <div class="position-relative" @click="toggleAlert" style="cursor: pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            fill="#55b4a1"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C10.35 2 9 3.35 9 5v1.09C6.16 7.25 4 9.92 4 13v4l-2 2v1h20v-1l-2-2v-4c0-3.08-2.16-5.75-5-6.91V5c0-1.65-1.35-3-3-3Zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Z"
            />
          </svg>

          <!-- 뱃지 -->
          <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>

          <!-- 알림 목록 -->
          <div v-if="alertOpen" class="notification-dropdown">
            <div
              v-for="(text, index) in notificationList"
              :key="index"
              class="notification-item"
              :class="{ read: readNotifications.has(index) }"
              @click="markAsRead(index)"
            >
              {{ text }}
            </div>
          </div>
        </div>

        <!-- + 메뉴 버튼 -->
        <div class="position-relative">
          <button class="circle-button" @click="toggleMenu">+</button>
          <div
            v-if="menuOpen"
            class="position-absolute bg-white border rounded shadow mt-2 end-0"
            style="z-index: 1000; min-width: 180px"
          >
            <ul class="list-unstyled mb-0 py-2">
              <li class="px-3 py-2 hover-bg" @click="openSharedLedger">공동 가계부 생성</li>
              <li class="px-3 py-2 hover-bg" @click="openTransactionPopup">거래 내역 작성</li>
              <li class="px-3 py-2 hover-bg" @click="openShakePiggyBank">통장 흔들기</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="header-underline"></div>
    </header>

    <Teleport to="#modal">
      <InputLedgerPopup :ledgerPopup="ledgerPopup" @closetrigger="closeLedgerPopup" />
      <ShakeBalance :shakePopup="shakePopup" @closetrigger="closeShakePopup" />
      <CreateLedgerPopup :createPopup="createPopup" @closetrigger="closeCreatePopup" />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import InputLedgerPopup from '@/pages/InputLedgerPopup.vue'
import ShakeBalance from '@/pages/ShakeBalance.vue'
import CreateLedgerPopup from '@/pages/CreateLedgerPopup.vue'
import { useMoaStore } from '@/stores/moaStore'
import { useRouter } from 'vue-router'
const menuOpen = ref(false)
const alertOpen = ref(false)
const ledgerPopup = ref(false)
const shakePopup = ref(false)
const createPopup = ref(false)
const toggleDarkMode = () => {
  store.toggleDarkMode()
}

const closeShakePopup = () => {
  shakePopup.value = false
}

const closeCreatePopup = () => {
  createPopup.value = false
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  alertOpen.value = false
}

const toggleAlert = () => {
  alertOpen.value = !alertOpen.value
  menuOpen.value = false
}

const store = useMoaStore()
const isDarkMode = computed({
  get: () => store.isDarkMode,
  set: () => store.toggleDarkMode(),
})

// 알림 관련
const notificationList = ref([
  '내일은 국민카드 결제일입니다!',
  '3일후에 넷플릭스(고정지출) 14,900원 결제됩니다!',
  '모아찌와 통장을 흔들어 돈을 모아보세요!',
])

const readNotifications = ref(new Set())

const markAsRead = index => {
  readNotifications.value.add(index)
}

const unreadCount = computed(() => {
  return notificationList.value.length - readNotifications.value.size
})

// 메뉴 핸들러들
const openSharedLedger = () => {
  console.log('공동 가계부 생성')
  menuOpen.value = false
  createPopup.value = true
}

const openShakePiggyBank = () => {
  console.log('통장 흔들기')
  menuOpen.value = false
  shakePopup.value = true
}

const openTransactionPopup = () => {
  console.log('거래 내역 작성 팝업 열기')
  menuOpen.value = false
  ledgerPopup.value = true
}
const closeLedgerPopup = () => {
  ledgerPopup.value = false
}
</script>

<style scoped>
.hover-bg:hover {
  background-color: #f8f9fa;
  cursor: pointer;
}

.header-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background-color: #55b4a1;
}

.dark-mode header {
  background-color: #2b2b2b !important;
  color: #fff;
}

.dark-mode .navbar-brand {
  color: #fff !important;
}

.dark-mode .text-dark {
  color: #fff !important;
}

.dark-mode .notification-dropdown {
  background-color: #333;
  color: #eee;
  border-color: #444;
}

/* + 버튼 스타일 */
.circle-button {
  background-color: #55b4a1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
}
.circle-button:hover {
  background-color: #4aa792;
}

/* 알림 뱃지 */
.badge {
  position: absolute;
  top: -2px;
  right: -6px;
  background-color: #dc3545;
  color: white;
  font-size: 0.65rem;
  border-radius: 50%;
  padding: 2px 6px;
  font-weight: bold;
}

/* 드롭다운 스타일 */
.notification-dropdown {
  position: absolute;
  right: 0;
  top: 2.2rem;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  z-index: 1000;
  min-width: 240px;
}
.notification-item {
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #333;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.notification-item:last-child {
  border-bottom: none;
}

/* 읽은 알림 처리 */
.read {
  color: #999;
  font-style: italic;
}

.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slider::before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #a5d6a7;
}
input:checked + .slider::before {
  transform: translateX(24px);
}

.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 26px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  background-color: #ccc;
  border-radius: 34px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  font-size: 14px;
}
.slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

/* 슬라이더 위치 오른쪽으로 */
input:checked + .slider::before {
  transform: translateX(28px);
}

/* 달 기본 강조 */
.moon {
  opacity: 1;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.sun {
  opacity: 0.5;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

/* 해 강조 (light mode) */
input:not(:checked) + .slider .moon {
  opacity: 0.5;
}
input:not(:checked) + .slider .sun {
  opacity: 1;
}

.dark-mode header {
  background-color: #2b2b2b !important;
  color: #fff !important;
}

.dark-mode .navbar-brand,
.dark-mode .text-dark,
.dark-mode .notification-item,
.dark-mode .hover-bg,
.dark-mode .notification-item.read {
  color: #f1f1f1 !important;
}

.dark-mode .notification-item.read {
  opacity: 0.6;
  font-style: italic;
}

.dark-mode .hover-bg:hover {
  background-color: #3a3a3a;
}

/* 드롭다운 다크모드 대응 */
.dark-mode .position-absolute.bg-white {
  background-color: #2b2b2b !important; /* 어두운 배경 */
  color: #f0f0f0 !important; /* 밝은 텍스트 */
  border-color: #444;
}

/* 각 메뉴 아이템 hover 시 색상 */
.dark-mode .hover-bg:hover {
  background-color: #3a3a3a;
  color: #ffffff;
}
</style>
