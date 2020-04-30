<template>
  <div id="app">
    <router-view />
    <tool-bar @onChangeFrament="onChangeFrament"></tool-bar>
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
    onChangeFrament(componentName) {
      this.$router.replace("/" + componentName.toLowerCase());
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
