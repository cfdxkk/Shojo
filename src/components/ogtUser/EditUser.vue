<template>
  <div class="editUserBox">
    <h2 style="margin-left: 20px">
      用户信息管理
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
      <el-table-column prop="userSex" label="用户性别" width="100" />
      <el-table-column prop="userEmail" label="用户邮件" width="250" />
      <el-table-column prop="userInfo" label="用户简介" width="400" />
      <el-table-column prop="userLocation" label="用户住址" width="400" />
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
      <el-table-column label="操作" width="150"  >
        <template #default="scope">
          <el-button type="default" :disabled="scope.row.userBanFlag === '1'" @click="openPopUp(scope.$index, scope.row)" >
            编辑用户信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="dialogFormVisible" title="编辑用户信息" width="500px">
      <el-form :model="userInfo">
<!--        <el-form-item label="昵称" :label-width="formLabelWidth">-->
<!--          <el-input v-model="userInfo.username" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="userInfo.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="userInfo.userSex" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="住址" :label-width="formLabelWidth">
          <el-input v-model="userInfo.userLocation" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="生日" :label-width="formLabelWidth">-->
<!--          <el-input v-model="userInfo.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="userInfo.userInfo" autocomplete="off" :rows="2"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editUserInfo">提交</el-button>
      </span>
      </template>
    </el-dialog>

  </div>





</template>

<script>
export default {
  name: "EditUser",
  data: () => {
    return {
      userId: '',
      userNo: '',
      username: '',

      groupList: [],

      dialogFormVisible: false,
      formLabelWidth: 0,
      userInfo: {
        username: '',
        userId: '',
        password: '',
        userEmail: '',
        userSex: '',
        userLocation: '',
        userInfo: '',
      }
    }
  },
  computed: {
    searchUserUrl() {return "http://" + this.$store.state.serverAddress + '/admin/getUserInfo'},
    setUserBanedUrl() {return "http://" + this.$store.state.serverAddress + '/admin/setUserBaned'},
    setUserUnBanedUrl() {return "http://" + this.$store.state.serverAddress + '/admin/setUserUnBaned'},
    removeUserUrl() {return "http://" + this.$store.state.serverAddress + '/admin/removeUser'},
    editUserInfoUrl() {return "http://" + this.$store.state.serverAddress + '/admin/editUserInfo'},
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
    openPopUp(index, row){
      this.dialogFormVisible = true
      this.userInfo.userId = row.userId
    },
    editUserInfo() {
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

        this.userInfo.adminUserId = UUID;
        this.userInfo.adminToken = token;

        this.Axios.post(this.editUserInfoUrl, this.userInfo).then(() => {
          this.searchUser()
        })
      }
    }
  }
}
</script>

<style scoped>
.editUserBox{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>