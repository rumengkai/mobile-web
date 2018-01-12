import fetch from 'src/utils/fetch'

export function exchangeGiftCard(params) {
  return fetch({
    url: '/api/codes/exchange',
    method: 'post',
    params
  })
}
