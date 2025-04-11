<template>
  <div :class="['chart-page-container', { darkmode: isDarkMode }]">
    <div class="line-chart-container">
      <LineChart
        :key="isDarkMode"
        v-if="isReady"
        :chartData="lineDataMonthly"
        :chartOptions="optionsLine"
      />
    </div>
    <div class="bar-chart-container">
      <BarChart
        :key="isDarkMode"
        v-if="isReady"
        :chartData="barDataWeekly"
        :chartOptions="optionsBar"
      />
    </div>
    <div class="pie-chart-container">
      <PieChart
        :key="isDarkMode"
        v-if="isReady"
        :chartData="pieDataCategory"
        :chartOptions="optionsPie"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import LineChart from '@/components/statistics/LineGraph.vue'
import { useMoaStore } from '@/stores/moaStore'
import BarChart from '@/components/statistics/BarChart.vue'
import PieChart from '@/components/statistics/PieChart.vue'
import { watch } from 'vue'

const moaStore = useMoaStore()
const { fetchEntrieList } = moaStore
const isDarkMode = computed(() => moaStore.isDarkMode)
const getMonthlySpending = computed(() => moaStore.getMonthlySpending)
const getWeeklySpending = computed(() => moaStore.getWeeklySpending)
const getCategorySpending = computed(() => moaStore.getCategorySpending)

const isReady = ref(false)

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

const barDataWeekly = ref({
  labels: ['1주', '2주', '3주', '4주'],
  datasets: [
    {
      label: '지출',
      backgroundColor: 'rgba(67, 181, 129, 0.3)', // 배경색을 더 선명하게
      borderColor: 'rgba(67, 181, 129, 1)',
      borderWidth: 1,
      borderRadius: 2, // 막대 모서리를 둥글게
      hoverBackgroundColor: 'rgba(67, 181, 129, 0.9)', // 호버 시 배경색
      hoverBorderColor: 'rgba(67, 181, 129, 1)',
      data: [],
    },
    {
      label: '수입',
      backgroundColor: 'rgba(240, 71, 71, 0.3)', // 배경색을 더 선명하게
      borderColor: 'rgba(240, 71, 71, 1)',
      borderWidth: 1,
      borderRadius: 2, // 막대 모서리를 둥글게
      hoverBackgroundColor: 'rgba(240, 71, 71, 0.9)', // 호버 시 배경색
      hoverBorderColor: 'rgba(240, 71, 71, 1)',
      data: [],
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
      position: 'top', // 범례 위치
      labels: {
        boxWidth: 12, // 범례 박스 크기
        padding: 15, // 범례 패딩
        font: {
          size: 12,
        },
      },
    },
    title: {
      display: true,
      text: '월별 소비 추이',
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
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // 툴팁 배경색 변경
      titleFont: {
        size: 14,
      },
      bodyFont: {
        size: 13,
      },
      padding: 10,
      cornerRadius: 6, // 툴팁 모서리 둥글게
      displayColors: false, // 툴팁에 색상 상자 표시 안 함
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
        color: 'rgba(0, 0, 0, 0.05)', // 가로선 색상 연하게
        lineWidth: 1,
        drawBorder: false, // 테두리 제거
      },
      ticks: {
        font: {
          size: 11,
        },
        color: '#666',
        padding: 10, // 축과 텍스트 사이 간격
        callback: function (value) {
          return value.toLocaleString() + '원'
        },
      },
      beginAtZero: true, // 0부터 시작
    },
  },
  elements: {
    line: {
      borderWidth: 2, // 선 두께
    },
  },
  interaction: {
    intersect: false, // 정확히 포인트에 호버하지 않아도 가장 가까운 데이터 표시
    mode: 'index',
  },
  animation: {
    duration: 1000, // 애니메이션 지속 시간
    easing: 'easeOutQuart', // 부드러운 애니메이션 효과
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
      display: true,
      text: '주간별 소비 추이',
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
    },
  },
  animation: {
    duration: 1000,
    easing: 'easeOutQuart',
  },
  barPercentage: 0.7, // 막대 너비 조정
  categoryPercentage: 0.8, // 카테고리별 간격 조정
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
      text: '카테고리별 소비 추이',
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
  console.log('전체 월별 소비 데이터:', monthlyData)

  const filteredData = selectMonth.map(monthStr => {
    const monthNum = parseInt(monthStr)
    return monthlyData.find(item => item.month === monthNum) || { totalSpending: 0 }
  })

  console.log('필터링된 월 데이터:', filteredData)

  lineDataMonthly.value.labels = selectMonth.map(item => item + '월')
  lineDataMonthly.value.datasets[0].data = filteredData.map(item => item.totalSpending)
}

const updateWeeklyData = () => {
  barDataWeekly.value.datasets[0].data = getWeeklySpending.value.map(spend => spend.withDraw ?? 0)
  barDataWeekly.value.datasets[1].data = getWeeklySpending.value.map(spend => spend.income ?? 0)

  console.log(barDataWeekly.value)
}

const updateCategoryData = () => {
  pieDataCategory.value.labels = Object.keys(getCategorySpending.value)
  pieDataCategory.value.datasets[0].data = Object.values(getCategorySpending.value)
}

const applyChartColors = isDark => {
  const textColor = isDark ? '#eee' : '#666'
  const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
  const tooltipTextColor = isDark ? '#eee' : '#fff'

  const updateColors = optionsRef => {
    if (optionsRef.value.scales?.x?.ticks) {
      optionsRef.value.scales.x.ticks.color = textColor
      optionsRef.value.scales.x.grid.color = gridColor
    }
    if (optionsRef.value.scales?.y?.ticks) {
      optionsRef.value.scales.y.ticks.color = textColor
      optionsRef.value.scales.y.grid.color = gridColor
    }

    if (optionsRef.value.plugins?.legend?.labels) {
      optionsRef.value.plugins.legend.labels.color = textColor
    }

    if (optionsRef.value.plugins?.title) {
      optionsRef.value.plugins.title.color = textColor
    }

    if (optionsRef.value.plugins?.tooltip) {
      optionsRef.value.plugins.tooltip.titleColor = tooltipTextColor
      optionsRef.value.plugins.tooltip.bodyColor = tooltipTextColor
    }
  }

  updateColors(optionsLine)
  updateColors(optionsBar)
  updateColors(optionsPie)
}

onMounted(async () => {
  await fetchEntrieList()
  updateMonthlyData()
  updateWeeklyData()
  updateCategoryData()

  applyChartColors(isDarkMode.value)
  isReady.value = true
})

watch(isDarkMode, async newVal => {
  await nextTick() // ✅ 렌더 이후 안전하게 반영
  applyChartColors(newVal)
})
</script>
<style scoped>
.chart-page-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 45vh 45vh;
}
.line-chart-container {
  grid-column: 1 / -1;
}

.bar-chart-container {
  grid-column: 1 / 7;
}

.pie-chart-container {
  grid-column: 7 / -1;
}

.chart-page-container.darkmode {
  background-color: #1e1e1e;
  color: #eee;
}

.chart-page-container.darkmode .line-chart-container,
.chart-page-container.darkmode .bar-chart-container,
.chart-page-container.darkmode .pie-chart-container {
  background-color: #1e1e1e;
}

/* Chart.js 내부 스타일은 차트 옵션에서 직접 설정해야 함 */
</style>
