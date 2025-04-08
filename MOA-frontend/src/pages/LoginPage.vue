<template>
  <Header />
  <div class="login-page">
    <div class="login-container">
      <img src="@/assets/login.png" alt="login" class="login-img" />

      <BaseInput v-model="email" _type="text" _ph="이메일" _w="100%" />
      <BaseInput v-model="password" _type="password" _ph="비밀번호" _w="100%" />

      <BaseButton
        _isActive="true"
        _text="Login"
        _textSize="1"
        _w="25"
        _h="3"
        _type="fill"
        @click="handleLogin"
      />

      <div class="login-footer">
        <!-- 비밀번호 찾기 미구현 -->
        <a href="#" class="footer-link">비밀번호 찾기</a> 
        <a href="http://localhost:5173/signup" class="footer-link">회원가입</a>
      </div>
    </div>

    <BaseModal
      :isModal="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @close="handleModalClose"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/layout/Header.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import { useMoaStore } from '@/stores/moaStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useMoaStore()

const email = ref('')
const password = ref('')
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const loginSuccess = ref(false) 

const handleLogin = async () => {
  console.log('✔️ 로그인 버튼 클릭됨')
  if (!email.value || !password.value) {
    modalTitle.value = '입력 필요'
    modalMessage.value = '이메일과 비밀번호를 모두 입력해주세요.'
    loginSuccess.value = false
    showModal.value = true
    return
  }
  console.log('입력값:', email.value, password.value)
  const result = await store.login(email.value, password.value)
  console.log('로그인 결과:', result)
  if (result.success) {
    modalTitle.value = '로그인 성공'
    modalMessage.value = `${result.user.name}님, 환영합니다!`
    loginSuccess.value = true
  } else {
    modalTitle.value = '로그인 실패'
    modalMessage.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
    loginSuccess.value = false
  }

  showModal.value = true
}

const handleModalClose = () => {
  showModal.value = false

  if (loginSuccess.value) {
    router.push('/')
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  text-align: center;
  padding-top: 5vh;
}

.login-container {
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.login-img {
  width: 300px;
  margin: 2rem auto 1rem;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.85rem;
  padding: 0 5rem;
}

.footer-link {
  text-decoration: none;
  color: #43b581;;
  cursor: pointer;
}
.footer-link:hover {
  text-decoration: underline;
}
</style>
