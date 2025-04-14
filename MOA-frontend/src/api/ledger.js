import { instance } from './common.js'

export const fetchEntrieList = async () => {
  try {
    const res = await instance.get('/entries')
    return res.data
  } catch (error) {
    console.log('fetchEntrieList 에러', error)
  }
}

export const fetchLedgerList = async () => {
  try {
    const [ledgerRes, userLedgerRes] = await Promise.all([
      instance.get('/ledgers'),
      instance.get('/user_ledgers'),
    ])
    return [ledgerRes.data, userLedgerRes.data]
  } catch (err) {
    console.error('fetchLedgerList 에러:', err)
  }
}

export const postLedgerInput = async (data, userId) => {
  try {
    const res = await instance.post('/entries', {
      params: {
        ...data,
        author: userId,
      },
    })
    return res.data
  } catch (error) {
    console.error('fetchLegerInput error', error)
  }
}
