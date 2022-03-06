<template>
  <div class="editGroupBox">
    <h2 style="margin-left: 20px">
      群聊事件管理
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
          <el-button type="primary" @click="showEventBox(scope.$index, scope.row)">
            查看该群聊中的事件
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-drawer size="80%" v-model="drawerOpen" :direction="rtl">
      <template #title>
        <h4>群聊{{activeGroup}}中的事件</h4>
      </template>
      <template #default>
        <div>
          <el-table :data="activeGroupEvent" style="width: 100%" stripe="true">
            <el-table-column prop="eventId" label="事件编号" width="100" />
            <el-table-column prop="eventTitle" label="事件标题" width="300" />
            <el-table-column prop="eventText" label="事件正文" width="400" />
            <el-table-column prop="startTime" label="事件起始时间" width="150" />
            <el-table-column prop="endTime" label="事件结束时间" width="150" />
            <el-table-column prop="eventColor" label="事件颜色" width="100" />
            <el-table-column label="操作" width="260">
              <template #default="scope">
                <el-button @click="showGroupEventEditBox(scope.$index, scope.row)">
                  编辑事件
                </el-button>
                <el-button type="danger" @click="removeGroupEntity(scope.$index, scope.row)">
                  删除事件
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="closeEventBox">关闭</el-button>
        </div>
      </template>
    </el-drawer>


    <el-dialog v-model="dialogFormVisible" title="编辑事件信息" width="500px">
      <el-form :model="groupEventEdit">
        <el-form-item label="事件标题" :label-width="formLabelWidth">
          <el-input v-model="groupEventEdit.eventTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件正文" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" v-model="groupEventEdit.eventText" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事件颜色" placeholder="请输入一个CSS友好的颜色" :label-width="formLabelWidth">
          <el-input v-model="groupEventEdit.eventColor" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="editGroupEvent">提交</el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "GroupEvent",
  data: () => {
    return {
      groupName: '',
      drawerOpen: false,
      groupList: [],
      activeGroup: '',
      activeGroupId: '',
      activeGroupEvent: [],

      dialogFormVisible: false,
      formLabelWidth: 0,
      groupEventEdit: {
        eventId: '',
        eventTitle: '',
        eventText: '',
        eventColor: '',
      }
    }
  },
  computed: {
    groupSearchUrl() {return "http://" + this.$store.state.serverAddress + '/group/search?groupName='},
    groupEventUrl() {return "http://" + this.$store.state.serverAddress + '/group/event'},
    groupEventEditUrl() {return "http://" + this.$store.state.serverAddress + '/admin/editGroupEvent'},
    removeGroupEventUrl() {return "http://" + this.$store.state.serverAddress + '/admin/removeByEventId'},
  },
  methods: {
    showEventBox(index, row) {
      this.drawerOpen = true
      this.activeGroup = row.groupName
      this.activeGroupId = row.groupId
      this.getGroupEvent()
    },
    closeEventBox() {
      this.drawerOpen = false
    },
    searchGroup() {
      this.Axios.get(this.groupSearchUrl + this.groupName).then(groupList => {
        this.groupList = groupList.data
      })
    },
    getGroupEvent() {
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

        let groupEventSearch = {
          groupId: this.activeGroupId,
          userId: UUID,
          token
        }

        this.Axios.post(this.groupEventUrl, groupEventSearch).then(groupEventList => {
          this.activeGroupEvent = groupEventList.data
        })
      }
    },
    showGroupEventEditBox(index, row) {
      this.groupEventEdit.eventId = row.eventId
      this.dialogFormVisible = true
    },
    editGroupEvent() {
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

        this.groupEventEdit.adminUserId = UUID
        this.groupEventEdit.adminToken = token


        this.Axios.post(this.groupEventEditUrl, this.groupEventEdit).then(() => {
          this.getGroupEvent()
        })
      }
    },
    removeGroupEntity(index, row) {
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

        let removeGroupEvent = {
          eventId: row.eventId,
          adminUserId: UUID,
          adminToken: token
        }


        this.Axios.post(this.removeGroupEventUrl, removeGroupEvent).then(() => {
          this.getGroupEvent()
        })
      }
    }
  }
}
</script>

<style scoped>
.editGroupBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>