<template>

</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      userInfo: {
        avatar: '',
        username: '',
        tenantId: '',
        lastLogin: ''
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        this.userInfo = res.data
      })
    }
  }
}
</script>