<template>
  <div>
    <h1>LineChart</h1>
    <LineChart :chartData="data1" :chartOptions="options1" style="width: 50rem; height: auto" />
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
})

const selectMonth = reactive(['3', '4'])

const data1 = reactive({
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

  data1.labels = selectMonth
  data1.datasets[0].data = filteredData.map(item => item.totalSpending)
}

watch(
  () => getMonthlySpending.value,
  newVal => {
    if (newVal && newVal.length > 0) {
      updateChartData()
    }
  },
  { immediate: true }
)
</script>
