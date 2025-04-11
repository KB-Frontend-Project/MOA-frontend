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
import { ref, watch, toRef } from 'vue'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const props = defineProps({
  chartData: Object,
  chartOptions: Object,
})

const chartRef = ref(null)
const chartOptions = toRef(props, 'chartOptions')

watch(chartOptions, () => {
  if (chartRef.value?.chartInstance) {
    chartRef.value.chartInstance.options = chartOptions.value
    chartRef.value.chartInstance.update()
  }
}, { deep: true })
</script>
