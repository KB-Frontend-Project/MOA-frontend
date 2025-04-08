<template>
  <div><Bar :data="chartData" :options="chartOptions" /></div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale, // x축 (카테고리용)
  LinearScale, // y축 (숫자용)
  BarElement, // 막대 (Bar) 그리는 요소
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

defineProps({
  chartData: Object,
  chartOptions: Object,
})
</script>
