import axios from 'axios'

let baseURL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseURL = 'http://127.0.0.1:5000/api'
} else {
  baseURL = ''
}

export const HTTP = axios.create(
  {
    baseURL:baseURL
  }
)