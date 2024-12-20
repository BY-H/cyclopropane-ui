import request from '@/utils/request'

export function getOrders(params: object = {}) {
    return request({
        url: '/api/order/list',
        method: 'GET',
        params
    })
}

export function addOrder(data: object) {
    return request({
        url: '/api/order/add',
        method: 'POST',
        data
    })
}
