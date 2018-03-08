import fetch from 'src/utils/fetch'

/* 获取直播详情 */
export function getLiveDetail(params) {
  return fetch({
    url: '/api/live/'+params.id+'.json',
    method: 'get',
    params
  })
}

/* 我的直播 */
export function getMyLive(params) {
  return fetch({
    url: '/api/live/my.json',
    method: 'get',
    params
  })
}

/* 预约直播 */
export function advanceLive(params) {
  return fetch({
    url: 'api/live/advance',
    method: 'post',
    params
  })
}

/* 获取云信用户信息 */
export function getYunxinInfo(params) {
  return fetch({
    url: 'api/users/yunxin_info',
    method: 'get',
    params
  })
}