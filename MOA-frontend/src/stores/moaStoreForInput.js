import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

//InputLedgerPage.vue
export const useMoaStoreForInput = defineStore('moa', () => {
  const fetchLedgerInput = async (data, successCallback = () => {}) => {
    try {
      const response = await axios.post('http://localhost:3000/entries', data)
      if (response.status === 201) {
        successCallback()
      } else {
        console.error('status not 201')
      }
    } catch (error) {
      console.error('fetchLegerInput error', error)
    }
  }

  return { fetchLedgerInput }
})
