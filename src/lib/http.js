import axios from 'axios';

export const http = axios.create({
  baseURL: __DEV__ ? '' : 'http://www.xxx.com/',
  timeout: 5000
})

http.interceptors.response.use( // 响应前处理
  (response) => {
    const {data, success} = response.data

    if (success) {
      return Promise.resolve(data) 
    } else {
      return Promise.reject({
        success
      })
    }
  },
  (error) => {
    console.error('http error', error)
    return Promise.reject({
      success: false
    })
  }
)
