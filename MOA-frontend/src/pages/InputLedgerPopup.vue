<template>
  <div>
    <BaseModal :title="title" :message="message" :isModal="ledgerPopup" @close="closetrigger">
      <template #ledgerPopup v-if="show">
        <div class="text-center">
          <div>
            <span><img src="../assets/image 39.png" alt="" style="width: 3rem" /></span
            ><span
              ><select
                name=""
                id=""
                v-model="inputList.ledgerId"
                style="border: none"
                class="noline"
              >
                <option value="0">가계부를 선택해주세요</option>
                <option :value="ledger.id" v-for="ledger in states.ledgerList">
                  {{ ledger.name }}
                </option>
              </select></span
            >
          </div>
          <div class="d-flex justify-content-center">
            <span class="m-3"
              ><BaseButton
                _text="지출"
                :_type="selectIsWithDraw ? 'fill' : 'borderline'"
                _w="6rem"
                _h="2.5rem"
                @click="expense"
              ></BaseButton
            ></span>
            <span class="m-3"
              ><BaseButton
                _text="수입"
                :_type="selectIsWithDraw ? 'borderline' : 'fill'"
                _w="6rem"
                _h="2.5rem"
                @click="income"
              ></BaseButton
            ></span>
          </div>
          <div class="d-flex justify-content-center">
            <BaseInput v-model="inputList.when" _type="date" required />
          </div>
          <div>
            <select name="" id="" v-model="inputList.category" class="line">
              <option value="">카테고리 선택</option>
              <option value="식비">식비</option>
              <option value="교통">교통</option>
              <option value="쇼핑">쇼핑</option>
              <option value="문화">문화</option>
            </select>
          </div>
          <div class="d-flex justify-content-center">
            <BaseInput _type="amount" _ph="금액 입력" v-model="inputList.amount"></BaseInput>
          </div>
          <div class="d-flex justify-content-center">
            <BaseInput _type="text" _ph="거래처" v-model="inputList.where"></BaseInput>
          </div>
          <div class="d-flex justify-content-center">
            <BaseInput _type="text" _ph="메모" v-model="inputList.desc"></BaseInput>
          </div>
          <div class="d-flex justify-content-center">
            <BaseButton
              _type="fill"
              _text="가계부에 추가"
              _h="2.5rem"
              _w="25rem"
              :_isActive="isDataFullfiled"
              @click="handleLedgerInput"
            ></BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { onMounted, ref, reactive, computed } from 'vue'
import axios from 'axios'
import { useMoaStore } from '@/stores/moaStore.js'

const moaStore = useMoaStore()
const { postLedgerInput, fetchLedgerList } = moaStore

const BASEURI = '/api/ledgers'
const states = reactive({ ledgerList: [] })

const fetchEntrieList = async () => {
  try {
    const response = await axios.get(BASEURI)
    if (response.status === 200) {
      states.ledgerList = response.data
      console.log('받은 데이터:', states.ledgerList)
    } else {
      alert('데이터 조회 실패')
    }
  } catch (error) {
    console.log('에러 발생:', error)
  }
}

onMounted(fetchEntrieList)

const title = ref('거래 내역 작성')
const message = ref('')

const show = ref(true) // slot 보이기 여부

const props = defineProps({
  ledgerPopup: {
    type: Boolean,
    required: true,
  },
})

// 부모에게 'close' 이벤트를 보낼 준비
const emit = defineEmits(['closetrigger'])

const closetrigger = () => {
  emit('closetrigger')
  console.log('작동')
}

const expense = () => {
  selectIsWithDraw.value = true
  inputList.value.isWithDraw = true
}

const income = () => {
  selectIsWithDraw.value = false
  inputList.value.isWithDraw = false
}
//-------------------------------------------------------------------

const selectIsWithDraw = ref(true)

const today = computed(() => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
})

let inputList = reactive({
  ledgerId: '0',
  isWithDraw: true,
  when: today.value,
  where: '',
  category: '',
  amount: null,
  desc: '',
  author: '',
})

const isDataFullfiled = computed(() => {
  return (
    inputList.ledgerId !== '0' &&
    inputList.category !== '' &&
    inputList.amount > 0 &&
    inputList.where.trim() !== '' &&
    inputList.desc.trim() !== ''
  )
})

const handleLedgerInput = async () => {
  try {
    await postLedgerInput(inputList)
    await fetchLedgerList()
    alert('작성이 완료되었습니다!')
    resetLedgerInput()
  } catch (error) {
    console.error('promise error:', error)
  }
}

const resetLedgerInput = () => {
  inputList = {
    ledgerId: '0',
    isWithDraw: true,
    when: today.value,
    where: '',
    category: '',
    amount: null,
    desc: '',
    author: '',
  }
}
</script>

<style lang="scss" scoped>
.line {
  margin: 0.7rem;
  padding: 0.3rem;
  width: 25rem;
  height: 2.5rem;
  border: 1.5px solid #43b581;
  border-radius: 0.5rem;
}
.noline {
  margin: 0.7rem;
  padding: 0.3rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}
</style>
