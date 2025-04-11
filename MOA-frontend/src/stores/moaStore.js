import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoaStore = defineStore('moa', () => {
  const categoryWithdraw = ['식비', '교통', '쇼핑', ' 문화']
  const categoryIncome = ['급여', '기타']

  // entrieList(가계부 항목) 외에 다른 컬렉션들도 담기 가능
  const states = reactive({
    entrieList: [],
    ledgerList: [],
    userList: [],
    userLedgerList: [],
    userAccountList: [],
    accountList: [],
  })

  // 테스트용 더미
  // const user = ref({
  //   id: '1',
  //   name: '모찌',
  //   email: 'hong',
  //   password: 'password123',
  //   image: 'profile1.jpg',
  //   createdAt: '2023-01-15',
  //   alert: true,
  //   shake_unit: 5,
  //   balance: 91172,
  // })
  const user = ref(null)

  const ENTRIES_URL = '/api/entries'
  const LEDGERS_URL = '/api/ledgers'
  const USERS_URL = '/api/users'
  const USER_LEDGERS_URL = '/api/user_ledgers'
  const ACCOUNT_URL = '/api/accounts'
  const USER_ACCOUNT_URL = '/api/user_accounts'
  const isDarkMode = ref(false)

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value)
  }

  const initDarkMode = () => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) isDarkMode.value = stored === 'true'
  }

  const fetchEntrieList = async () => {
    try {
      const response = await axios.get(ENTRIES_URL)
      if (response.status === 200) {
        states.entrieList = response.data
        console.log('받은 데이터:', states.entrieList)
      } else {
        alert('데이터 조회 실패')
      }
    } catch (error) {
      console.log('에러 발생:', error)
    }
  }

  /**
   * 4) Ledgers / Users / UserLedgers 가져오기 (확장 예시)
   *    - 필요하다면 각 컬렉션도 불러와서 사용 가능합니다.
   */
  const fetchLedgerList = async () => {
    try {
      const res = await axios.get(LEDGERS_URL)
      if (res.status === 200) {
        states.ledgerList = res.data
        console.log('ledgerList:', states.ledgerList)
      }
    } catch (err) {
      console.error('fetchLedgerList 에러:', err)
    }
  }

  const fetchUserList = async () => {
    try {
      const res = await axios.get(USERS_URL)
      if (res.status === 200) {
        states.userList = res.data
        console.log('userList:', states.userList)
      }
    } catch (err) {
      console.error('fetchUserList 에러:', err)
    }
  }

  const fetchAccountList = async () => {
    try {
      const res = await axios.get(ACCOUNT_URL)
      if (res.status === 200) {
        states.accountList = res.data
        console.log('accountList:', states.accountList)
      }
    } catch (err) {
      console.error('fetchUserList 에러:', err)
    }
  }

  const fetchUserLedgerList = async () => {
    try {
      const res = await axios.get(USER_LEDGERS_URL)
      if (res.status === 200) {
        states.userLedgerList = res.data
        console.log('userLedgerList:', states.userLedgerList)
      }
    } catch (err) {
      console.error('fetchUserLedgerList 에러:', err)
    }
  }

  const fetchUserAccountList = async () => {
    try {
      const res = await axios.get(USER_ACCOUNT_URL)
      if (res.status === 200) {
        states.userAccountList = res.data
        console.log('userAccountList:', states.userAccountList)
      }
    } catch (err) {
      console.error('fetchUserLedgerList 에러:', err)
    }
  }

  const signup = async newUser => {
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (!res.ok) throw new Error('회원가입 실패')
      const result = await res.json()
      return true
    } catch (err) {
      console.error('회원가입 에러:', err)
      return false
    }
  }

  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
      const users = await res.json()
      if (users.length === 1) {
        user.value = users[0]
        localStorage.setItem('moa-user', JSON.stringify(users[0]))
        return { success: true, user: users[0] }
      } else {
        return { success: false }
      }
    } catch (err) {
      console.error('로그인 에러:', err)
      return { success: false }
    }
  }

  const loadUserFromLocalStorage = () => {
    const saved = localStorage.getItem('moa-user')
    if (saved) {
      user.value = JSON.parse(saved)
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('moa-user')
  }

  const updateUser = async (id, data) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('업데이트 실패')
      const updated = await res.json()
      user.value = updated
      localStorage.setItem('moa-user', JSON.stringify(updated))
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const deleteUser = async id => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('삭제 실패')
      user.value = null
      localStorage.removeItem('moa-user')
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const deleteUserAccount = async (id, successCallback = () => {}) => {
    try {
      const [accountResponse, userAccountResponse] = await Promise.all([
        axios.delete(`${ACCOUNT_URL}/${id}`),
        axios.delete(`${USER_ACCOUNT_URL}/${id}`),
      ])
      if (accountResponse.status === 200 && userAccountResponse.status === 200) {
        console.log('response 200')
        successCallback()
      }
    } catch (error) {
      console.error('deleteUserAccount Error', error)
    }
  }

  const postUserAccount = async (account, successCallback = () => {}) => {
    const newId = new Date().toString()
    try {
      const [accountResponse, userAccountResponse] = await Promise.all([
        axios.post(`${ACCOUNT_URL}`, {
          ...account,
          id: newId,
        }),
        axios.post(`${USER_ACCOUNT_URL}`, {
          id: newId,
          userId: user.value.id,
          accountId: newId,
        }),
      ])
      if (accountResponse.status === 201 && userAccountResponse.status === 201) {
        console.log('response 201')
        successCallback()
      }
    } catch (error) {
      console.error('putCurrentAccount Error', error)
    }
  }

  const putUserBalance = async (balance, successCallback = () => {}) => {
    try {
      console.log({
        ...user.value,
        balance: balance,
      })
      const response = await axios.put(`${USERS_URL}/${user.value.id}`, {
        ...user.value,
        balance: balance,
      })
      if (response.status === 200) {
        console.log('response 200')
        successCallback()
      }
    } catch (error) {
      console.error('putCurrentAccount Error', error)
    }
  }

  const putCurrentAccount = async (account, successCallback = () => {}) => {
    try {
      const response = await axios.put(`${ACCOUNT_URL}/${account.id}`, account)
      if (response.status === 200) {
        console.log('response 200')
        successCallback()
      }
    } catch (error) {
      console.error('putCurrentAccount Error', error)
    }
  }

  const getMyLedgerList = computed(() => {
    // const user = { id: 1 }
    //임시 데이터!!! 나중에 user.id -> user.value.id로 수정
    const myLedgerIdList = states.userLedgerList
      .filter(item => {
        if (item.userId === user.value.id) {
          return item.ledgerId
        }
      })
      .map(item => item.ledgerId)
    //결과 : [1, 2, ...]

    const myLedgerList = states.ledgerList.filter(ledger => myLedgerIdList.includes(ledger.id))

    return myLedgerList
  })

  const getMonthlySpending = computed(() => {
    const monthlySpending = {}

    states.entrieList.forEach(entry => {
      if (entry.isWithDraw) {
        const date = new Date(entry.when)
        const month = date.getMonth() + 1

        if (!monthlySpending[month]) {
          monthlySpending[month] = 0
        }
        monthlySpending[month] += entry.amount
      }
    })

    const sortedMonthlySpending = Array.from({ length: 12 }, (_, i) => {
      return { month: i + 1, totalSpending: monthlySpending[i + 1] || 0 }
    })

    return sortedMonthlySpending
  })

  const getWeeklySpending = computed(() => {
    const weeklySpending = []
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    for (let i = 0; i < 4; i++) {
      weeklySpending.push({
        withDraw: 0,
        income: 0,
      })
    }
    states.entrieList.forEach(entry => {
      const entryDate = new Date(entry.when)
      const entryDay = entryDate.getDate()
      const entryMonth = entryDate.getMonth() + 1
      const entryYear = entryDate.getFullYear()

      if (entryMonth === month && entryYear === year) {
        let index = Math.min(3, Math.floor((entryDay - 1) / 7))

        if (entry.isWithDraw) {
          weeklySpending[index].withDraw += entry.amount
        } else {
          weeklySpending[index].income += entry.amount
        }
      }
    })
    return weeklySpending
  })

  const getCategorySpending = computed(() => {
    const categorySpending = { 식비: 0, 교통: 0, 쇼핑: 0, 문화: 0 }

    states.entrieList.forEach(entry => {
      if (entry.isWithDraw) {
        categorySpending[entry.category] += entry.amount
      }
    })

    return categorySpending
  })

  const getMyAccountList = computed(() => {
    //추후에 유저.id를 filter하도록 변경해야함
    console.log('id:', user.value.id)

    const myAccountIdList = states.userAccountList
      .filter(item => {
        if (item.userId === user.value.id) {
          return item.accountId
        }
      })
      .map(item => item.accountId)

    const myAccountList = states.accountList.filter(account => myAccountIdList.includes(account.id))
    return myAccountList
  })

  return {
    user,
    toggleDarkMode,
    isDarkMode,
    initDarkMode,
    states,
    signup,
    login,
    fetchEntrieList,
    fetchLedgerList,
    fetchUserList,
    fetchAccountList,
    fetchUserLedgerList,
    fetchUserAccountList,
    loadUserFromLocalStorage,
    logout,
    updateUser,
    deleteUser,
    fetchEntrieList,
    putCurrentAccount,
    putUserBalance,
    postUserAccount,
    deleteUserAccount,
    getMyAccountList,
    getMyLedgerList,
    user,
    categoryWithdraw,
    categoryIncome,
    getMonthlySpending,
    getWeeklySpending,
    getCategorySpending,
    getMonthlySpending,
  }
})
