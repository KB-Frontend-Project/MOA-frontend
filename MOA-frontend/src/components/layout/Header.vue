<template>
  <header class="navbar navbar-expand-lg navbar-light bg-light px-4">
    <div class="d-flex align-items-center">
      <RouterLink to="/" class="d-flex align-items-center text-decoration-none text-dark">
        <img src="@/assets/logo.png" alt="moa logo" class="me-2" width="32" />
        <span class="navbar-brand mb-0 h1">moA</span>
      </RouterLink>
    </div>

    <div class="ms-auto d-flex align-items-center gap-3 position-relative">
      <!-- ✅ 종 아이콘 + 뱃지 -->
      <div class="position-relative" @click="toggleAlert" style="cursor: pointer;">
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

        <!-- 🔴 뱃지 -->
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>

        <!-- 📩 알림 목록 -->
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

      <!-- ➕ 메뉴 버튼 -->
      <div class="position-relative">
        <button class="circle-button" @click="toggleMenu">+</button>
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
    </div>

    <div class="header-underline"></div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)
const alertOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  alertOpen.value = false
}

const toggleAlert = () => {
  alertOpen.value = !alertOpen.value
  menuOpen.value = false
}

// 🔔 알림 관련
const notificationList = ref([
  '내일은 국민카드 결제일입니다!',
  '3일후에 넷플릭스(고정지출) 14,900원 결제됩니다!',
  '모아찌와 통장을 흔들어 돈을 모아보세요!'
])

const readNotifications = ref(new Set())

const markAsRead = (index) => {
  readNotifications.value.add(index)
}

const unreadCount = computed(() => {
  return notificationList.value.length - readNotifications.value.size
})

// 메뉴 핸들러들
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

/* 🔘 + 버튼 스타일 */
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

/* 🔔 알림 뱃지 */
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

/* 📩 드롭다운 스타일 */
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

/* ✅ 읽은 알림 처리 */
.read {
  color: #999;
  font-style: italic;
}
</style>
