import fetch from 'src/utils/fetch'

export function exchangeGiftCard(params) {
  return fetch({
    url: '/api/codes/exchange',
    method: 'post',
    params
  })
}
export function getGiftCard(params) {
  return fetch({
    url: '/api/codes/my_gift_cards',
    method: 'get',
    params
  })
}
