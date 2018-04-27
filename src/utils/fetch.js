import axios from 'axios'
import { getToken , getGid , getFrom , getVersion} from 'src/utils/auth'
import  Vue from 'vue'
import { toast } from 'src/common/js/assembly';
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
    if (res.status == 0) {
			// 成功
      return res
    } else if(res.status == 4){
			return res
      // toast(res.error)
			// return Promise.reject({'error':res})
    } else {
      toast(res.error)
      return Promise.reject({'error':res})
    }
  },
  error => {
    console.log('err' + error)// for debug
    toast(error.message)
    return Promise.reject(error)
  }
)
export default service
