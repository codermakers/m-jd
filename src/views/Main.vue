<template>
  <div id="main">
    <keep-alive>
      <!-- 动态切换组件 -->
      <component :is="currentComponent" />
    </keep-alive>
    <!-- 底部tab栏 -->
    <tool-bar @onChangeFragment="onChangeFragment" />
  </div>
</template>

<script>
import ToolBar from "@c/ToolBar.vue";
export default {
  name: "Main",
  components: {
    "tool-bar": ToolBar,
    // 异步组件引入，只有在需要展示该组件的时候才去进行渲染
    home: () => import("@v/Home.vue"),
    cart: () => import("@v/Cart.vue"),
    me: () => import("@v/Me.vue")
  },
  data() {
    return {
      // 当前动态组件名称
      currentComponent: "home"
    };
  },
  methods: {
    /**
     * 动态切换页面
     * 接收从子组件发送的事件，参数为从子组件传递过来的数据
     */
    onChangeFragment(name) {
      this.currentComponent = name;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
#main {
  display: flex;
  flex-direction: column;
  // 设为absolute,让界面始处于当前屏幕
  // 否则执行页面动画过渡效果时屏幕会空白,页面不在当前屏幕
  // position: absolute;
  width: 100%;
  height: 100%;
  background-color: $bgColor;
}
</style>
