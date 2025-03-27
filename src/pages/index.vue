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
                <el-dropdown-item @click="handleProfileClick">个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-space>
      </div>
      <!-- 引入用户信息弹窗，传递用户数据 -->
      <UserInfoDialog ref="userInfoDialog" :userInfo="userInfo" />
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
          <!-- 动态生成菜单 -->
          <template v-for="item in menuConfig" :key="item.index">
            <el-sub-menu v-if="item.children" :index="item.index">
              <template #title>
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
                @click="handleMenuClick(child)"
              >
                <el-icon><component :is="child.icon" /></el-icon>
                <span>{{ child.title }}</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :index="item.index"
              @click="handleMenuClick(item)"
            >
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main class="main-content">
        <el-breadcrumb class="breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ currentBreadcrumb }}</el-breadcrumb-item>
        </el-breadcrumb>
        
        <div class="content-wrapper">
          <component :is="currentComponent" />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { House, Document, User, Setting, Bell } from '@element-plus/icons-vue'
import { getUserInfo, logout } from '@/api/user.js'
import UserInfoDialog from '@/pages/user/UserInfoDialog.vue';
// 组件动态加载
import Home from '@/pages/Home.vue';
import SystemSettings from '@/pages/sys/SystemSettings.vue';
import UserManagement from '@/pages/sys/UserManagement.vue';
import RoleManagement from '@/pages/sys/RoleManagement.vue';

const router = useRouter()

const isCollapse = ref(false)
const userInfo = ref({
  avatar: '',
  username: '',
  tenantId: '',
  lastLogin: ''
})

// 引用用户信息弹窗组件
const userInfoDialog = ref(null);

// 点击个人信息按钮时打开弹窗
const handleProfileClick = () => {
  userInfoDialog.value.openDialog();
};

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleLogout = async () => {
  try {
    await logout()
    clearAuth()
    ElMessage.success('退出成功')
    await router.push('/login')
  } catch (error) {
    ElMessage.error('退出失败，请重试')
  }
}

const clearAuth = () => {
  localStorage.removeItem('token')
  userInfo.value = {}
}

onMounted(async () => {
  try {
    const response = await getUserInfo()
    userInfo.value = response.data['user']
  } catch (error) {
    console.error('获取用户信息失败', error)
  }
})

// 修改: 将图标名称改为对应的图标组件对象，并移除 Permission 图标
const menuConfig = ref([
  { index: '1', title: '首页', icon: House, component: Home },
  { index: '2', title: '学校管理', icon: Document, component: SystemSettings },
  { index: '3', title: '学校宿舍管理', icon: Document, component: SystemSettings },
  { index: '4', title: '学生信息管理', icon: Document, component: SystemSettings },
  {
    index: '9',
    title: '系统设置',
    icon: Setting,
    children: [
      { index: '2-1', title: '用户管理', icon: User, component: UserManagement },
      { index: '2-2', title: '角色管理', icon: User, component: RoleManagement },
    ]
  },
])

// 新增：当前显示的组件
const currentComponent = ref(Home);
// 新增：当前面包屑标题
const currentBreadcrumb = ref('首页');

// 更新：菜单项点击事件，更新当前组件和面包屑标题
const handleMenuClick = (item) => {
  currentComponent.value = item.component;
  // 更新面包屑标题逻辑
  if (item.children) {
    currentBreadcrumb.value = item.title;
  } else {
    currentBreadcrumb.value = item.title;
  }
}
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