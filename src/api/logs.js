import fetch from 'src/utils/fetch'
// 统计埋点接口
export function logs(params) {
  return fetch({
    url: '/api/log',
    method: 'post',
    params
  })
}

