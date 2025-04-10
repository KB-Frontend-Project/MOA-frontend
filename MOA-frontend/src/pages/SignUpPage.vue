<template>
  <div class="signup-page" :class="{ 'dark-mode': isDarkMode }">
    <div class="signup-container">
      <img :src="signupImg" alt="signup" class="signup-img" />

      <BaseInput v-model="email" _type="text" _ph="이메일" _w="100" />
      <BaseInput v-model="password" _type="password" _ph="비밀번호" _w="100" />
      <BaseInput v-model="confirmPassword" _type="password" _ph="비밀번호 확인" _w="100" />

      <BaseButton
        _isActive="true"
        _text="가입"
        _textSize="1"
        _w="25"
        _h="3"
        _type="fill"
        @click="handleSignup"
      />
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
import { ref, computed } from 'vue'
import { useMoaStore } from '@/stores/moaStore'
import Header from '@/components/layout/Header.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import { useRouter } from 'vue-router';

import signupLight from '@/assets/signup-light.png'
import signupDark from '@/assets/signup-dark.png'

const store = useMoaStore()
const router = useRouter() 
const isDarkMode = computed(() => store.isDarkMode)
const signupImg = computed(() => isDarkMode.value ? signupDark : signupLight)

// v-model용 값
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')

// 모달용 상태
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

const handleSignup = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    modalTitle.value = '필수 입력'
    modalMessage.value = '모든 항목을 입력해주세요.'
    showModal.value = true
    return
  }

  if (password.value !== confirmPassword.value) {
    modalTitle.value = '오류'
    modalMessage.value = '비밀번호가 일치하지 않습니다.'
    showModal.value = true
    return
  }

  const user = {
    name: name.value, // 이름 입력 필드도 추가해야 해!
    email: email.value,
    password: password.value,
    image: 'default.jpg',
    createdAt: new Date().toISOString().split('T')[0],
    alert: true,
    shake_unit: 5,
    balance: 0
  }

  const success = await store.signup(user)
  signupSuccess.value = success

  modalTitle.value = success ? '회원가입 성공' : '회원가입 실패'
  modalMessage.value = success
    ? '환영합니다! 이제 로그인을 해주세요.'
    : '서버에 문제가 있거나 이미 등록된 이메일일 수 있어요.'
  showModal.value = true

  if (success) {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    name.value = ''
  }
}
const signupSuccess = ref(false)

const handleModalClose = () => {
  showModal.value = false
  if (signupSuccess.value) {
    router.push('/login')
  }
}

</script>


<style scoped>
.signup-page {
  text-align: center;
  padding: 2rem;
}
.signup-container {
  max-width: 400px;
  margin: 0 auto;
}
.signup-img {
  width: 200px;
  margin: 2rem auto;
}
</style>