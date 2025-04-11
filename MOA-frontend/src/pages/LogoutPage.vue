<template></template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  localStorage.removeItem('moa-user')
  router.replace('/')
})
</script>

<style scoped></style>
