<template>
  <div class="reset-password-page">
    <div class="reset-password-container">
      <!-- 상단 아이콘 / 제목 -->
      <div class="reset-password-header">
        <img src="@/assets/resetpw.png" alt="pw" class="reset-pw-img" />
        <h2>비밀번호 찾기</h2>
      </div>

      <!-- 1) 이메일 입력 & 인증 버튼 -->
      <div class="input-row" v-if="currentStep >= 1">
        <BaseInput
          v-model="email"
          _type="text"
          _ph="E-MAIL"
          _w="80"
        />
        <BaseButton
          _text="인증"
          _type="fill"
          _isActive="true"
          _w="5"            
          _h="2.5"             
          _textSize="0.9"    
          @click="handleEmailVerify"
        />
      </div>

      <!-- 2) 인증번호 입력 & 확인 버튼 (step >= 2 일 때 표시) -->
      <div class="input-row" v-if="currentStep >= 2">
        <BaseInput
          v-model="verifyCode"
          _type="text"
          _ph="6자리 숫자"
          _w="80"
        />
        <BaseButton
          _text="확인"
          _type="fill"
          _isActive="true"
          _w="5"
          _h="2.5"
          _textSize="0.9"
          @click="handleCodeCheck"
        />
      </div>

      <!-- 3) 비밀번호 / 비밀번호 확인 & 변경 버튼 (step >= 3 일 때 표시) -->
      <!-- 3단계: 비밀번호 / 확인 / 버튼 -->
        <div class="input-row input-step3" v-if="currentStep >= 3">
        <!-- 첫 줄: PASSWORD -->
        <div class="password-line">
        <BaseInput
            v-model="newPassword"
            _type="password"
            _ph="PASSWORD"
            _w="60"
        />
        </div>

        <!-- 두 번째 줄: PASSWORD 확인 + 버튼 -->
        <div class="pw-row">
            <BaseInput
            v-model="confirmPassword"
            _type="password"
            _ph="PASSWORD 확인"
            _w="74"
            />
            <BaseButton
            _text="변경"
            _type="fill"
            _isActive="true"
            _w="5"
            _h="2.5"
            _textSize="0.9"
            @click="handleChangePassword"
            />
        </div>
        </div>

    </div>

    <!-- 변경 성공 등의 메시지를 위한 모달 -->
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
import { useRouter } from 'vue-router'
import Header from '@/components/layout/Header.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'

// 단계 제어 변수: 1=이메일입력, 2=인증코드 확인, 3=비밀번호 재설정
const currentStep = ref(1)

// 입력값
const email = ref('')
const verifyCode = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// 모달 표시 여부 및 메시지
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

// 라우터
const router = useRouter()

// ------------------ step 1) 이메일 인증 버튼 ------------------
const handleEmailVerify = async () => {
  if (!email.value) {
    openModal('오류', '이메일을 입력해주세요.')
    return
  }
  console.log('이메일 인증 요청(가정) :', email.value)
  currentStep.value = 2
}

// ------------------ step 2) 인증번호 확인 버튼 ------------------
const handleCodeCheck = async () => {
  if (!verifyCode.value) {
    openModal('오류', '인증번호를 입력해주세요.')
    return
  }
  if (verifyCode.value.length !== 6) {
    openModal('오류', '인증번호는 6자리여야 합니다.')
    return
  }
  console.log('인증번호 확인(가정) :', verifyCode.value)
  currentStep.value = 3
}

// ------------------ step 3) 비밀번호 변경 버튼 ------------------
const handleChangePassword = async () => {
  if (!newPassword.value || !confirmPassword.value) {
    openModal('오류', '비밀번호와 확인란을 모두 입력해주세요.')
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    openModal('오류', '비밀번호가 일치하지 않습니다.')
    return
  }
  console.log('비밀번호 변경(가정) :', newPassword.value, confirmPassword.value)
  openModal('완료', '비밀번호가 변경되었습니다.')
}

// ------------------ 모달 관련 메서드 ------------------
function openModal(title, message) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

function handleModalClose() {
  showModal.value = false
  router.push('/login')
}
</script>

<style scoped>
/* 브라우저 높이에 맞추기 */
.reset-password-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
}

.password-line {
  width: 100%;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  
}

/* 가운데 정렬 컨테이너 */
.reset-password-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 0.95rem;

  max-width: 500px;  
  margin: 0 auto;        
  width: 100%;  
}

/* 상단 영역(이미지, 제목) */
.reset-password-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.reset-pw-img {
  width: 200px;
  height: 2%;
  object-fit: contain;
  margin-bottom: 1rem;
}

/* 단계별 입력/버튼 그룹 */
.input-row {
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
}
.input-step3 {
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pw-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

/* 제목 글자 크기 조금 줄이기 */
.reset-password-header h2 {
  font-size: 1.2rem; /* 필요에 따라 조정 */
}

@media (max-width: 600px) {
  .input-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
