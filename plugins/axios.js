// app是一个$nuxt对象
export default function (app) {
    const axios = app.$axios; 
    axios.defaults.baseURL = 'http://39.99.141.244:8085/';
   // 基本配置
    axios.defaults.timeout = 10000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  
    // 请求回调
    axios.onRequest(config => {})
  
    // 返回回调
    axios.onResponse(res => {})
  
    // 错误回调
    axios.onError(error => ({error}))
  }