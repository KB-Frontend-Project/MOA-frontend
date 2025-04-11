<template>
  <Bar ref="chartRef" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { ref, toRef, watch, computed } from 'vue'
import { useMoaStore } from '@/stores/moaStore'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
})

const chartRef = ref(null)
const chartOptions = toRef(props, 'chartOptions')

// 다크모드 상태 가져오기
const moaStore = useMoaStore()
const isDarkMode = computed(() => moaStore.isDarkMode)

// 옵션 반영 watch
watch(isDarkMode, () => {
  if (chartRef.value?.chartInstance) {
    chartRef.value.chartInstance.options = chartOptions.value
    chartRef.value.chartInstance.update()
  }
}, { immediate: true })
</script>
