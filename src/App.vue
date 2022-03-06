<template>
  <div>
    <ogt-admin-header></ogt-admin-header>
    <ogt-admin-sider></ogt-admin-sider>
    <ogt-admin-content></ogt-admin-content>
  </div>
</template>

<script>
import ogtAdminHeader from "@/views/Header";
import ogtAdminSider from "@/views/Sider";
import ogtAdminContent from "@/views/Content";

export default {
  name: "App",
  components: {
    ogtAdminHeader,
    ogtAdminSider,
    ogtAdminContent
  }
}
</script>

<style>
:root {
  --full-screen-width: 100vw;
  --full-screen-height: 100vh;

  --zero: 0;
  --zero-pixel: 0px;









  --header-height: 50px;

  --sider-width: 250px;







  --top-layer: 1000;
  --after-top-layer-1: 999;
}
</style>