<template>
  <div class="outer">
    <div class="mb-3 me-3">
      <LedgerListHeader />
    </div>
    <div class="overflow-auto shell">
      <LedgerListItem v-for="i in dataArr.datas" :key="i.entryId" :_ledgerItemInfo="i" />
    </div>
  </div>
</template>

<script setup>
import LedgerListHeader from './LedgerListHeader.vue'
import LedgerListItem from './LedgerListItem.vue'
import { ref, reactive, defineProps, computed, watchEffect, watch } from 'vue'

const props = defineProps({
  _dataArr: { type: Object, required: true },
  _sort: { type: String },
  _authorFilter: { type: String },
})

const originArr = reactive({ datas: [] })
watchEffect(() => {
  originArr.datas = props._dataArr.datas
})

const dataArr = reactive({
  datas: [],
})
const authorFilter = ref('')
watchEffect(() => {
  authorFilter.value = props._authorFilter
})

watchEffect(() => {
  copyDataArr()
})

function copyDataArr() {
  dataArr.datas = [...originArr.datas]
}

watch(authorFilter, (cur, old) => {
  if (cur != '') {
    dataArr.datas = originArr.datas.filter(item => {
      return item.author == cur
    })
  } else {
    copyDataArr()
    sortingDataArr()
  }
})

function sortingDataArr() {
  if (props._sort == 'isWithDraw') {
    dataArr.datas.sort(function (a, b) {
      if (a.isWithDraw > b.isWithDraw) return 1
      else if (a.isWithDraw < b.isWithDraw) return -1
      else if (a.isWithDraw == b.isWithDraw) return 0
    })
  } else if (props._sort == 'when') {
    dataArr.datas.sort(function (a, b) {
      if (a.when > b.when) return 1
      else if (a.when < b.when) return -1
      else if (a.when == b.when) return 0
    })
  } else if (props._sort == 'where') {
    dataArr.datas.sort(function (a, b) {
      if (a.where > b.where) return 1
      else if (a.where < b.where) return -1
      else if (a.where == b.where) return 0
    })
  } else if (props._sort == 'category') {
    dataArr.datas.sort(function (a, b) {
      if (a.category > b.category) return 1
      else if (a.category < b.category) return -1
      else if (a.category == b.category) return 0
    })
  } else if (props._sort == 'amount') {
    dataArr.datas.sort(function (a, b) {
      if (a.amount > b.amount) return 1
      else if (a.amount < b.amount) return -1
      else if (a.amount == b.amount) return 0
    })
  } else if (props._sort == 'author') {
    dataArr.datas.sort(function (a, b) {
      if (a.author > b.author) return 1
      else if (a.author < b.author) return -1
      else if (a.author == b.author) return 0
    })
  } else {
    dataArr.datas.sort(function (a, b) {
      if (a.when > b.when) return 1
      else if (a.when < b.when) return -1
      else if (a.when == b.when) return 0
    })
  }
}

watchEffect(() => {
  sortingDataArr()
})
</script>

<style scoped>
div.shell {
  height: 30rem;
}
</style>
