<template>
  <div class="tool-bar">
    <div
      v-for="(item, index) in toolBarData"
      :key="index"
      class="tool-bar-item"
      @click="onChangeFrament(item,index)"
    >
      <img
        class="tool-bar-item-img"
        :src="[index === selectItemIndex ? item.hIcon : item.nIcon]"
        alt="图片"
      />
      <span
        class="tool-bar-item-name"
        :class="{
          'tool-bar-item-name-h': index === selectItemIndex ? true : false
        }"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script>
/**
 * ToolBar的能力
 * 1、永远位于页面底部
 * 2、点击ToolBar,页面进行切换
 * 3、默认有默认和选中 2个状态
 *
 *
 * 能力和约束
 * 1、不具备的能力(约束)
 * 2、通过一个回调，告诉父组件的,按钮的点击事件
 * 3、当按钮被选中的时候，应该切换按钮的状态
 *
 */

export default {
  name: "ToolBar",
  data() {
    return {
      toolBarData: [
        {
          // 默认状态下的图片
          nIcon: require("@imgs/home-n.svg"),
          // 高亮状态下的图片
          hIcon: require("@imgs/home-h.svg"),
          // 名称
          name: "首页",
          // 组件名称
          componentName: "Home"
        },
        {
          nIcon: require("@imgs/cart-n.svg"),
          hIcon: require("@imgs/cart-h.svg"),
          name: "购物车",
          componentName: "Cart"
        },
        {
          nIcon: require("@imgs/me-n.svg"),
          hIcon: require("@imgs/me-h.svg"),
          name: "我的",
          componentName: "Me"
        }
      ],
      selectItemIndex: 0
    };
  },
  methods: {
    onChangeFrament(item, index) {
      this.selectItemIndex = index;
      this.$emit("onChangeFrament", item.componentName);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.tool-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 31;
  width: 100%;
  height: px2rem(46);
  background-color: #fff;
  box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
  display: flex;
  &-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(2);
      &-h {
        color: #f00;
      }
    }
  }
}
</style>
