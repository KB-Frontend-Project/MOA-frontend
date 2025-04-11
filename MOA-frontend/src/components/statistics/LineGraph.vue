<template>
  <Line ref="chartRef" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'
import { onMounted, watch,toRef, ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement)

const props = defineProps(['chartData', 'chartOptions'])
const chartRef = ref(null)
const chartData = toRef(props, 'chartData')
const chartOptions = toRef(props, 'chartOptions')

watch(chartOptions, () => {
  if (chartRef.value?.chartInstance) {
    chartRef.value.chartInstance.options = chartOptions.value
    chartRef.value.chartInstance.update()
  }
}, { deep: true })
</script>
