import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useMoaStore = defineStore('moa', () => {
  //월별 소비
  const getMonthlySpending = entries => {
    const monthlySpending = {} // 객체로

    entries.forEach(entry => {
      if (entry.isWithDraw) {
        const date = new Date(entry.when)
        const month = date.getMonth() + 1 // 1~12월 (0-based라 +1 해줘야 함)

        if (!monthlySpending[month]) {
          monthlySpending[month] = 0
        }
        monthlySpending[month] += entry.amount
      }
    })
    const sortedMonthlySpending = Array.from({ length: 12 }, (_, i) => {
      return monthlySpending[i + 1] || 0
    })

    return sortedMonthlySpending
  }
  //---------------------------------
  const user = ref(null)
  const signup = async newUser => {
    try {
      console.log('signup 요청 보냄:', newUser)
      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      if (!res.ok) throw new Error('회원가입 실패')
      const result = await res.json()
      console.log('저장 결과:', result)
      return true
    } catch (err) {
      console.error('에러 발생:', err)
      return false
    }
  }
  const login = async (email, password) => {
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
      const users = await res.json()
      if (users.length === 1) {
        user.value = users[0]
        return { success: true, user: users[0] }
      } else {
        return { success: false }
      }
    } catch (err) {
      console.error('로그인 에러:', err)
      return { success: false }
    }
  }

  return { user, signup, login, getMonthlySpending }
})
