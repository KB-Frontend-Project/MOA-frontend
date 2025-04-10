<template>
  <div class="setting-page">
    <div class="content">
      <!-- 프로필 상단 -->
      <div class="profile-box">
        <img src="@/assets/logo.png" alt="프로필 이미지" class="profile-img" />

        <div class="profile-info">
          <div class="info-line">
            <span class="label">이메일</span>
            <span class="value">{{ user.email }}</span>
          </div>

          <div class="info-line">
            <span class="label">닉네임</span>
            <BaseInput v-model="nickname" _type="text" _ph="닉네임" _w="20" />
            <BaseButton
              _isActive="true"
              _text="변경"
              _textSize="1"
              _w="6"
              _h="2.5"
              _type="fill"
              @click="handleNameChange"
            />
          </div>
        </div>        
      </div>

      <hr />

      <!-- 흔들기 단위 -->
       <div class="section shake-settings">
        <div class="left">
          <div class="section-title">흔들기 단위 설정</div>
        </div>
        <div class="right">
          <BaseInput v-model="shakeUnit" _type="amount" _ph="단위 (숫자)" _w="40" />
          <BaseButton
            _isActive="true"
            _text="설정"
            _textSize="1"
            _w="3.5"
            _h="2.0"
            _type="fill"
            @click="handleShakeUpdate"
          />
        </div>
      </div>


      <hr />

      <!-- 알림 토글 -->
      <!-- 알림은 왼쪽, 토글버튼은 오른쪽 -->
      <div class="section alert-toggle">
        <div class="left">
          <div class="section-title">알림</div>
        </div>
        <div class="right">
          <label class="switch">
            <input type="checkbox" v-model="alert" @change="handleAlertToggle" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <hr />

      <!-- 다크 모드 토글 -->
      <div class="section darkmode-toggle">
        <div class="left">
          <div class="section-title">다크모드</div>
        </div>
        <div class="right">
          <label class="switch">
            <input type="checkbox" v-model="darkMode" @change="handleDarkModeToggle" />
            <span class="slider round"></span>
          </label>
        </div>
      </div>

      <hr />

      <!-- 회원 탈퇴 -->
      <div class="section membership-withdraw">
        <div class="right">
          <BaseButton
            _isActive="true"
            _text="회원 탈퇴"
            _textSize="1"
            _w="10"
            _h="2.5"
            _type="danger"
            @click="openConfirmModal"
          />
        </div>
      </div>

      <!-- 탈퇴 확인 모달 (ConfirmModal) -->
      <ConfirmModal
        :isModal="showConfirmModal"
        title="회원 탈퇴"
        message="정말 탈퇴하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />

      <BaseModal
        :isModal="showModal"
        :title="modalTitle"
        :message="modalMessage"
        @close="handleModalClose"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMoaStore } from '@/stores/moaStore'
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'

const store = useMoaStore()
const router = useRouter() 
const user = store.user

const nickname = ref(user.name)
const shakeUnit = ref(user.shake_unit)
const alert = ref(user.alert)
const darkMode = ref(false)

const showModal = ref(false)
const showConfirmModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')

function openConfirmModal() {
  showConfirmModal.value = true
}

function openAlertModal(title, message) {
  modalTitle.value = title
  modalMessage.value = message
  showModal.value = true
}

function handleCancel() {
  showConfirmModal.value = false
}

const handleNameChange = async () => {
  await store.updateUser(user.id, { name: nickname.value })
  openAlertModal('닉네임 변경', '닉네임이 성공적으로 변경되었습니다.')
}

const handleShakeUpdate = async () => {
  await store.updateUser(user.id, { shake_unit: Number(shakeUnit.value) })
  openAlertModal('설정 완료', '흔들기 단위가 변경되었습니다.')
}

const handleAlertToggle = async () => {
  await store.updateUser(user.id, { alert: alert.value })
}

const handleModalClose = () => {
  showModal.value = false
}

// 다크모드는 임시
const handleDarkModeToggle = async () => {
  console.log('다크모드 토글:', darkMode.value)
}

async function handleConfirm() {
  showConfirmModal.value = false
  await store.deleteUser(user.id)
  router.push('/login')
}
</script>

<style scoped>
.setting-page {
  display: flex;
}

.content {
  padding: 2rem 4rem;
  flex-grow: 1;
  margin-top: 2rem;
}

.profile-box {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  margin-left: 8rem;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 1000%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 2rem;
}

.info-line {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.label {
  font-weight: bold;
  width: 60px;
}

.section {
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.2rem;
  font-weight: bold;
  
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.value {
  margin-left: 1.9rem;
}

hr {
  margin: 1.5rem 0;
}

.shake-settings .form-control {
  margin: 0rem !important; /* BaseInput이 가진 margin을 덮어씁니다 */
}

.alert-toggle,
.darkmode-toggle{
  display: flex;
  justify-content: space-between; /* 왼쪽-오른쪽 배치 */
  align-items: center;
}

/* 회원탈퇴 버튼 */
.membership-withdraw {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-right: 5rem;
}

/* 왼쪽 영역, 오른쪽 영역 */
.left {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 8rem;
}

.right {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 8rem;
}

/* 토글 스위치 */
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin-right: 6rem;
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
</style>
