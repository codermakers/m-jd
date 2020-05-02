<template>
  <div id="app">
    <router-view />
    <tool-bar @onRouteChange="onRouteChange"></tool-bar>
  </div>
</template>

<script>
import ToolBar from "@c/ToolBar.vue";
export default {
  name: "App",
  components: {
    "tool-bar": ToolBar
  },
  methods: {
    onRouteChange(routePath) {
      this.$router.replace(routePath);
    }
  }
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
