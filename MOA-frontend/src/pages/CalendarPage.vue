<template>
  <div class="calendar-page-container">
    <div class="calendar-month-container">
      <div class="calendar-month-block" style="color: #f04747">
        <div class="calendar-month-title">이번 달 지출</div>
        {{ entriesTotalMonthSpend.toLocaleString() }}원
      </div>
      <div class="calendar-month-block" style="color: #43b581">
        <div class="calendar-month-title">이번 달 수입</div>
        {{ entriesTotalMonthIncome.toLocaleString() }}원
      </div>

      <div class="calendar-month-block">
        <div class="calendar-month-title">예산</div>
        {{ 1 }}억원
      </div>
    </div>
    <div class="calendar-app-container">
      <BaseCalendar
        class="base-calendar"
        :handleDateClick="handleDateClick"
        :handleEventClick="handleEventClick"
        :handleDateSet="handleDateSet"
        :events="events"
      />
    </div>
    <div class="calendar-detail-container">
      <div class="event-details">
        <div v-if="selectedEvents.length === 0" style="text-align: center">내역이 없습니다</div>
        <div v-for="select in selectedEvents" class="event-detail-item">
          <h3>{{ select.title }}</h3>
          <div class="event-detail-inline" v-if="select.start">
            <span>날짜</span><span>{{ formatDate(select.start) }}</span>
          </div>
          <div class="event-detail-inline" v-if="select.category">
            <span>카테고리</span><span>{{ select.category }}</span>
          </div>
          <div class="event-detail-inline" v-if="select.desc">
            <span>설명</span><span>{{ select.desc }}</span>
          </div>
          <div class="event-detail-inline" v-if="select.amount">
            <span>금액</span><span>{{ select.amount.toLocaleString() }}원</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseCalendar from '@/components/calender/BaseCalendar.vue'
import { computed, ref } from 'vue'

const yearMonth = ref('')
const selectedEvent = ref(null)
const events = ref([])
const selectedEvents = ref([])
const entries = [
  {
    id: 1,
    ledgerId: 1,
    isWithDraw: true,
    when: '2025-04-01',
    where: '이마트',
    category: '식품',
    amount: 55000,
    desc: '주간 식품 구매',
    author: 'hong',
  },
  {
    id: 2,
    ledgerId: 1,
    isWithDraw: true,
    when: '2025-04-01',
    where: '카페',
    category: '음료',
    amount: 5000,
    desc: '아메리카노',
    author: 'hong',
  },
  {
    id: 3,
    ledgerId: 1,
    isWithDraw: false,
    when: '2025-04-05',
    where: '회사',
    category: '급여',
    amount: 2000000,
    desc: '4월 급여',
    author: 'hong',
  },
  {
    id: 2,
    ledgerId: 1,
    isWithDraw: true,
    when: '2025-04-01',
    where: '카페',
    category: '음료',
    amount: 5000,
    desc: '아메리카노',
    author: 'hong',
  },
  {
    id: 2,
    ledgerId: 1,
    isWithDraw: true,
    when: '2025-04-01',
    where: '카페',
    category: '음료',
    amount: 5000,
    desc: '아메리카노',
    author: 'hong',
  },
  {
    id: 2,
    ledgerId: 1,
    isWithDraw: true,
    when: '2025-04-01',
    where: '카페',
    category: '음료',
    amount: 5000,
    desc: '아메리카노',
    author: 'hong',
  },
]

const handleDateSet = info => {
  let year = info.start.getFullYear()
  let month = info.start.getMonth() + 1
  let day = info.start.getDate()

  if (day !== 1) {
    month += 1
    if (month === 13) month = 1
  }

  yearMonth.value = [year, month]
}

const isCurrentMonth = eventDate => {
  const date = new Date(eventDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return year === yearMonth.value[0] && month === yearMonth.value[1]
}

const entriesTotalMonthSpend = computed(() =>
  entries.reduce(
    (acc, cur) => acc + (cur.isWithDraw && isCurrentMonth(cur.when) ? cur.amount : 0),
    0
  )
)

const entriesTotalMonthIncome = computed(() =>
  entries.reduce(
    (acc, cur) => acc + (!cur.isWithDraw && isCurrentMonth(cur.when) ? cur.amount : 0),
    0
  )
)

const scaleEntriesToEvents = () => {
  events.value = entries.map(entry => {
    return {
      id: entry.id,
      ledgerId: entry.ledgerId,
      title: entry.where,
      start: entry.when,
      category: entry.category,
      amount: entry.amount,
      desc: entry.desc,
      author: entry.author,
      backgroundColor: entry.isWithDraw ? '#f04747' : '#43b581',
      borderColor: 'rgb(0, 0, 0, 0)',
    }
  })
}

// 날짜 클릭 핸들러
const handleDateClick = info => {
  selectedEvents.value = events.value.filter(event => event.start === info.dateStr)
  console.log(selectedEvents.value)
}

// 이벤트 클릭 핸들러
const handleEventClick = info => {
  selectedEvent.value = {
    id: info.event.id,
    title: info.event.title,
    start: info.event.start,
    description: info.event.extendedProps.description,
  }
}

// 날짜 포맷 함수
function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

scaleEntriesToEvents()
</script>

<style scoped>
.calendar-page-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 15vh 70vh;
  gap: 1rem;
}
.calendar-month-container {
  grid-column: 1 / -1; /* 첫 번째 열부터 마지막 열까지 차지 (전체 너비) */
  display: flex;
}
.calendar-month-block {
  flex: 1;
  font-size: 1.6rem;
  font-weight: bold;
  border-left: 7px solid #55b4a188;
  border-bottom: 1px solid #55b4a188;
  border-top: 1px solid #55b4a188;
  padding: 1rem 1rem;
}
.calendar-month-title {
  font-size: 1rem;
  color: #777;
}
.event-details {
  max-width: 21.875rem;
  max-height: 100%;
  margin: 0.6rem auto;
  background-color: rgb(249, 249, 249);
  border: 1px solid #ddd;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  font-family: 'Courier New'; /*영수증 느낌의 폰트*/
  color: #333;
  overflow-y: auto;
}
.event-detail-item {
  padding: 0.625rem 0;
  border-bottom: 1px dashed #ccc;
}

.event-detail-item:last-child {
  border-bottom: none;
}

.event-detail-item h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0 1rem 0;
  text-align: center;
  text-transform: uppercase;
}

/* 내용 스타일 */
.event-detail-inline {
  margin: 0.25rem 0;
  font-size: 0.875rem;
  display: flex;
  justify-content: space-between;
}

/* 금액 강조 스타일 */
.event-detail-inline:nth-child(5) {
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 0.6rem;
}
.calendar-app-container {
  grid-column: 1 / 9; /* 첫 번째 열부터 9번째 열까지 (8/12) */
}
.calendar-detail-container {
  grid-column: 9 / -1; /* 첫 번째 열부터 9번째 열까지 (8/12) */
}
</style>
