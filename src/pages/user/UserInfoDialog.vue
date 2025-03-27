<template>
  <el-dialog v-model="visible" title="用户信息" width="30%">
    <div class="user-info">
      <p><strong>用户名：</strong>{{ userInfo.username }}</p>
      <p><strong>租户：</strong>{{ userInfo.tenantId }}</p>
      <p><strong>上次登录时间：</strong>{{ userInfo.lastLogin }}</p>
    </div>
    <template #footer>
      <el-button @click="closeDialog">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';

// 控制弹窗显示/隐藏
const visible = ref(false);

// 用户信息数据（通过 props 接收）
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => ({
      avatar: '',
      username: '',
      tenantId: '',
      lastLogin: ''
    })
  }
});

// 监听 userInfo 的变化，确保数据更新后同步到弹窗中
watch(
    () => props.userInfo,
    (newVal) => {
      // 可以在这里处理数据变化逻辑
    },
    { deep: true }
);

// 打开弹窗
const openDialog = () => {
  visible.value = true;
};

// 关闭弹窗
const closeDialog = () => {
  visible.value = false;
};

// 暴露方法给父组件调用
defineExpose({
  openDialog
});
</script>

<style scoped>
.user-info p {
  margin: 8px 0;
}
</style>