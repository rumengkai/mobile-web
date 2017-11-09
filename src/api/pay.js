import fetch from 'src/utils/fetch'

export function createOrder(params) {
  return fetch({
    url: '/pay/weixin/create_order',
    method: 'post',
    params
  })
}

export function weixinCheck(params) {
  return fetch({
    url: '/pay/weixin/check',
    method: 'post',
    params
  })
}
