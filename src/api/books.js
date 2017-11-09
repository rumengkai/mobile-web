import fetch from 'src/utils/fetch'

export function getBooks(params) {
  return fetch({
    url: '/api/books/index',
    method: 'get',
    params
  })
}
// 书架
export function getMyBooks(params) {
  return fetch({
    url: '/api/books/my_bookshelf',
    method: 'get',
    params
  })
}
// 书单
export function getBooksList(params) {
  return fetch({
    url: '/api/books/booklist',
    method: 'get',
    params
  })
}
// 书籍详情
export function getBooksDetail(params) {
  return fetch({
    url: '/api/books/'+params.id,
    method: 'get',
    params
  })
}
// 添加到书架
export function addShelf(params) {
  return fetch({
    url: '/api/books/follow',
    method: 'post',
    params
  })
}
// 移除书架
export function delShelf(params) {
  return fetch({
    url: '/api/books/unfollow',
    method: 'post',
    params
  })
}
