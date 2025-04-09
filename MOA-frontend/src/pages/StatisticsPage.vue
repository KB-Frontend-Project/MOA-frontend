<template>
  <div>
    <h1>LineChart</h1>
    <LineChart :chartData="data1" :chartOptions="options1" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import LineChart from '@/components/statistics/LineGraph.vue'
import { useMoaStore } from '@/stores/moaStore'

const moaStore = useMoaStore()
const { fetchEntrieList } = moaStore
const getMonthlySpending = computed(() => moaStore.getMonthlySpending)

onMounted(async () => {
  await fetchEntrieList()
  updateChartData() // 데이터 가져오고 나서 직접 그래프 업데이트
})

const selectMonth = reactive(['3', '4'])

const data1 = ref({
  labels: [],
  datasets: [
    {
      label: '지출',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      data: [],
    },
  ],
})

const options1 = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '월별 소비 추이',
    },
  },
})

// 🔥 monthlySpending 데이터 기반으로 차트 세팅하는 함수
const updateChartData = () => {
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

  data1.value.labels = selectMonth
  data1.value.datasets[0].data = filteredData.map(item => item.totalSpending)
}

// 🔥 getMonthlySpending을 감시하다가 값이 바뀌면 updateChartData 호출
watch(
  () => getMonthlySpending.value,
  newVal => {
    if (newVal) {
      updateChartData()
    }
  }
)
updateChartData()

// onMounted에서는 호출 안 해도 됨
</script>
