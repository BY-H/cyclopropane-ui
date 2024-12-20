import { ElMessage } from 'element-plus'

export function setupGlobalErrorHandler() {
    window.addEventListener('unhandledrejection', event => {
        const error = event.reason
        event.preventDefault()
        if (error?.isAxiosError) {
            handleAxiosError(error)
        }
    })
}

function handleAxiosError(error: any) {
    if (error.response) {
        const status = error.response.status
        const errorMap: Record<number, string> = {
            400: '请求参数错误',
            401: '未授权或登录过期',
            403: '拒绝访问',
            404: '请求的资源不存在',
            500: '服务器内部错误',
            502: '网关错误',
            503: '服务暂时不可用',
            504: '网关超时'
        }
        ElMessage.error(errorMap[status] || `请求失败: ${status}`)
    } else {
        ElMessage.error('网络连接异常')
    }
}
