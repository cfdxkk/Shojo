<template>
  <div class="contentBox" v-if="this.$store.state.logged">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style scoped>
.contentBox {
  position: absolute;
  left: var(--sider-width);
  top: var(--header-height);

  width: calc(100vw - var(--sider-width));
  height: calc(100vh - var(--header-height));

  /*background-color: pink;*/
}
</style>