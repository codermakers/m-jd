<template>
  <div class="me">
    <navigation-bar :isShowBack="false" pageName="个人中心"></navigation-bar>
    <h1>Me</h1>
  </div>
</template>

<script>
import NavigationBar from "@c/NavigationBar.vue";
export default {
  name: "Me",
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss" scoped>
.me {
  width: 100%;
  height: 100%;
}
</style>
