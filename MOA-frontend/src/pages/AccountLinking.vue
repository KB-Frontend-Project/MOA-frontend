<template>
  <div class="container text-center">
    <!-- 제일 위 줄 -->
    <div class="d-flex justify-content-center align-items-center mb-4">
      <img src="../assets/image 40.png" alt="" style="width: 7rem" />

      <div class="d-flex flex-column align-items-center mx-4">
        <div>모아찌 님의 계좌 통장을 흔들어서 부자되세요₩!@@!#!@#ㄸ$@</div>
        <div>현재까지 얼마 모아찌 ? - 100,000,000원</div>
      </div>

      <img src="../assets/image 40.png" alt="" style="width: 7rem" />
    </div>

    <hr />

    <!-- 은행 정보 리스트 -->
    <div v-for="(account, idx) in accounts" :key="idx" class="mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center gap-3 fs-5 fw-semibold">
          <div>{{ account.bank }}</div>
          <div>{{ account.number }}</div>
        </div>

        <div class="d-flex gap-2">
          <BaseButton _text="흔들기" _type="fill" _w="3.5rem" _h="1.5rem" />
          <BaseButton
            @click="unlinkAccount(idx)"
            _text="연동 해지"
            _type=""
            _w="4.5rem"
            _h="1.5rem"
          />
        </div>
      </div>

      <!-- 마지막이 아닌 줄만 구분선 -->
      <hr v-if="idx !== accounts.length - 1" />
    </div>

    <!-- 추가 입력 폼 (바로 아래) -->
    <div v-if="showAddAccount" class="mt-4">
      <div class="d-flex justify-content-center gap-2 mb-3">
        <BaseInput _ph="은행명" _type="text" v-model="newBank" />
        <BaseInput _ph="계좌번호" _type="text" v-model="newNumber" />
      </div>
      <div class="d-flex justify-content-center gap-2">
        <BaseButton @click="addAccount" _text="추가" _type="fill" _w="5rem" />
        <BaseButton @click="cancelAdd" _text="취소" _type="" _w="5rem" />
      </div>
    </div>

    <hr />

    <!-- 맨 아래 '연동하기' 버튼 -->
    <div class="d-flex justify-content-center">
      <BaseButton @click="showAddAccount = true" _text="계좌 추가하기" _type="fill" _w="30rem" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'

const accounts = ref([{ bank: '국민은행', number: '652321-43-231232' }])

const showAddAccount = ref(false)
const newBank = ref('')
const newNumber = ref('')

const addAccount = () => {
  if (newBank.value.trim() && newNumber.value.trim()) {
    accounts.value.push({ bank: newBank.value, number: newNumber.value })
    newBank.value = ''
    newNumber.value = ''
    showAddAccount.value = false
  } else {
    alert('은행명과 계좌번호를 모두 입력해주세요!')
  }
}

const unlinkAccount = idx => {
  accounts.value.splice(idx, 1)
}

const cancelAdd = () => {
  newBank.value = ''
  newNumber.value = ''
  showAddAccount.value = false
}
</script>

<style scoped>
hr {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 1rem 0;
}
</style>
