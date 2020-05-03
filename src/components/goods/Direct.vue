<template>
  <span class="goods-item-name-isDirect">直营</span>
</template>

<script>
export default {
  name: "Direct",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-item-name-isDirect {
  padding: 0 px2rem(4);
  font-size: 12px;
  color: #fff;
  background-color: $mainColor;
  border-radius: px2rem(2);
  margin-right: px2rem(2);
}
</style>
