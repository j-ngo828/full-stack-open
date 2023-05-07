import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (payload) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, payload, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }
