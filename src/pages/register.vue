<template>
    <div class="register-container">
        <el-card class="register-card">
            <template #header>
                <h2>用户注册</h2>
            </template>
            <el-form :model="registerForm" :rules="rules" ref="registerFormRef">
                <el-form-item prop="username">
                    <el-input v-model="registerForm.username" placeholder="请输入用户名" prefix-icon="User" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
                        show-password />
                </el-form-item>
                <el-form-item prop="confirmPassword">
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请确认密码"
                        prefix-icon="Lock" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" class="register-button"
                        @click="handleRegister">注册</el-button>
                    <div class="login-link">
                        已有账号？<el-link type="primary" @click="router.push('/login')">立即登录</el-link>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { register } from '@/api/user'

const router = useRouter()
const registerFormRef = ref(null)
const loading = ref(false)

const registerForm = reactive({
    username: '',
    password: '',
    confirmPassword: ''
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (registerForm.confirmPassword !== '') {
            registerFormRef.value.validateField('confirmPassword')
        }
        callback()
    }
}

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致'))
    } else {
        callback()
    }
}

const rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    confirmPassword: [{ validator: validatePass2, trigger: 'blur' }]
}

const handleRegister = async () => {
    if (!registerFormRef.value) return

    try {
        await registerFormRef.value.validate()
        loading.value = true

        await register({
            username: registerForm.username,
            password: registerForm.password
        })

        ElMessage.success('注册成功')
        router.push('/login')
    } catch (error) {
        ElMessage.error(error.message || '注册失败')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.register-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}

.register-card {
    width: 400px;
}

.register-card :deep(.el-card__header) {
    text-align: center;
}

.register-button {
    width: 100%;
}

.login-link {
    text-align: center;
    margin-top: 15px;
}
</style>