<template>
  <div class="headerBox">
    <ogt-user></ogt-user>
  </div>
</template>

<script>
import User from "@/components/user/User";
export default {
  name: "Header",
  components: {
    ogtUser: User
    }
}
</script>

<style scoped>
.headerBox {
  position: absolute;
  left: 0;
  top: 0;

  width: 100vw;
  height: var(--header-height);

  background-color: black;

  color: white;
}
</style>