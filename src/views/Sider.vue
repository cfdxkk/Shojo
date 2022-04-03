<template>
  <div class="siderBox"  v-if="this.$store.state.logged">
    <el-menu
        active-text-color="#08a3ff"
        background-color="black"
        class="el-menu-vertical-demo"
        default-active="1-1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>热门群聊管理</span>
        </template>
        <el-menu-item index="1-1" @click="goto('/hotGroup/add')">添加热门群聊</el-menu-item>
        <el-menu-item index="1-2" @click="goto('/hotGroup/remove')">取消热门群聊</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <span>用户管理</span>
        </template>
        <el-menu-item index="2-1" @click="goto('/ogtUser/edit')">用户账户管理</el-menu-item>
        <el-menu-item index="2-2" @click="goto('/ogtUser/info')">用户信息管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <span>群聊管理</span>
        </template>
        <el-menu-item index="3-1" @click="goto('/ogtGroup/edit')">群聊管理</el-menu-item>
        <el-menu-item index="3-2" @click="goto('/ogtGroup/event')">群事件管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="4">
        <template #title>
          <span>其他</span>
        </template>
        <el-menu-item index="4-1" @click="goto('/other/testImageUpload')">测试图片上传</el-menu-item>
        <el-menu-item index="4-2" @click="goto('/other/testImageUpload2')">测试图片上传2</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sider",
  methods: {
    goto(address) {
      this.$router.push(address)
    }
  }
}
</script>

<style scoped>
.siderBox {
  position: absolute;
  left: 0;
  top: var(--header-height);

  width: var(--sider-width);
  height: calc(100vh - var(--header-height));

  background-color: black;
}
</style>