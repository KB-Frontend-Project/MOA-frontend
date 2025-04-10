import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoaStore = defineStore('moa', () => {
  const BASEURI = '/api/entries'
  const states = reactive({ entrieList: [] })

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

  const signup = async (newUser) => {
    try {
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
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
        body: JSON.stringify(data)
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

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
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

  return {
    user,
    signup,
    login,
    loadUserFromLocalStorage,
    logout,
    updateUser,
    deleteUser,
    getMonthlySpending
  }
})
