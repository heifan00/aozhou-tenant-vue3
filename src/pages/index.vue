<template>
  <el-container class="layout-container">
    <!-- 顶部导航栏 -->
    <el-header class="header">
      <div class="header-left">
        <el-button type="text" @click="toggleSidebar">
          <el-icon><Fold v-if="isCollapse" /><Expand v-else /></el-icon>
        </el-button>
        <h2 class="title">后台管理系统</h2>
      </div>
      <div class="header-right">
        <el-space>
          <el-badge :value="3" class="notification">
            <el-icon><Bell /></el-icon>
          </el-badge>
          <el-dropdown>
            <el-space>
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span>{{ userInfo.username }}</span>
              <el-icon><CaretBottom /></el-icon>
            </el-space>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </div>
    </el-header>

    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
        <el-menu
          :collapse="isCollapse"
          :collapse-transition="false"
          class="sidebar-menu"
          default-active="1"
        >
          <el-menu-item index="1">
            <el-icon><House /></el-icon>
            <template #title>首页</template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">角色管理</el-menu-item>
            <el-menu-item index="2-3">权限管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="3">
            <el-icon><Setting /></el-icon>
            <template #title>系统设置</template>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content">
        <el-breadcrumb class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>工作台</el-breadcrumb-item>
        </el-breadcrumb>
        
        <div class="content-wrapper">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card shadow="hover" class="dashboard-card">
                <template #header>
                  <div class="card-header">
                    <span>总用户数</span>
                    <el-tag type="success" size="small">月</el-tag>
                  </div>
                </template>
                <div class="card-content">
                  <h3>1,234</h3>
                  <div class="trend">
                    <span>周同比</span>
                    <span class="up">12%</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="dashboard-card">
                <template #header>
                  <div class="card-header">
                    <span>订单数</span>
                    <el-tag type="warning" size="small">月</el-tag>
                  </div>
                </template>
                <div class="card-content">
                  <h3>5,678</h3>
                  <div class="trend">
                    <span>周同比</span>
                    <span class="down">5%</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="dashboard-card">
                <template #header>
                  <div class="card-header">
                    <span>销售额</span>
                    <el-tag type="danger" size="small">月</el-tag>
                  </div>
                </template>
                <div class="card-content">
                  <h3>¥89,745</h3>
                  <div class="trend">
                    <span>周同比</span>
                    <span class="up">18%</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover" class="dashboard-card">
                <template #header>
                  <div class="card-header">
                    <span>活跃度</span>
                    <el-tag type="info" size="small">月</el-tag>
                  </div>
                </template>
                <div class="card-content">
                  <h3>92%</h3>
                  <div class="trend">
                    <span>周同比</span>
                    <span class="up">8%</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { House, Document, Setting, Bell, CaretBottom, Fold, Expand } from '@element-plus/icons-vue'
import { getUserInfo } from '@/api/user.js'

const isCollapse = ref(false)
const userInfo = ref({
  avatar: '',
  name: ''
})

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

onMounted(async () => {
  try {
    const response = await getUserInfo()
    userInfo.value = response
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
})
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: center; /* 确保子元素垂直居中对齐 */
  gap: 10px; /* 添加间距以确保元素在同一水平线 */
}

.notification {
  font-size: 25px;
  cursor: pointer;
  display: flex; /* 添加 flex 布局 */
  align-items: center; /* 垂直居中对齐 */
  margin-right: 10px;
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
}

.content-wrapper {
  min-height: calc(100vh - 160px);
}

.dashboard-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content h3 {
  margin: 0;
  font-size: 28px;
  color: #303133;
}

.trend {
  margin-top: 10px;
  font-size: 14px;
  color: #909399;
  display: flex;
  justify-content: space-between;
}

.up {
  color: #67c23a;
}

.down {
  color: #f56c6c;
}
</style>