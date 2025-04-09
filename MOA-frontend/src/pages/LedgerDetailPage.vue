<template>
  <div class="container">
    <div class="ledgerSelectDiv d-flex ps-3">
      <BaseButton
        v-for="ul in userLedgerInfo.ownLedgersInfo"
        :key="ul.ledgerId"
        _isActive="true"
        :_w="(ul.name + ' 가계부').length.toString()"
        _h="3"
        :_text="ul.name + ' 가계부'"
        _textSize="1"
        :_type="isSelected[ul.ledgerId.toString()] ? 'fill' : 'borderline'"
        _mp="me-1"
        @click="ledgerClicked(ul.ledgerId, ul.name)"
      />
    </div>
    <br />
    <div class="ledgerOptionDiv d-flex w-100 pe-5">
      <select class="form-select w-25 h-50" v-model="selectResult">
        <option selected value="when">정렬 기준 선택</option>
        <option value="when">기준: 날짜</option>
        <option value="where">기준: 거래처</option>
        <option value="amount">기준: 금액</option>
        <option value="author">기준: 작성자</option>
        <option value="category">기준: 카테고리</option>
        <option value="isWithDraw">기준: 분류</option>
      </select>
      <!-- <BaseInputLegacy _ph="이름 검색" _type="text" _w="15" v-model="searchName" /> -->
      <BaseInput _ph="이름 검색" _type="text" _w="15" v-model:modelValue="searchName" />
    </div>
    <br />
    <div class="ledgerDetailDiv">
      <LedgerList :_dataArr="currentLedgerInfo" :_sort="selectResult" :_authorFilter="searchName" />

      <!-- <LedgerList :_dataArr="ledgerItemInfoArr" :_sort="selectResult" :_authorFilter="searchName" /> -->
    </div>
  </div>
</template>

<script setup>
import LedgerList from '../components/ledger/LedgerList.vue'
import BaseButton from '../components/common/BaseButton.vue'
import BaseInput from '../components/common/BaseInput.vue'
import { ref, reactive, watchEffect, onMounted, onUpdated, watch, computed } from 'vue'
import axios from 'axios'
import { useUserLedgerStore } from '../stores/moaStoreKwon.js'

const userLedgerStore = useUserLedgerStore()
const userLedgerInfo = computed(() => userLedgerStore.userLedgerInfo)
const currentLedgerInfo = computed(() => userLedgerStore.currentLedgerInfo)

const selectResult = ref('')

const searchName = ref('')

const isSelected = reactive({})
const ledgerClicked = (id, name) => {
  for (let p in isSelected) {
    isSelected[p] = false
  }
  if (isSelected[id.toString()]) {
    isSelected[id.toString()] = !isSelected[id.toString()]
  } else {
    isSelected[id.toString()] = true
  }

  // console.log(isSelected)

  userLedgerStore.getCurrentLedgerInfo(id.toString(), name)
}

onMounted(() => {
  console.log('asfd')
  userLedgerStore.getCurrentUser()
  userLedgerStore.getUserLedgerInfo()
})
</script>

<style scoped>
div.ledgerOptionDiv {
  justify-content: space-between;
  align-items: center;
}
div.ledgerOptionDiv > select {
  margin: 1rem;
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-color: #d2f8e8;
}
div.ledgerOptionDiv > select:focus {
  border-color: #43b581;
  box-shadow: 0px 0px 10px -2px #fff;
}

select {
  border-radius: 3px;
}

select option:checked {
  background: white;
  color: black;
}

div.ledgerDetailDiv {
  /* background-color: pink; */
}

@media screen and (min-width: 1801px) {
  div.ledgerDetailDiv {
    width: 80vw;
    height: 30rem;
  }
}

@media screen and (max-width: 1800px) {
  div.ledgerDetailDiv {
    width: 75vw;
    height: 30rem;
  }
}

@media screen and (max-width: 1000px) {
  div.ledgerDetailDiv {
    width: 75vw;
    height: 30rem;
  }
}
</style>
