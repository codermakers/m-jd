<template>
  <div class="cart">
    <navigation-bar :isShowBack="false" pageName="购物车"></navigation-bar>
    <h1>Cart</h1>
  </div>
</template>

<script>
import NavigationBar from "@c/NavigationBar.vue";
export default {
  name: "Cart",
  components: {
    NavigationBar
  }
};
</script>

<style lang="scss" scoped>
.cart {
  width: 100%;
  height: 100%;
}
</style>
