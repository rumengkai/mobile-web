import axios from 'axios'
import { getToken , getGid , getFrom , getVersion} from 'src/utils/auth'
import  { ToastPlugin } from 'vux'
import  Vue from 'vue'
Vue.use(ToastPlugin)
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000,                  // 请求超时时间
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['token'] = getToken()
  config.headers['gid'] = getGid()
  config.headers['from'] = getFrom()
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 0) {
      Vue.$vux.toast.show({
          text: res.error,
          time:3000,
          width:'auto',
          type:'warn'
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      // 成功
      return res
    }
  },
  error => {
    console.log('err' + error)// for debug
    Vue.$vux.toast.show({
        text: error.message,
        time:3000,
        width:'auto',
        type:'warn'
    })
    return Promise.reject(error)
  }
)

export default service
