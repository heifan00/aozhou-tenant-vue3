<template>

</template>

<script>

export default {
  name: 'RoleManagement',
  data() {
    return {
      roleList: [],
      roleForm: {
        roleName: '',
        roleKey: '',
        roleSort: 0,
        status: '0',
        menuIds: [],
        deptIds: [],
        remark: ''
      },
      roleId: undefined,
      menuExpand: true,
      menu
    }
  }
}
</script>