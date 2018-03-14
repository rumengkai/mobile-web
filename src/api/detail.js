import fetch from 'src/utils/fetch'

export function getDetail(params) {
  return fetch({
    url: '/api/articles/'+params.id,
    method: 'get',
    params
  })
}
