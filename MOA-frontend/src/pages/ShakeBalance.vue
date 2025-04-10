<template>
  <div>
    <BaseModal :title="title" :message="message" :isModal="shakePopup" @close="closeTrigger">
      <template #ledgerPopup v-if="show">
        <div class="coin-bank-container">
          <div class="bank-account">
            <h2>나의 통장</h2>
            <p class="balance">잔액: {{ formattedBalance }}원</p>
            <button class="shake-button" @click="shakeBank" :disabled="isShaking">
              통장 흔들기
            </button>
          </div>

          <div class="piggy-bank">
            <h2>저금통</h2>
            <div class="piggy-container">
              <div :class="{ 'piggy-image': true, finished: !isShaking }"></div>
              <p class="savings">{{ formattedSavings }}원</p>
            </div>
          </div>

          <!-- 동전 애니메이션 영역 -->
          <div class="coin-animation-area">
            <div
              v-for="coin in coins"
              :key="coin.id"
              class="coin"
              :style="{
                left: coin.x + 'px',
                animationDuration: coin.duration + 's',
                animationDelay: coin.delay + 's',
              }"
            >
              {{ coin.value }}
            </div>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { onMounted, ref, computed } from 'vue'
import { useMoaStore } from '@/stores/moaStore.js'

const moaStore = useMoaStore()

const { fetchLedgerList, fetchUserLedgerList } = moaStore
const getMyLedgerList = computed(() => moaStore.getMyLedgerList)

onMounted(async () => {
  await fetchLedgerList()
  await fetchUserLedgerList()
  console.log('data:', getMyLedgerList.value)
})

const title = ref('통장 흔들기')
const message = ref('')
const show = ref(true) // slot 보이기 여부
const shakeUnit = ref(10)

const props = defineProps({
  shakePopup: {
    type: Boolean,
    required: true,
  },
})

// 부모에게 'close' 이벤트를 보낼 준비
const emit = defineEmits(['closeTrigger'])

const closeTrigger = () => {
  emit('closeTrigger')
  console.log('작동')
}

const balance = ref(125460) // 초기 잔액
const savings = ref(0) // 저금통 금액
const isShaking = ref(false)
const coins = ref([])
let coinIdCounter = 0

// 금액 포맷팅 함수
const formattedBalance = computed(() => {
  return balance.value.toLocaleString()
})

const formattedSavings = computed(() => {
  return savings.value.toLocaleString()
})

// 통장 흔들기 기능
const shakeBank = async () => {
  if (isShaking.value) return

  isShaking.value = true

  // 10원 단위 계산
  const changeAmount = balance.value % 100

  if (changeAmount > 0) {
    // 통장에서 돈 빼기
    balance.value = Math.floor(balance.value / 100) * 100

    // 동전 애니메이션 생성
    createCoinAnimation(changeAmount)

    // 애니메이션 후 저금통에 돈 추가 (2초 후)
    setTimeout(() => {
      savings.value += changeAmount
      isShaking.value = false
      coins.value = []
    }, 2000)
  } else {
    // 10원 단위가 없을 경우
    isShaking.value = false
    alert('흔들어도 10원 단위가 없네요!')
  }
}

// 동전 애니메이션 생성 함수
const createCoinAnimation = totalAmount => {
  // 기존 동전 제거
  coins.value = []

  // 동전 개수 계산 (10원 = 1개, 20원 = 2개, ... 등)
  const coinCount = Math.min(Math.ceil(totalAmount / 10), 10)

  // 동전 생성
  for (let i = 0; i < coinCount; i++) {
    const randomX = Math.floor(Math.random() * 200) + 50 // 동전의 x 위치
    const randomDelay = Math.random() * 0.5 // 지연 시간
    const randomDuration = 1 + Math.random() * 0.5 // 애니메이션 지속 시간

    coins.value.push({
      id: coinIdCounter++,
      x: randomX,
      delay: randomDelay,
      duration: randomDuration,
      value: '10',
    })
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
.coin-bank-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  min-height: 500px;
}

.bank-account,
.piggy-bank {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.balance,
.savings {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
}

.shake-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: all 0.3s;
}

.shake-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.shake-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}

.piggy-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.piggy-image {
  position: relative;
  width: 10rem;
  height: 10rem;
  margin-bottom: 20px;
  background-image: url('/src/assets/shakeImage.png');
  background-size: contain;
  background-position: center;
}

.piggy-image.finished {
  background-image: url('/src/assets/shakeFinishedImage.png');
}

.coin-slot {
  position: absolute;
  width: 40px;
  height: 5px;
  background-color: #333;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

/* 동전 애니메이션 관련 스타일 */
.coin-animation-area {
  position: absolute;
  top: 0;
  left: 18%;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.coin {
  position: absolute;
  background-color: #ffd700;
  color: #996515;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  top: 150px;
  animation: fallCoin 1.5s forwards;
  z-index: 10;
}

@keyframes fallCoin {
  0% {
    top: 150px;
    transform: translateY(0) rotate(0);
    opacity: 1;
  }
  50% {
    transform: translateY(100px) rotate(180deg);
    opacity: 1;
  }
  100% {
    top: 350px;
    transform: translateY(0) rotate(360deg);
    opacity: 0;
  }
}
</style>
