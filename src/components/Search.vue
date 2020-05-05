<template>
  <div class="search" :style="{ 'background-color': bgColor }">
    <img class="search-img" :src="icon" alt="" />
    <span class="search-hint" :style="{ color: hint }">请输入关键字</span>
  </div>
</template>

<script>
/**
 * 注意：分析，这里的serach组件的背景色和icon图标，以及关键字的颜色后期都会随着页面的滚动而发生变化，这里我们通过父组件让它传递。
 * */

export default {
  name: "Search",
  props: {
    icon: {
      type: String,
      default: require("@imgs/search.svg")
    },
    bgColor: {
      type: String,
      default: "#ffffff"
    },
    hint: {
      type: String,
      default: "#999999"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.search {
  display: flex;
  align-items: center;
  width: 100%;
  height: px2rem(30);
  border-radius: px2rem(22);
  background-color: #fff;
  &-img {
    width: px2rem(16);
    margin: 0 $marginSize;
  }
  &-hint {
    font-size: 12px;
    color: $hintColor;
  }
}
</style>
