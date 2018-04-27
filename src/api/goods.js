import fetch from 'src/utils/fetch'

/* 组合商品订单 */
export function getCheckComposite(params) {
  return fetch({
    url: '/api/items/check_composite',
    method: 'get',
    params
  })
}
