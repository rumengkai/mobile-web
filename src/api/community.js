import fetch from 'src/utils/fetch'

export function getCommunityDetail(params) {
  return fetch({
    url: '/api/communities/tweets/'+params.id,
    method: 'get'
  })
}

export function getLikedCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/do_like',
    method: 'post',
    params
  })
}

export function getUnLikedCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/cancel_like',
    method: 'post',
    params
  })
}

export function getDeleteCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/delete',
    method: 'post',
    params
  })
}
