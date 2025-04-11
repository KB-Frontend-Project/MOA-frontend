<template>
  <div>
    <BaseModal :title="title" :message="message" :isModal="createPopup" @close="closetrigger">
      <template #ledgerPopup v-if="show">
        <div class="text-center">
          <div class="d-flex justify-content-start">
            <span><img src="../assets/logo.png" alt="" style="width: 3.5rem" /></span>
            <span
              ><BaseInput _type="text" _ph="가계부 이름" _w="157" v-model:modelValue="ledgerName"
            /></span>
          </div>
          <div class="d-flex justify-content-center">
            <textarea
              class="form-control w-100"
              id="textAreaExample2"
              rows="10"
              placeholder="가계부 설명"
              v-model="ledgerDesc"
            ></textarea>
          </div>
          <div class="d-flex justify-content-center">
            <BaseInput
              _type="text"
              _ph="사용자 이메일"
              _w="90"
              v-model:modelValue="newUser"
              class="ms-0"
            />
            <BaseButton
              _w="7.5"
              _h="2.5"
              _type="fill"
              _text="추가"
              _textSize="1.5"
              _isActive="true"
              _mp="ms-0 mt-3"
              @click="addUserList"
            />
          </div>
          <div class="d-flex">
            <BaseButton
              v-for="userName in userList.datas"
              _type="borderline"
              :_text="userName"
              _textSize="1"
              :_w="userName.length"
              _h="1.75"
              _mp="pe-2 ps-2 ms-0"
              _isActive="true"
              @click="abortUser(userName)"
            />
          </div>
          <BaseButton
            _isActive="true"
            _text="생성!"
            _w="28.5"
            _h="2.5"
            class="ms-0 mt-3"
            _type="fill"
            @click="createLedgerHandler"
          />
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import BaseModal from '@/components/common/BaseModal.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import { onMounted, ref, reactive, computed, watchEffect } from 'vue'
import axios from 'axios'

//0. 새로운 사용자들 목록에서 등록되지 않은 애들 필터링 및 유저ID 얻기
const getUserIdList = async () => {
  const result = []
  const ul = (await axios.get('/api/users')).data
  //   console.log('ul : ', ul)
  for (const oneMail of userList.datas) {
    let index = ul.findIndex(ele => {
      return ele.email == oneMail
    })
    // console.log(oneMail)
    if (index != -1) {
      result.push(ul[index].id)
    }
  }

  return result
}

console.log(new Date())

//1. 가계부 등록, 가계부 ID배정 post

//2. 얻은 유저ID와 배정한 가계부ID 관계 post

const title = ref('가계부 생성')
const message = ref('')

const show = ref(true) // slot 보이기 여부

const props = defineProps({
  createPopup: {
    type: Boolean,
    required: true,
  },
})

// 부모에게 'close' 이벤트를 보낼 준비
const emit = defineEmits(['closetrigger'])

const closetrigger = () => {
  emit('closetrigger')
  console.log('작동')
}

//-------------------------------------------------------------------
const ledgerName = ref('')
const ledgerDesc = ref('')

const userList = reactive({ datas: [JSON.parse(localStorage.getItem('moa-user')).email] })

const newUser = ref('')
const addUserList = () => {
  userList.datas.push(newUser.value)
}
const abortUser = userEmail => {
  let targetIndex = userList.datas.findIndex(ele => ele == userEmail)
  if (targetIndex != -1) userList.datas.splice(targetIndex, 1)
}
const createLedgerHandler = async () => {
  const ledId = await createLedger()
  if (ledId == '-1') return

  const userIdList = await getUserIdList()
  console.log(userIdList, ledId)
  for (const userID of userIdList) {
    const result = {
      id: Date.now().toString(),
      userId: userID.toString(),
      ledgerId: ledId.toString(),
    }
    await axios.post('/api/user_ledgers', result)
  }
}

const createLedger = async () => {
  if (ledgerName == '') return '-1'

  // 오늘 날짜
  const today = new Date()
  // 년도
  const year = today.getFullYear()
  // 월
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  // 일
  const day = today.getDate().toString().padStart(2, '0')
  // yyyymmdd
  const yyyymmdd = `${year}-${month}-${day}`

  const result = {
    id: Date.now().toString(), //고유해
    name: ledgerName.value,
    createdAt: yyyymmdd,
    lastEditAt: yyyymmdd,
    isShare: userList.length > 1,
    desc: ledgerDesc.value,
  }

  await axios.post('/api/ledgers', result)
  return result.id
}
//-------------------------------------------------------------------
</script>

<style lang="scss" scoped>
textarea {
  border: 1px #c5f7e1 solid;
}
textarea:focus {
  outline: none !important;
  border: 1px solid #43b581;
  box-shadow: 0 0 1px #43b581;
}
textarea::placeholder {
  color: gainsboro;
}
.line {
  margin: 0.7rem;
  padding: 0.3rem;
  width: 25rem;
  height: 2.5rem;
  border: 1.5px solid #43b581;
  border-radius: 0.5rem;
}
.noline {
  margin: 0.7rem;
  padding: 0.3rem;
  height: 2.5rem;
  border-radius: 0.5rem;
}
</style>
