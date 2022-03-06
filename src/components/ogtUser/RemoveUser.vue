<template>
  <div class="removeUserBox">
    <h2 style="margin-left: 20px">
      用户账户管理
    </h2>


    <el-row style="margin-left: 20px">
      <el-col :span="5" >
        <el-input placeholder="请输入用户ID" v-model="userId" clearable />
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input placeholder="请输入用户NO" v-model="userNo" clearable />
      </el-col>
      <el-col :span="5" :offset="1">
        <el-input placeholder="请输入用户昵称" v-model="username" clearable />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="searchUser">查找</el-button>
      </el-col>
    </el-row>

    <el-table :data="groupList" style="width: 100%" stripe="true">
      <el-table-column prop="userId" label="用户ID" width="300" />
      <el-table-column prop="userNo" label="用户编号" width="100" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="password" label="用户密码" width="180" />
      <el-table-column prop="userWsServer" label="用户连接的Ws服务器" width="200" />
      <el-table-column label="用户是否是管理员" width="170" >
        <template #default="scope">
          <div v-if="scope.row.userAdminFlag === '1'">是</div>
          <div v-if="scope.row.userAdminFlag !== '1'">否</div>
        </template>
      </el-table-column>
      <el-table-column label="用户是否被封禁" width="170" >
        <template #default="scope">
          <div v-if="scope.row.userBanFlag === '1'">是</div>
          <div v-if="scope.row.userBanFlag !== '1'">否</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400"  >
        <template #default="scope">
          <el-button type="warning" :disabled="scope.row.userBanFlag === '1'" @click="setUserBaned(scope.$index, scope.row)" >
            封禁用戶
          </el-button>
          <el-button type="success" :disabled="scope.row.userBanFlag !== '1'" @click="setUserUnBaned(scope.$index, scope.row)">
            解除封禁
          </el-button>
          <el-button type="danger" @click="removeUser(scope.$index, scope.row)">
            移除用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
export default {
  name: "RemoveUser",
  data: () => {
    return {
      userId: '',
      userNo: '',
      username: '',

      groupList: [],
    }
  },
  computed: {
    searchUserUrl() {return "http://" + this.$store.state.serverAddress + '/admin/getUserInfo'},
    setUserBanedUrl() {return "http://" + this.$store.state.serverAddress + '/admin/setUserBaned'},
    setUserUnBanedUrl() {return "http://" + this.$store.state.serverAddress + '/admin/setUserUnBaned'},
    removeUserUrl() {return "http://" + this.$store.state.serverAddress + '/admin/removeUser'},
  },
  methods: {
    searchUser() {
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('admininfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let UUID = cookieArray[1]
        let token = cookieArray[2]

        let searchUser = {
          userId: this.userId,
          userNo: this.userNo !== '' ? parseInt(this.userNo) : null,
          username: this.username,
          adminUserId: UUID,
          token
        }

        this.Axios.post(this.searchUserUrl, searchUser).then(result => {
          this.groupList = result.data
        })

      }
    },
    setUserBaned(index, row) {
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('admininfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let UUID = cookieArray[1]
        let token = cookieArray[2]

        let editUser = {
          userId: row.userId,
          adminUserId: UUID,
          token
        }

        this.Axios.post(this.setUserBanedUrl, editUser).then(() => {
          this.searchUser()
        })

      }
    },
    setUserUnBaned(index, row) {
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('admininfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let UUID = cookieArray[1]
        let token = cookieArray[2]

        let editUser = {
          userId: row.userId,
          adminUserId: UUID,
          token
        }

        this.Axios.post(this.setUserUnBanedUrl, editUser).then(() => {
          this.searchUser()
        })

      }
    },
    removeUser(index, row) {
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== '') {
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('admininfo=') !== -1) {
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let UUID = cookieArray[1]
        let token = cookieArray[2]

        let editUser = {
          userId: row.userId,
          adminUserId: UUID,
          token
        }

        this.Axios.post(this.removeUserUrl, editUser).then(() => {
          this.searchUser()
        })

      }
    },
  }
}
</script>

<style scoped>

.removeUserBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>