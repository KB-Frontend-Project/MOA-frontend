<template>
  <div class="main-page">
    <div class="page-body">
      <div class="dashboard">
        <!-- 상단 요약 및 거래 -->
        <section class="summary-section">
          <div class="recent">
            <h2>최근 거래</h2>
            <div class="transaction" v-for="entry in recentEntries" :key="entry.id">
              <span>{{ formatDate(entry.when) }}</span>
              <span :class="{ income: !entry.isWithDraw, expense: entry.isWithDraw }">
                {{ entry.isWithDraw ? '-' : '+' }}{{ formatCurrency(entry.amount) }}
              </span>
              <span class="desc">({{ entry.where }} / {{ entry.category }})</span>
            </div>
          </div>

          <div class="monthly">
            <h2>이번 달 지출</h2>
            <p class="income">+ {{ formatCurrency(monthlyIncome) }} 수입</p>
            <p class="expense">- {{ formatCurrency(monthlyExpense) }} 지출</p>
            <p class="net">합계: {{ formatCurrency(monthlyNet) }}</p>
          </div>
        </section>

        <!-- 하단 차트와 고정 지출 -->
        <section class="charts-section">
          <div class="chart-box">
            <h2>월별 지출</h2>
            <canvas id="monthlyChart" class="chart-canvas"></canvas>
          </div>

          <div class="chart-box">
            <h2>카테고리별 지출</h2>
            <canvas id="categoryChart" class="chart-canvas"></canvas>
          </div>

          <div class="fixed-expenses">
            <h2>고정 지출</h2>
            <div v-for="item in fixedItems" :key="item.day" class="fixed-item">
              <!-- 템플릿 수정 -->
              <span class="day" :class="'color-' + item.day">{{ item.day }}일</span>
              <span class="desc">{{ item.desc }}</span>
              <span class="amount">{{ formatCurrency(item.amount) }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import SideBar from '@/components/layout/SideBar.vue'
import { ref, onMounted } from 'vue'
import { useMoaStore } from '@/stores/moaStore'
import Chart from 'chart.js/auto'

const store = useMoaStore()
const recentEntries = ref([])
const fixedItems = ref([
  { day: 4, desc: '넷플릭스 정기 구독', amount: 6000 },
  { day: 10, desc: '헬스장 정기권', amount: 50000 },
  { day: 15, desc: '휴대폰 요금', amount: 35000 },
  { day: 25, desc: '인터넷+TV', amount: 25000 },
])

const monthlyIncome = 200000
const monthlyExpense = 100000
const monthlyNet = monthlyIncome - monthlyExpense

const formatDate = date => new Date(date).getDate() + ' 일 '
const formatCurrency = num => ` ${Number(num).toLocaleString()} 원`

onMounted(async () => {
  await store.fetchEntrieList()
  recentEntries.value = [...store.states.entrieList].slice(-3).reverse()
  
  // 차트 렌더링 예시
  const ctx1 = document.getElementById('monthlyChart')
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['1월', '2월', '3월'],
      datasets: [
        {
          label: '지출',
          data: [50000, 70000, 30000],
          backgroundColor: '#f08080',
        },
      ],
    },
  })

  const ctx2 = document.getElementById('categoryChart')
  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['식비', '교통', '의료', '기타'],
      datasets: [
        {
          data: [40, 20, 15, 25],
          backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#c2c2f0'],
        },
      ],
    },
  })
})
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
}
.page-body {
  display: flex;
}
.dashboard {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

/* 화면이 너무 넓을 때만 제한 */
@media (min-width: 1600px) {
  .dashboard {
    max-width: 1400px;
    margin: 0 auto;
  }
}

.day {
  font-weight: bold;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  color: white;
  min-width: 3rem;
  text-align: center;
}
.color-4 {
  background: #e57373;
}
.color-10,
.color-15 {
  background: #f6c26b;
}
.color-25 {
  background: #a5d6a7;
}

.summary-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.recent,
.monthly {
  flex: 1;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
}

.monthly {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  padding: 1.2rem;
  border: 1px solid #80bfa3;
  border-radius: 10px;
  font-size: 1rem;
  background: #ffffff;
}
.monthly .income {
  color: #3cb371;
  font-weight: 600;
}
.monthly .expense {
  color: #dc143c;
  font-weight: 600;
}
.monthly .net {
  font-weight: bold;
}

.chart-canvas {
  width: 100% !important;
  max-height: 240px;
}

.transaction {
  border: 1px solid #80bfa3;
  border-radius: 8px;
  padding: 0.8rem;
  margin-bottom: 0.7rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.income {
  color: green;
}
.expense {
  color: red;
}

.charts-section {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.chart-box {
  flex: 1;
  padding: 1rem;
  background: #f4f4f4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.fixed-expenses {
  flex: 1;
  background: #fff8f0;
  padding: 1rem;
  border-radius: 10px;
}
.fixed-item {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0;
}

@media (max-width: 1024px) {
  .summary-section,
  .charts-section {
    flex-direction: column;
  }

  .recent,
  .monthly,
  .chart-box,
  .fixed-expenses {
    width: 100%;
  }

  .transaction {
    flex-wrap: wrap;
    font-size: 0.9rem;
  }

  .dashboard {
    padding: 1rem;
  }
}

.dark-mode .recent,
.dark-mode .monthly,
.dark-mode .transaction,
.dark-mode .chart-box,
.dark-mode .fixed-expenses {
  background-color: #2b2b2b !important;
  color: #eee;
  border-color: #3a3a3a !important;
}

.dark-mode .monthly .income {
  color: #80d9a1;
}
.dark-mode .monthly .expense {
  color: #ff8a80;
}

.dark-mode .fixed-item .amount,
.dark-mode .fixed-item .desc {
  color: #ddd;
}

.dark-mode h2 {
  color: #f0f0f0;
}
</style>
