<template>
  <div class="goods-list-page">
    <navigation-bar
      pageName="商品列表"
      @onLeftClick="onBackClick"
    ></navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/NavigationBar.vue";
import GoodsOptions from "@c/goods/GoodsOptions.vue";
export default {
  name: "GoodsList",
  components: {
    NavigationBar,
    GoodsOptions
  },
  methods: {
    // 后退按钮：后退到上一页
    onBackClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-list-page {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content {
    //相当于flex：1
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
