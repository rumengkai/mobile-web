import fetch from 'src/utils/fetch'

export function getChannelInfo(params) {
    return fetch({
        url: '/api/channels/' + params.id,
        method: 'get',
        params
    })
}

export function getChannelArticle(params) {
    return fetch({
        url: '/api/channels/articles',
        method: 'get',
        params
    })
}