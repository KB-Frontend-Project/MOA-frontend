<template>
  <div :class="['input-page-container', { 'darkmode' : isDarkMode}]">
    <div class="ledger-select-container">
      <BaseButton
        v-for="ledger in getMyLedgerList"
        @click="handleSelectedLedger(ledger.id)"
        _type="borderline"
        :_text="ledger.name"
        _isActive="true"
        :value="ledger.id"
        :class="{
          'ledger-select-button': true,
          'not-selected': selectedLedgerId !== ledger.id,
        }"
      />
    </div>
    <div class="input-item-container">
      <form @submit.prevent="handleLedgerInput" class="input-item-form">
        <div class="form-title">가계부 작성</div>
        <div class="input-item header">
          <span>분류</span>
          <span>날짜</span>
          <span>카테고리</span>
          <span>거래처</span>
          <span>금액</span>
          <span>메모</span>
        </div>
        <div class="item-list-container">
          <div v-for="(item, index) in inputList" class="input-item">
            <select class="input-select" v-model="item.isWithDraw" name="isWithDraw" required>
              <option :value="true">지출</option>
              <option :value="false">수입</option>
            </select>
            <BaseInput class="base-input" v-model="item.when" _type="date" required />
            <select class="input-select" v-model="item.category" name="category" required>
              <option v-if="item.isWithDraw" v-for="c in categoryWithdraw" :value="c">
                {{ c }}
              </option>
              <option v-if="!item.isWithDraw" v-for="c in categoryIncome" :value="c">
                {{ c }}
              </option>
            </select>
            <BaseInput v-model="item.where" _type="text" required />
            <BaseInput v-model.number="item.amount" _type="amount" required />
            <BaseInput v-model="item.desc" _type="text" required />
            <div class="delete-button-container">
              <BaseButton
                v-if="index > 0"
                @click="handleDeleteInputItem(index)"
                _type="borderline"
                _isActive="true"
                _text="-"
                class="delete-item"
              />
            </div>
          </div>
          <div class="add-button-container">
            <BaseButton
              @click="handleAddInputItem"
              _type="borderline"
              _text="+"
              _isActive="true"
              class="add-item"
            />내역 추가
          </div>
        </div>
        <BaseButton
          _type="fill"
          _text="작성 완료"
          :_isActive="isDataFullfiled === 1"
          class="input-submit"
          type="submit"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { useMoaStore } from '@/stores/moaStore.js'
import { useMoaStoreForInput } from '@/stores/moaStoreForInput.js'
import { computed, onMounted, ref } from 'vue'
const moaStore = useMoaStore()
const moaStoreForInput = useMoaStoreForInput()
const { fetchLedgerInput } = moaStoreForInput
const { categoryWithdraw, categoryIncome, fetchLedgerList, fetchUserLedgerList } = moaStore
const getMyLedgerList = computed(() => moaStore.getMyLedgerList)
const isDarkMode = computed(() => moaStore.isDarkMode)

const selectedLedgerId = ref('1')
const today = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
})

const inputList = ref([
  {
    ledgerId: selectedLedgerId.value,
    isWithDraw: true,
    when: today,
    where: '',
    category: '',
    amount: 0,
    desc: '',
    author: '',
  },
])

const handleSelectedLedger = id => {
  selectedLedgerId.value = id
}

const handleLedgerInput = async () => {
  try {
    await Promise.all(inputList.value.map(data => fetchLedgerInput(data)))
    alert('작성이 완료되었습니다!')
    resetLedgerInput()
  } catch (error) {
    console.error('promise error:', error)
  }
}

const handleAddInputItem = () => {
  inputList.value.push({
    ledgerId: selectedLedgerId.value,
    isWithDraw: true,
    when: today,
    where: '',
    category: '',
    amount: 0,
    desc: '',
    author: '',
  })
}

const handleDeleteInputItem = index => {
  inputList.value.splice(index, 1)
}

const resetLedgerInput = () => {
  inputList.value = [
    {
      ledgerId: selectedLedgerId.value,
      isWithDraw: true,
      when: today,
      where: '',
      category: '',
      amount: 0,
      desc: '',
      author: '',
    },
  ]
}

const isDataFullfiled = computed(() => {
  return inputList.value.reduce(
    (acc, cur) =>
      acc & (cur.where.length !== 0) & (cur.category.length !== 0) & (cur.desc.length !== 0),
    true
  )
})

onMounted(async () => {
  await fetchLedgerList()
  await fetchUserLedgerList()
  console.log(getMyLedgerList.value)
})
</script>

<style scoped>
input {
  margin: 0;
  padding: 0;
}
select {
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-color: #d2f8e8;
}
.input-page-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
}
.ledger-select-container {
  display: flex;
}
.ledger-select-button {
  font-size: 0.8rem;
  padding: 0.3rem 0.7rem;
  border-radius: 3rem;
  margin: 0 0.3rem;
}
.ledger-select-button.not-selected {
  border-color: #777;
  color: #777;
}
.input-item-container {
  height: inherit;
}
.form-title {
  font-weight: bold;
  font-size: 1.6rem;
  color: #333;
}
.input-item-form {
  display: flex;
  height: inherit;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}
.item-list-container {
  flex: 1;
  overflow-y: auto;
  /* border: 2px solid #55b4a1; */
}
.input-item {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr 1.5fr 2fr 0.5fr;
  grid-template-rows: 2.5rem;
  gap: 1rem;
}
.header {
  font-weight: bold;
  color: #333;
}
.add-button-container {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.9rem;
  color: #55b4a1;
}
.delete-button-container {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.9rem;
}
.add-item {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-left: 0;
}
.delete-item {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  margin-left: 0;
  border-color: #f04747;
  color: #f04747;
}

.input-page-container.darkmode {
  background-color: #1e1e1e;
  color: #eee;
}

.input-page-container.darkmode .form-title,
.input-page-container.darkmode .header {
  color: #f0f0f0;
}

.input-page-container.darkmode select,
.input-page-container.darkmode input,
.input-page-container.darkmode .input-select {
  background-color: #2a2a2a;
  color: #eee;
  border-color: #55b4a1;
}

.input-page-container.darkmode .ledger-select-button.not-selected {
  color: #bbb;
  border-color: #bbb;
}

.input-page-container.darkmode .add-button-container,
.input-page-container.darkmode .delete-button-container {
  color: #a0eac0;
}

</style>
