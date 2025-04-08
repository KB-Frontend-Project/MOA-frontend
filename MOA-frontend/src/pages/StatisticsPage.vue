<template>
  <div>
    <h1>LineChart</h1>
    <LineChart :chartData="data1" :chartOptions="options1" />
    <h1>BarChart</h1>
    <BarChart :chartData="data2" :chartOptions="options2" />
    <h1>PieChart</h1>
    <PieChart :chartData="data3" :chartOptions="options3" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineChart from '@/components/statistics/LineGraph.vue'
import BarChart from '@/components/statistics/BarChart.vue'
import PieChart from '@/components/statistics/PieChart.vue'

const data1 = ref({
  labels: ['1월', '2월', '3월', '4월', '5월'],
  datasets: [
    {
      label: '매출',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      data: [300, 400, 500, 450, 600],
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
      text: '월별 매출 추이',
    },
  },
})

const data2 = ref({
  labels: ['1월', '2월', '3월', '4월', '5월'],
  datasets: [
    {
      label: '매출',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [300, 400, 500, 450, 600],
    },
  ],
})

const options2 = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: '월별 매출 막대 그래프',
    },
  },
})

const data3 = ref({
  labels: ['사과', '바나나', '체리'],
  datasets: [
    {
      label: '과일 선호도',
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // 사과
        'rgba(255, 206, 86, 0.6)', // 바나나
        'rgba(54, 162, 235, 0.6)', // 체리
      ],
      data: [30, 50, 20],
    },
  ],
})

const options3 = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '과일 선호도 파이 차트',
    },
  },
})
</script>
