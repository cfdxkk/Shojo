<template>
  <div class="addHotGroupBox">
    <h2 style="margin-left: 20px">
      添加热门群聊
    </h2>
    <el-row style="margin-left: 20px">
      <el-col :span="5" >
        <el-input placeholder="请输入群聊名字" v-model="groupName" clearable />
      </el-col>
      <el-col :span="5" :offset="1">
        <el-button type="primary" @click="searchGroups">查找</el-button>
      </el-col>
    </el-row>
<!--    <el-row>-->
<!--      <el-col>{{groupList}}</el-col>-->
<!--    </el-row>-->

      <el-table :data="groupList" style="width: 100%" stripe="true">
        <el-table-column prop="groupNo" label="群编号" width="100" />
        <el-table-column prop="groupId" label="群ID" width="300" />
        <el-table-column prop="groupName" label="群名称" width="180" />
        <el-table-column prop="groupIntroduction" label="群简介" width="300" />
        <el-table-column prop="groupCreator" label="群主UUID" width="300" />
        <el-table-column label="操作" >
          <template #default="scope">
            <el-button type="primary" :disabled="scope.row.hotGroupFlag === '1'" @click="setHotGroup(scope.$index, scope.row)">
              设为热门
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "HotGroup",
  data: () => {
    return {
      groupName: '',
      buttonDisabled: false,
      groupList: []
    }
  },
  computed: {
    setHotGroupUrl() {return "http://" + this.$store.state.serverAddress + '/admin/setHotGroup'}
  },
  methods: {
    searchGroups(){
      if(this.groupName !== ''){
        let searchGroupUrl = "http://" + this.$store.state.serverAddress + "/group/search?groupName=" + this.groupName
        this.Axios.get(searchGroupUrl).then(groups => {
          this.groupList = groups.data
        })
      }
    },
    setHotGroup(index, row) {
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

        this.Axios.post(this.setHotGroupUrl, setHotGroupPost).then(result => {
          if (result.data === true){
            this.searchGroups()
          }
        })


      }
    }
  }
}
</script>

<style scoped>
.addHotGroupBox {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>