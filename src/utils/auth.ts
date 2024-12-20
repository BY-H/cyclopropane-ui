const tokenKey = 'cyclopropane-token'

// 获取 Token
export function getToken() {
    const token: string = localStorage.getItem(tokenKey) || ''
    return token
}

// 设置 Token
export function setToken(token: string) {
    localStorage.setItem(tokenKey, token)
}

// Token 是否过期
export function isTokenValid(): boolean {
    const token = getToken()

    if (!token) {
        return false
    }

    try {
        const payload = token.split('.')[1]
        const decodedPayload = JSON.parse(atob(payload))
        const exp = decodedPayload.exp

        if (!exp) {
            return false
        }

        return Date.now() < exp * 1000
    } catch (error) {
        console.error('Token validation error: ', error)
    }

    return false
}
