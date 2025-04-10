<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div class="sidebar-profile"></div>
      <div class="sidebar-profile-hello">xx님의 가계부</div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-title">가계부</div>
      <div class="sidebar-sublist">
        <router-link
          :class="{ 'current-page': path[1] === 'ledger' && path[2] === 'input' }"
          to="/ledger/input"
          >내역 작성</router-link
        >
        <router-link
          :class="{ 'current-page': path[1] === 'ledger' && path[2] !== 'input' }"
          to="/ledger/1"
          >사용자 내역</router-link
        >
      </div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-title">
        <router-link :class="{ 'current-page': path[1] === 'calendar' }" to="/calendar"
          >캘린더</router-link
        >
      </div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-title">통계</div>
      <div class="sidebar-sublist">
        <router-link :class="{ 'current-page': path[1] === 'statistics' }" to="/statistics"
          >주간별</router-link
        >
        <router-link :class="{ 'current-page': path[1] === 'statistics' }" to="/statistics"
          >월별</router-link
        >
      </div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-title">
        <router-link :class="{ 'current-page': path[1] === 'account' }" to="/account"
          >연동 계좌</router-link
        >
      </div>
    </div>
    <div class="sidebar-content">
      <div class="sidebar-sublist last-item">
        <router-link
          :class="{ 'current-page': path[1] === 'profile' }"
          class="router-link"
          to="/profile"
          >설정</router-link
        >
        <router-link class="router-link" to="#">로그아웃</router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const path = computed(() => {
  const segments = route.path.split('/')
  console.log('계산된 경로 세그먼트:', segments)
  return segments
})

console.log(path)
</script>

<style scoped>
.sidebar {
  width: 14.5rem;
  height: inherit;
}
.sidebar-profile {
  width: 5rem;
  height: 5rem;
  background-color: rgb(194, 194, 194);
  border-radius: 50%;
  margin: 1.6rem auto;
}
.sidebar-profile-hello {
  text-align: center;
  font-size: 1.6rem;
}
.sidebar-content {
  padding: 1rem 1.6rem;
  border-bottom: 2px solid #55b4a199;
  border-right: 2px solid #55b4a199;
}
.sidebar-title {
  font-weight: bold;
  font-size: 1.2rem;
}
.sidebar-sublist {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding-top: 1rem;
  color: gray;
  font-size: 0.85rem;
}
.last-item {
  padding-top: 0;
  border: none;
}
.current-page {
  color: #ff4242;
}
</style>
