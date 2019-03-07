import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3005/api'
})

export const updateToken = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default client
