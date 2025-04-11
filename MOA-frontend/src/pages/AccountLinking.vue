<template>
  <div :class="['container text-center', { 'dark-mode': isDarkMode }]">
    <!-- 제일 위 줄 -->
    <div class="d-flex justify-content-center align-items-center mb-4">
      <img src="../assets/image 40.png" alt="" style="width: 7rem" />

      <div class="d-flex flex-column align-items-center mx-4 text-center custom-text">
        <div class="first-line">{{ user.name }}님의 통장을 흔들어서 잔돈을 차곡차곡!</div>
        <div class="second-line">
          현재까지 얼마 모아찌 ?
          <span class="highlight-amount">{{ user.balance.toLocaleString() }}원</span>
        </div>
      </div>

      <img src="../assets/image 40.png" alt="" style="width: 7rem" />
    </div>

    <hr />

    <!-- 은행 정보 리스트 -->
    <div v-for="(account, idx) in getMyAccountList" :key="idx" class="mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3 fs-5 fw-semibold">
          <div>{{ account.bank }}</div>
          <div>{{ account.accountNumber }}</div>
        </div>

        <div class="d-flex gap-2">
          <BaseButton
            @click="openShakePiggyBank(account)"
            _text="흔들기"
            _type="fill"
            _w="3.5rem"
            _h="1.5rem"
          />
          <BaseButton
            @click="unlinkAccount(account.id)"
            _text="연동 해지"
            _type=""
            _w="4.5rem"
            _h="1.5rem"
          />
        </div>
      </div>
    </div>

    <!-- 추가 입력 폼 (한 줄에 정렬) -->
    <div v-if="showAddAccount" class="d-flex justify-content-center align-items-center gap-2 mt-4">
      <BaseInput _ph="은행명" _type="text" v-model="newBank" style="width: 10rem" />
      <BaseInput
        _ph="계좌번호"
        _type="text"
        v-model="newNumber"
        @input="formatAccountNumber"
        style="width: 15rem"
      />
      <BaseButton @click="addAccount" _text="추가" _type="fill" _w="4rem" />
      <BaseButton @click="cancelAdd" _text="취소" _type="" _w="4rem" />
    </div>

    <hr />

    <!-- 맨 아래 '연동하기' 버튼 -->
    <div class="d-flex justify-content-center">
      <BaseButton
        @click="showAddAccount = true"
        _text="+"
        _type="borderline"
        class="add-item"
      />계좌 추가하기
    </div>
  </div>

  <Teleport to="#modal">
    <ShakeBalance
      :selectedAccount="selectedAccount"
      :shakePopup="shakePopup"
      @closeTrigger="closeShakePopup"
    />
  </Teleport>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import ShakeBalance from './ShakeBalance.vue'
import { useMoaStore } from '@/stores/moaStore.js'

const moaStore = useMoaStore()

const isDarkMode = computed(() => moaStore.isDarkMode)

const { fetchAccountList, fetchUserAccountList, postUserAccount, deleteUserAccount, postUserAccountId, user } =
  moaStore
const getMyAccountList = computed(() => moaStore.getMyAccountList)

const selectedAccount = ref({})

const showAddAccount = ref(false)
const newBank = ref('')
const newNumber = ref('')

const shakePopup = ref(false)

const closeShakePopup = () => {
  shakePopup.value = false
}

const openShakePiggyBank = account => {
  selectedAccount.value = account
  console.log('통장 흔들기')
  shakePopup.value = true
}

const addAccount = async () => {
  if (newBank.value.trim() && newNumber.value.trim()) {
    await postUserAccount({ bank: newBank.value, accountNumber: newNumber.value, balance: 0 })
    await fetchAccountList()
    await fetchUserAccountList()
    newBank.value = ''
    newNumber.value = ''
    showAddAccount.value = false
  } else {
    alert('은행명과 계좌번호를 모두 입력해주세요!')
  }
}

const unlinkAccount = async idx => {
  if (confirm('삭제하시겠습니까?')) {
    await deleteUserAccount(idx)
    await fetchAccountList()
  }
}

const cancelAdd = () => {
  newBank.value = ''
  newNumber.value = ''
  showAddAccount.value = false
}

const formatAccountNumber = e => {
  let rawValue = e.target.value.replace(/\D/g, '') // 숫자만 남기고 전부 제거
  let formatted = ''

  if (rawValue.length <= 6) {
    formatted = rawValue
  } else if (rawValue.length <= 8) {
    formatted = rawValue.slice(0, 6) + '-' + rawValue.slice(6)
  } else {
    formatted = rawValue.slice(0, 6) + '-' + rawValue.slice(6, 8) + '-' + rawValue.slice(8, 14)
  }

  newNumber.value = formatted
}
</script>

<style scoped>
.add-item {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-left: 0;
}
.custom-text {
  font-family: 'Pretendard', sans-serif;
  gap: 0.5rem;
}

.first-line {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.3rem;
}

.second-line {
  font-size: 1.1rem;
  font-weight: 400;
  color: #666;
}

.highlight-amount {
  font-size: 1.4rem; /* 금액만 더 크게 */
  font-weight: 700; /* 금액은 더 두껍게 */
  color: #de8f5f; /* 눈에 잘 띄는 포인트 색 */
  margin-left: 0.3rem;
}

.dark-mode {
  background-color: #1e1e1e;
  color: #f2f2f2;
}

.dark-mode hr {
  border-color: #444;
}

.dark-mode .first-line,
.dark-mode .second-line {
  color: #ddd;
}

.dark-mode .highlight-amount {
  color: #f9c784;
}

</style>
