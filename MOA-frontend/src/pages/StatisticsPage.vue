<template>
  <div class="statistics-container container">
    <div class="statistics-header">
      <!-- <h1 class="page-title">소비 통계</h1> -->

      <div class="highlight-box">
        <div class="highlight-content">
          <span class="highlight-text">이번 달 사용 금액</span>
          <div class="spending-amount">{{ thisMonthSpending.toLocaleString() }}원</div>
        </div>
      </div>
      <div class="highlight-box2">
        <div class="highlight-content">
          <span class="highlight-text">{{ maxMonth }}월에 가장 많이 소비했어요!</span>
          <div class="spending-amount">{{ maxSpendingAmount.toLocaleString() }}원</div>
        </div>
      </div>
    </div>

    <div class="charts-grid">
      <div class="chart-card line-chart">
        <div class="chart-header">
          <h2>월별 소비 추이</h2>
        </div>
        <div class="chart-content">
          <LineChart v-if="isReady" :chartData="lineDataMonthly" :chartOptions="optionsLine" />
        </div>
      </div>

      <div class="chart-card bar-chart">
        <div class="chart-header">
          <div class="bar-chart-header">
            <h2>주별 수익/지출</h2>
            <div class="month-selector">
              <select v-model="selectedMonth" class="month-select">
                <option v-for="month in months" :key="month.value" :value="month.value">
                  {{ month.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="chart-content">
          <BarChart
            v-if="isReady && barLoading"
            :chartData="barDataWeekly"
            :chartOptions="optionsBar"
          />
        </div>
      </div>

      <div class="chart-card pie-chart">
        <div class="chart-header">
          <h2>카테고리별 소비</h2>
        </div>
        <div class="chart-content">
          <PieChart v-if="isReady" :chartData="pieDataCategory" :chartOptions="optionsPie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import LineChart from '@/components/statistics/LineGraph.vue'
import { useMoaStore } from '@/stores/moaStore'
import BarChart from '@/components/statistics/BarChart.vue'
import PieChart from '@/components/statistics/PieChart.vue'

const moaStore = useMoaStore()
const { fetchEntrieList } = moaStore
const getMonthlySpending = computed(() => moaStore.getMonthlySpending)
const { getWeeklySpending } = moaStore
const getCategorySpending = computed(() => moaStore.getCategorySpending)

const maxMonth = computed(() => {
  const monthlyData = getMonthlySpending.value
  if (!monthlyData || monthlyData.length === 0) return '-'

  const maxSpending = Math.max(...monthlyData.map(item => item.totalSpending))
  const maxMonthData = monthlyData.find(item => item.totalSpending === maxSpending)
  return maxMonthData ? maxMonthData.month : '-'
})

const maxSpendingAmount = computed(() => {
  const monthlyData = getMonthlySpending.value
  if (!monthlyData || monthlyData.length === 0) return 0

  const maxSpending = Math.max(...monthlyData.map(item => item.totalSpending))
  return maxSpending
})

const currentMonth = computed(() => {
  const now = new Date()
  return now.getMonth() + 1 // JavaScript의 월은 0부터 시작하므로 1을 더함
})

const isReady = ref(false)
const barLoading = ref(false)

const thisMonthSpending = ref(0)

const selectMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const lineDataMonthly = ref({
  labels: [],
  datasets: [
    {
      label: '지출',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      tension: 0.2,
      fill: false,
      data: [],
      pointRadius: 4,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      pointHoverBorderWidth: 2,
    },
  ],
})

const selectedMonth = ref(new Date().getMonth() + 1) // 현재 월을 기본값으로 설정

const months = [
  { value: 1, label: '1월' },
  { value: 2, label: '2월' },
  { value: 3, label: '3월' },
  { value: 4, label: '4월' },
  { value: 5, label: '5월' },
  { value: 6, label: '6월' },
  { value: 7, label: '7월' },
  { value: 8, label: '8월' },
  { value: 9, label: '9월' },
  { value: 10, label: '10월' },
  { value: 11, label: '11월' },
  { value: 12, label: '12월' },
]

const barDataWeekly = ref({
  labels: ['1주', '2주', '3주', '4주'],
  datasets: [
    {
      label: '지출',
      backgroundColor: 'rgba(67, 181, 129, 0.3)',
      borderColor: 'rgba(67, 181, 129, 1)',
      borderWidth: 1,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(67, 181, 129, 0.9)',
      hoverBorderColor: 'rgba(67, 181, 129, 1)',
      data: [0, 0, 0, 0],
    },
    {
      label: '수입',
      backgroundColor: 'rgba(240, 71, 71, 0.3)',
      borderColor: 'rgba(240, 71, 71, 1)',
      borderWidth: 1,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(240, 71, 71, 0.9)',
      hoverBorderColor: 'rgba(240, 71, 71, 1)',
      data: [0, 0, 0, 0],
    },
  ],
})

const pieDataCategory = ref({
  labels: [],
  datasets: [
    {
      label: '주간 지출',
      backgroundColor: [
        'rgba(67, 181, 129, 0.7)', // 초록색
        'rgba(240, 71, 71, 0.7)', // 빨간색
        'rgba(53, 162, 235, 0.7)', // 파란색
        'rgba(255, 159, 64, 0.7)', // 주황색
      ],
      borderColor: '#fff',
      borderWidth: 2,
      hoverBackgroundColor: [
        'rgba(67, 181, 129, 0.9)',
        'rgba(240, 71, 71, 0.9)',
        'rgba(53, 162, 235, 0.9)',
        'rgba(255, 159, 64, 0.9)',
      ],
      hoverBorderColor: '#fff',
      hoverBorderWidth: 2,
      data: [],
    },
  ],
})

const optionsLine = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      padding: 10,
      cornerRadius: 6,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#666',
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        lineWidth: 1,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#666',
        padding: 10,
        callback: function (value) {
          return value.toLocaleString() + '원'
        },
      },
      beginAtZero: true,
    },
  },
  elements: {
    line: {
      borderWidth: 2,
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  layout: {
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
  },
})

const optionsBar = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      padding: 10,
      cornerRadius: 6,
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}원`
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#666',
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
        lineWidth: 1,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#666',
        padding: 10,
        callback: function (value) {
          return value.toLocaleString() + '원'
        },
      },
      beginAtZero: true,
      suggestedMin: 0,
      suggestedMax: function (context) {
        const values = context.chart.data.datasets[0].data
        const max = Math.max(...values)
        return Math.ceil(max * 1.2) // 최대값의 120%로 설정
      },
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  barPercentage: 0.6,
  categoryPercentage: 0.8,
  layout: {
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
})

const optionsPie = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'right', // 파이 차트는 보통 오른쪽에 범례를 표시
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      // text: '카테고리별 소비 추이',
      font: {
        size: 16,
        weight: 'bold',
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      padding: 10,
      cornerRadius: 6,
      callbacks: {
        label: function (context) {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a, b) => a + b, 0)
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value.toLocaleString()}원 (${percentage}%)`
        },
      },
    },
  },
  // 파이 차트 특유의 설정
  cutout: '0%', // 도넛 차트 효과를 위한 설정 (0%는 완전한 파이 차트)
  radius: '90%', // 차트 크기
  animation: {
    animateRotate: true, // 회전 애니메이션
    animateScale: true, // 크기 변화 애니메이션
    duration: 1000,
    easing: 'easeOutQuart',
  },
})

const updateMonthlyData = () => {
  const monthlyData = getMonthlySpending.value
  if (!monthlyData) {
    console.warn('monthlyData가 아직 준비 안 됨')
    return
  }

  const filteredData = selectMonth.map(monthStr => {
    const monthNum = parseInt(monthStr)
    return monthlyData.find(item => item.month === monthNum) || { totalSpending: 0 }
  })

  console.log('필터링된 월 데이터:', filteredData)

  lineDataMonthly.value.labels = selectMonth.map(item => item + '월')
  lineDataMonthly.value.datasets[0].data = filteredData.map(item => item.totalSpending)
}

const updateBarChartData = () => {
  barLoading.value = true

  console.log('Bar차트 업데이트')
  const targetMonth = selectedMonth.value
  const weeklyData = getWeeklySpending(targetMonth) // 함수 호출

  if (!weeklyData) {
    console.log('No weekly data available')
    return
  }

  console.log('Weekly Data:', weeklyData)
  console.log('Selected Month:', targetMonth)

  if (weeklyData.length === 0) {
    console.log('No data available, initializing with zeros')
    barDataWeekly.value.datasets[0].data = [0, 0, 0, 0]
    barDataWeekly.value.datasets[1].data = [0, 0, 0, 0]
    thisMonthSpending.value = 0 // 데이터 없으면 총액도 0으로
    return
  }

  const weeklyWithDraw = [0, 0, 0, 0]
  const weeklyIncome = [0, 0, 0, 0]

  weeklyData.forEach((item, index) => {
    if (index < 4) {
      weeklyWithDraw[index] = item.withDraw ?? 0
      weeklyIncome[index] = item.income ?? 0
    }
  })

  console.log('Mapped Data:', {
    weeklyWithDraw,
    weeklyIncome,
  })

  barDataWeekly.value.datasets[0].data = weeklyWithDraw
  barDataWeekly.value.datasets[1].data = weeklyIncome

  // 🔥 여기 추가
  const totalSpending = weeklyData.reduce((sum, item) => sum + (item.withDraw ?? 0), 0)
  thisMonthSpending.value = totalSpending

  console.log('이번 달 총 사용 금액:', thisMonthSpending.value)
  console.log('Final Bar Chart Data:', barDataWeekly.value)
}

const updateCategoryData = () => {
  pieDataCategory.value.labels = Object.keys(getCategorySpending.value)
  pieDataCategory.value.datasets[0].data = Object.values(getCategorySpending.value)
}

onMounted(async () => {
  await fetchEntrieList()
  updateMonthlyData()
  updateBarChartData()
  updateCategoryData()
  isReady.value = true
  barLoading.value = true
})

// 월 선택이 변경될 때마다 차트 업데이트
watch(
  selectedMonth,
  async () => {
    barLoading.value = false
    await nextTick() // 화면이 실제로 반영될 때까지 기다려
    updateBarChartData()
    showChart.value = true
  },
  { immediate: true }
)
</script>

<style scoped>
.statistics-container {
  padding: 2rem;
  min-height: 100vh;
}

.statistics-header {
  margin-bottom: 3rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  color: #43b581;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.highlight-box {
  background: linear-gradient(135deg, #43b581 0%, #3aa876 100%);
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 16px;
  display: inline-block;
  box-shadow: 0 8px 16px rgba(67, 181, 129, 0.2);
  min-width: 300px;
  transition: transform 0.2s ease;
}

.highlight-box2 {
  background: #7289da;
  padding: 1rem;
  margin-left: 1rem;
  border-radius: 16px;
  display: inline-block;
  box-shadow: 0 8px 16px rgba(67, 181, 129, 0.2);
  min-width: 300px;
  transition: transform 0.2s ease;
}

.highlight-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(67, 181, 129, 0.3);
}

.highlight-content {
  text-align: center;
}

.highlight-text {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  display: block;
  margin-bottom: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.spending-amount {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-top: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.chart-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(67, 181, 129, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(67, 181, 129, 0.1);
  display: flex;
  flex-direction: column;
  height: 400px; /* 모든 카드의 높이를 동일하게 설정 */
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(67, 181, 129, 0.15);
  border-color: rgba(67, 181, 129, 0.2);
}

.chart-header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(67, 181, 129, 0.1);
  flex-shrink: 0; /* 헤더 크기 고정 */
}

.chart-header h2 {
  font-size: 1.2rem;
  color: #43b581;
  font-weight: 600;
  margin: 0;
}

.chart-content {
  flex: 1;
  position: relative;
  min-height: 0;
  height: 100%; /* 컨텐츠 영역이 남은 공간을 모두 차지하도록 설정 */
}

.line-chart {
  grid-column: 1 / -1;
}

.bar-chart {
  grid-column: 1 / 7;
}

.pie-chart {
  grid-column: 7 / -1;
}

@media (max-width: 1024px) {
  .bar-chart,
  .pie-chart {
    grid-column: 1 / -1;
    height: 400px;
  }

  .statistics-container {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .statistics-container {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .highlight-text {
    font-size: 1.1rem;
  }

  .spending-amount {
    font-size: 1.6rem;
  }

  .chart-card {
    padding: 1rem;
  }

  .chart-header h2 {
    font-size: 1.1rem;
  }
}

.bar-chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.month-selector {
  margin-left: 1rem;
}

.month-select {
  padding: 0.5rem;
  border: 1px solid rgba(67, 181, 129, 0.3);
  border-radius: 8px;
  background-color: white;
  color: #43b581;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.month-select:hover {
  border-color: #43b581;
}

.month-select:focus {
  outline: none;
  border-color: #43b581;
  box-shadow: 0 0 0 2px rgba(67, 181, 129, 0.1);
}
</style>
