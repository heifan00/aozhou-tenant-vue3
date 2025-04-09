<template>
  <div>
    <h1>学校管理</h1>
    <el-table :data="schools" style="width: 100%" :cell-style="cellStyle" :header-cell-style="headerCellStyle" border>
      <el-table-column prop="tenantId" label="租户ID" width="100"></el-table-column>
      <el-table-column prop="schoolName" label="学校名称" width="150"></el-table-column>
      <el-table-column prop="adminName" label="管理员" width="100"></el-table-column>
      <el-table-column prop="adminPhone" label="联系方式" width="150"></el-table-column>
      <el-table-column prop="adminEmail" label="邮箱" width="200"></el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用中' : '已停用' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 新增操作列 -->
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.status === 0" @click="toggleStatus(scope.row, 1)">启用</el-button>
          <el-button v-else @click="toggleStatus(scope.row, 0)" type="danger">停用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSchoolList, updateSchoolStatus } from '@/api/school'

export default {
  data() {
    return {
      schools: []
    }
  },
  created() {
    this.fetchSchoolList()
  },
  methods: {
    async fetchSchoolList() {
      try {
        const response = await getSchoolList({})
        this.schools = response.data
      } catch (error) {
        console.error('Error fetching school list:', error)
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center' }
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return { textAlign: 'center', fontWeight: 'bold', backgroundColor: '#f5f5f5' }
    },
    // 切换学校状态
    async toggleStatus(row, newStatus) {
      try {
        await updateSchoolStatus(row.tenantId, { status: newStatus })
        row.status = newStatus
      } catch (error) {
        console.error('Error updating school status:', error)
      }
    }
  }
}
</script>

<style scoped>
/* ... existing code ... */
</style>