<template>
  <div>
    <h1>学校管理</h1>
    <ul>
      <li v-for="school in schools" :key="school.tenantId">
        {{ school.schoolName }} - {{ school.adminName }} - {{ school.adminEmail }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getSchoolList } from '@/api/school'

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
    }
  }
}
</script>

<style scoped>
/* ... existing code ... */
</style>