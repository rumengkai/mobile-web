import fetch from 'src/utils/fetch'

export function getBooks(params) {
  return fetch({
    url: '/books/index',
    method: 'get',
    params
  })
}
