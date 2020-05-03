<template>
  <!-- 
  能力:
     1、默认的展示效果 ->左边后退按钮的图标，中间页面的名称,右边空白的内容
     2、可通过插槽来配置具体的展示样式 ->左中右三个插槽，父组件可通过这三个插槽来对NavigationBar内容进行定制
     3、可以接收从外部指定的一个样式(可以在父组件中指定NavigationBar的style样式)
 -->
  <div
    class="nav-bar z-index-max"
    :class="{ 'bottom-line': pageName }"
    :style="navBarStyle"
  >
    <!-- 左 -->
    <div class="left">
      <!-- 默认状态 -->
      <img v-if="isShowBack" src="@imgs/back.svg" alt="" />
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <!-- 页面标题,由父组件传递 -->
      <span class="page-title" v-if="pageName">{{ pageName }}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  props: {
    // 中间内容
    pageName: {
      type: String,
      default: ""
    },
    // 控制返回按钮是否显示
    isShowBack: {
      type: Boolean,
      default: true
    },
    // NavBar样式,默认,由父组件数据驱动样式变化
    navBarStyle: {
      type: Object,
      default: function() {
        return {
          backgroundColor: "#fff"
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  // background-color: transparent;
  .left,
  .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;
    img {
      width: 100%;
      align-self: center;
    }
  }
  .center {
    flex: 1;
    display: flex;
    align-items: center;
    .page-title {
      font-size: $titleSize;
      color: #333;
      letter-spacing: px2rem(2);
    }
  }
}
.bottom-line {
  border-bottom: 1px solid #ddd;
}
</style>
