<template>
  <div class="outer" :style="deleteStyle">
    <div class="container seprate">
      <span v-if="_ledgerItemInfo.isWithDraw" class="withdrawspan rounded-pill">지출</span>
      <span v-else class="incomespan rounded-pill">수입</span>
    </div>
    <div class="container datediv">
      <span>{{ _ledgerItemInfo.when }}</span>
    </div>
    <div class="container textdiv">
      <span>{{ _ledgerItemInfo.category.substring(0, 10) }}</span>
    </div>
    <div class="container textdiv">
      <span>{{ _ledgerItemInfo.where.substring(0, 10) }}</span>
    </div>
    <div class="container amount">
      <span> {{ parseInt(_ledgerItemInfo.amount).toLocaleString() }}원</span>
    </div>
    <div class="container textdiv">
      <span>{{ _ledgerItemInfo.desc.substring(0, 10) }}</span>
    </div>
    <div class="container author">
      <span> {{ _ledgerItemInfo.author.substring(0, 10) }} </span>
    </div>
    <div class="container bc">
      <BaseButton
        _is-active="true"
        _text="수정하기"
        _type="borderline"
        _text-size="1"
        _w="5"
        _h="2"
      />
    </div>
    <div class="container bc">
      <BaseButton
        _is-active="true"
        _text="삭제하기"
        _type="fill"
        _text-size="1"
        _w="5"
        _h="2"
        @click="deleteClicked"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, defineProps, computed, onMounted } from 'vue'
import BaseButtonLegacy from '../common/BaseButtonLegacy.vue'
import BaseButton from '../common/BaseButton.vue'
import axios from 'axios'

const props = defineProps({
  _ledgerItemInfo: { type: Object, required: true },
})

const entryId = ref(0)
onMounted(() => {
  entryId.value = props._ledgerItemInfo.entryId
})

const deleteStyle = ref('')

const baseURL = 'http://localhost:3000'
const deleteClicked = async () => {
  console.log(entryId.value)

  await axios.delete(baseURL + '/entries/' + entryId.value)

  deleteStyle.value = 'display:none;'
}
</script>

<style scoped>
span {
  margin: 0;
  font-size: 1.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
span.withdrawspan {
  background-color: rgb(255, 120, 120);
}
span.incomespan {
  background-color: #43b581;
}
span.rounded-pill {
  color: white;
  width: 4rem;
  height: 1.75rem;
}

div.outer {
  display: flex;
  margin: 0.75rem;
  background-color: white;
}
div.outer:hover {
  cursor: pointer;
  background-color: #e8fff3;
}

div.container {
  /* border: solid black 1px; */
  padding: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

div.seprate {
  width: 25rem;
}

div.datediv {
  width: 50rem;
}

div.amount {
  padding-right: 0.5rem;
  justify-content: end;
  width: 50rem;
}
div.amount > span {
  color: #43b581;
}

div.textdiv {
  padding-left: 0.5rem;
  justify-content: start;
}

div.author {
  width: 30rem;
}

div.bc {
  padding: 0;
  width: 40rem;
}
</style>
