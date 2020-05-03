<template>
  <span class="goods-item-name-no-have">缺货</span>
</template>

<script>
export default {
  name: "NoHave",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-item-name-no-have {
  padding: 0 px2rem(4);
  font-size: 12px;
  color: #fff;
  background-color: $hintColor;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
