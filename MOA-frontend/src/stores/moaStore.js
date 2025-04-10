import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoaStore = defineStore('moa', () => {
  const BASEURI = '/api/entries'
  const states = ref({ entrieList: [] })
  const category = ['식비', '교통', '쇼핑', ' 문화']

  const fetchEntrieList = async () => {
    try {
      const response = await axios.get(BASEURI)
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

  const user = ref(null)

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

  return {
    signup,
    login,
    loadUserFromLocalStorage,
    logout,
    updateUser,
    deleteUser,
    fetchEntrieList,
    user,
    category,
    getMonthlySpending,
    getWeeklySpending,
    getCategorySpending,
  }
})
