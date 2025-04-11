import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserLedgerStore = defineStore('userLedgerStore', () => {
  const baseURL = 'http://localhost:3000'

  const userLedgerInfo = reactive({
    userId: 0,
    name: '',
    ownLedgersInfo: [
      // {
      //   ledgerId: 0,
      //   name: '',
      //   desc: '',
      //   isShare: false,
      // },
    ],
  })

  const currentLedgerInfo = reactive({
    id: 0,
    name: '',
    datas: [
      // {
      //   entryId: 0,
      //   isWithDraw: false,
      //   when: '',
      //   where: '',
      //   category: '',
      //   amount: 0,
      //   desc: '',
      //   author: '',
      // },
    ],
  })

  const getCurrentUser = async () => {
    const userEmail = JSON.parse(localStorage.getItem('moa-user')).email

    try {
      let usersData = (await axios.get(baseURL + '/users')).data
      for (let userData of usersData) {
        if (userData.email == userEmail) {
          userLedgerInfo.userId = userData.id
          break
        }
      }

      userLedgerInfo.name = JSON.parse(localStorage.getItem('moa-user')).name
    } catch (e) {
      console.error('error at getCurrentUser func', e)
    }
  }

  const getUserLedgerInfo = async () => {
    try {
      let user_ledgersData = (await axios.get(baseURL + '/user_ledgers')).data

      let tempOwnLedgerIds = []
      for (let i = 0; i < user_ledgersData.length; i++) {
        let user_ledger = user_ledgersData[i]
        if (user_ledger.userId == userLedgerInfo.userId) {
          tempOwnLedgerIds.push(user_ledger.ledgerId)
        }
      }

      userLedgerInfo.ownLedgersInfo = []
      for (let i = 0; i < tempOwnLedgerIds.length; i++) {
        let tempOwnLedgerId = tempOwnLedgerIds[i]

        let ledgerInfo = (await axios.get(baseURL + '/ledgers/' + tempOwnLedgerId)).data
        userLedgerInfo.ownLedgersInfo.push({
          ledgerId: ledgerInfo.id,
          name: ledgerInfo.name,
          desc: ledgerInfo.desc,
          isShare: ledgerInfo.isShare,
        })
      }
    } catch (e) {
      console.error('error at getUserLedgerInfo', e)
    }
  }

  const getCurrentLedgerInfo = async (targetId, targetName) => {
    try {
      currentLedgerInfo.id = targetId
      currentLedgerInfo.name = targetName
      currentLedgerInfo.datas = []

      let ledgerEntriesDatas = (await axios.get(baseURL + '/entries')).data

      for (let ledgerEntry of ledgerEntriesDatas) {
        if (ledgerEntry.ledgerId == targetId) {
          currentLedgerInfo.datas.push({
            entryId: ledgerEntry.id,
            isWithDraw: ledgerEntry.isWithDraw,
            when: ledgerEntry.when,
            where: ledgerEntry.where,
            category: ledgerEntry.category,
            amount: ledgerEntry.amount,
            desc: ledgerEntry.desc,
            author: ledgerEntry.author,
          })
        }
      }

      // console.log(currentLedgerInfo)
    } catch (e) {
      console.error('error at getCurrentLedgerInfo func', e)
    }
  }

  return {
    baseURL,
    userLedgerInfo,
    currentLedgerInfo,
    getCurrentUser,
    getUserLedgerInfo,
    getCurrentLedgerInfo,
  }
})
