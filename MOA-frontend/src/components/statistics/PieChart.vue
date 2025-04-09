<template>
  <div><Pie :data="chartData" :options="chartOptions"></Pie></div>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement, // <- Pie 차트는 이거 필요해
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

defineProps({
  chartData: Object,
  chartOptions: Object,
})
</script>
