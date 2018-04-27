import fetch from 'src/utils/fetch'
/* 分享赚图片 */
export function getShareMoneyImage(params) {
  return fetch({
    url: '/api/share_money/image',
    method: 'get',
    params
  })
}
/* 我的功夫赚 */
export function getShareMoneyMy(params) {
  return fetch({
    url: '/api/share_money/my',
    method: 'get',
    params
  })
}
/* 功夫赚明细 */
export function getShareMoneyLogs(params) {
  return fetch({
    url: '/api/share_money/logs',
    method: 'get',
    params
  })
}
/* 提现 */
export function getShareMoneyTake(params) {
  return fetch({
    url: '/api/share_money/take',
    method: 'post',
    params
  })
}
