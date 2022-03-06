<template>
  <div class="removeHotGroupBox">
    <h2 style="margin-left: 20px">
      移除热门群聊
    </h2>

    <el-table :data="hotGroupList" style="width: 100%" stripe="true">
      <el-table-column prop="groupNo" label="群编号" width="100" />
      <el-table-column prop="groupId" label="群ID" width="300" />
      <el-table-column prop="groupName" label="群名称" width="180" />
      <el-table-column prop="groupIntroduction" label="群简介" width="300" />
      <el-table-column prop="groupCreator" label="群主UUID" width="300" />
      <el-table-column label="操作" >
        <template #default="scope">
          <el-button type="danger" :disabled="!scope.row.hotGroupFlag === '1'" @click="removeHotGroup(scope.$index, scope.row)">
            取消热门
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "RemoveHotGroup",
  data: () => {
    return {
      hotGroupList: []
    }
  },
  computed: {
    getHotGroupListUrl(){ return "http://" + this.$store.state.serverAddress + "/group/hotGroupList"},
    removeHotGroupUrl() {return "http://" + this.$store.state.serverAddress + '/admin/removeHotGroup'},
  },
  methods: {
    getHotGroupList() {
      this.Axios.get(this.getHotGroupListUrl).then(hotGroupList => {
        this.hotGroupList = hotGroupList.data
      })
    },
    removeHotGroup(index, row) {
      console.log('text', index, row)
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

        let setHotGroupPost = {
          groupId: row.groupId,
          userId: UUID,
          token
        }

        this.Axios.post(this.removeHotGroupUrl, setHotGroupPost).then(result => {
          if (result.data === true){
            this.getHotGroupList()

          }
        })


      }
    }
  },
  mounted() {
    this.getHotGroupList()
  }
}
</script>

<style scoped>
.removeHotGroupBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>