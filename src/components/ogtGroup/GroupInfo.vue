<template>
  <div class="editGroupEventBox">
    <h2 style="margin-left: 20px">
      群聊管理
    </h2>

    <el-row style="margin-left: 20px">
      <el-col :span="7">
        <el-input placeholder="请输入群聊名称，支持模糊查询" v-model="groupName" clearable />
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="searchGroup">查找</el-button>
      </el-col>
    </el-row>

    <el-table :data="groupList" style="width: 100%" stripe="true">
      <el-table-column prop="groupNo" label="群编号" width="100" />
      <el-table-column prop="groupId" label="群ID" width="300" />
      <el-table-column prop="groupName" label="群名称" width="180" />
      <el-table-column prop="groupIntroduction" label="群简介" width="300" />
      <el-table-column prop="groupCreator" label="群主UUID" width="300" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button type="primary" @click="showEditBox(scope.$index, scope.row)">
            编辑群聊信息
          </el-button>

          <el-popconfirm title="确定要移除这个群聊吗？" @confirm="removeGroup(scope.$index, scope.row)">
            <template #reference>
              <el-button type="danger" >
                移除群聊
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog v-model="dialogFormVisible" title="编辑群聊信息" width="500px">
      <el-form :model="groupInfo">
        <el-form-item label="群聊名称" :label-width="formLabelWidth">
          <el-input v-model="groupInfo.groupName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="群聊简介" :label-width="formLabelWidth">
          <el-input v-model="groupInfo.groupIntroduction" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editGroupInfo">提交</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "GroupInfo",
  data: () => {
    return {
      groupName: '',
      groupList: [],
      formLabelWidth: 0,
      dialogFormVisible: false,
      groupInfo: {
        groupId: '',
        groupName: '',
        groupIntroduction: ''
      }
    }
  },
  computed: {
    groupSearchUrl() {return "http://" + this.$store.state.serverAddress + '/group/search?groupName='},
    editGroupInfoUrl() {return "http://" + this.$store.state.serverAddress + '/admin/editGroupInfo'},
    removeGroupUrl() {return "http://" + this.$store.state.serverAddress + '/admin/removeByGroupId'},
  },
  methods: {
    searchGroup() {
      this.Axios.get(this.groupSearchUrl + this.groupName).then(groupList => {
        this.groupList = groupList.data
      })
    },
    removeGroup(index, row) {
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

        let removeGroupInfo = {
          groupId: row.groupId,
          adminUserId: UUID,
          adminToken: token
        }

        this.Axios.post(this.removeGroupUrl, removeGroupInfo).then(() => {
          this.searchGroup()
        })
      }
    },
    showEditBox(index, row) {
      this.groupInfo.groupId = row.groupId
      this.dialogFormVisible = true
    },
    editGroupInfo() {
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

        this.groupInfo.adminUserId = UUID;
        this.groupInfo.adminToken = token;

        this.Axios.post(this.editGroupInfoUrl, this.groupInfo).then(() => {
          this.searchGroup()
        })
      }
    }
  }
}
</script>

<style scoped>
.editGroupEventBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
