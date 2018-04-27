import fetch from 'src/utils/fetch'

/* 获取验证码 */
export function getCode(params) {
  return fetch({
    url: '/api/users/get_code.json',
    method: 'post',
    params
  })
}
/* 更改手机号 */
export function phoneUpdate(params) {
  return fetch({
    url: '/api/accounts/update_phone.json',
    method: 'post',
    params
  })
}