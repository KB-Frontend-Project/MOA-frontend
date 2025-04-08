import { defineStore } from 'pinia'

export const useMoaStore = defineStore('moa', {
  state: () => ({
    user: []
  }),
  actions: {
    async signup(user) {
      try {
        console.log('signup 요청 보냄:', user)

        const res = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })

        if (!res.ok) throw new Error('회원가입 실패')

        const result = await res.json()
        console.log('저장 결과:', result)

        return true
      } catch (err) {
        console.error('에러 발생:', err)
        return false
      }
    },

    async login(email, password) {
        try {
          const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
          const users = await res.json()
    
          if (users.length === 1) {
            this.user = users[0]
            return { success: true, user: users[0] }
          } else {
            return { success: false }
          }
        } catch (err) {
          console.error('로그인 에러:', err)
          return { success: false }
        }
      }
  }
})
