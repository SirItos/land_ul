// import axios from 'axios'
import { showModal } from './modal'

const url = process.env.MODE === 'development' ? 'http://server/' : '/server/'

export const sendRequest = async (payload, methods = 'addCustomer.php') => {
  showModal({ loader: true })
  return await fetch(url + methods, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(payload)
  }).then(
    (response) => {
      return response.json()
    },
    () => {
      return null
    }
  )
}
