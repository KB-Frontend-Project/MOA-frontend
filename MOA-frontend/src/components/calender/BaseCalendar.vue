<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import { ref, toRef } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

// 상태 정의

const props = defineProps(['handleDateClick', 'handleEventClick', 'handleDateSet', 'events'])
const events = toRef(() => props.events)

const { handleDateClick, handleEventClick, handleDateSet } = props

// 캘린더 옵션 설정
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  contentHeight: '28rem',
  locale: 'ko',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay',
  },
  dayMaxEvents: 2,
  datesSet: handleDateSet,
  events: events,
  eventClick: handleEventClick,
  dateClick: handleDateClick,
  eventTimeFormat: {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short',
  },
})
</script>

<style scoped></style>
