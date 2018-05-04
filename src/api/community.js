import fetch from 'src/utils/fetch'

export function getCommunityDetail(params) {
  return fetch({
    url: '/api/communities/tweets/'+params.id,
    method: 'get'
  })
}

export function getLikedCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/comments/do_like',
    method: 'post',
    params
  })
}

export function getUnLikedCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/comments/cancel_like',
    method: 'post',
    params
  })
}

export function getDeleteCommunity(params) {
  return fetch({
    url: '/api/communities/tweets/comments/delete',
    method: 'post',
    params
  })
}

export function getUnitedIndex(params) {
  return fetch({
    url: '/api/communities/detail/'+params.id,
    method: 'get'
  })
}

export function getLikeComment(params) {
  return fetch({
    url: '/api/communities/tweets/do_like',
    method: 'post',
    params
  })
}

export function getUnLikeComment(params) {
  return fetch({
    url: '/api/communities/tweets/cancel_like',
    method: 'post',
    params
  })
}

export function getDeleteComment(params) {
  return fetch({
    url: '/api/communities/tweets/delete',
    method: 'post',
    params
  })
}
