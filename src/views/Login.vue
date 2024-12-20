<template>
    <el-card class="login-card">
        <el-form ref="loginFormRef" :model="loginForm" label-width="100px">
            <el-form-item label="邮箱" prop="username">
                <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script lang="ts" name="Login" setup>
import { reactive } from 'vue'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import { useRouter } from 'vue-router'
const loginForm = reactive({
    email: '',
    password: ''
})
const router = useRouter()

const submitForm = async () => {
    const res = await login(loginForm)
    if (res == undefined) {
        // 无返回 token 清空输入框
        loginForm.email = ''
        loginForm.password = ''
    } else {
        const token: string = (res as any).token
        setToken(token)
        console.log(router.getRoutes())
        router.push({ name: 'Home' })
    }
}
</script>
<style scoped>
.login-card {
    width: 400px;
    margin: 100px auto;
}
</style>
