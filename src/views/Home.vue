<template>
  <div class="home" @scroll="onScrollChange">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="" />
      </template>
      <template v-slot:nav-center>
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :icon="navBarCurrentSlotStyle.search.icon"
          :hint="navBarCurrentSlotStyle.search.hintColor"
        ></search>
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="" />
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- Swiper -->
      <my-swiper :swiperData="swiperData" :height="slideHeight">
        <slot name="pagination"></slot>
      </my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img
            v-for="(item, index) in activityDatas"
            :src="item.icon"
            :key="index"
            alt=""
          />
        </div>
      </activity>
      <!-- 功能模块：图标导航 -->
      <mode-option></mode-option>
      <!-- 秒杀模块 -->
      <Second-kill :dataSource="secondsData"></Second-kill>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@imgs/pinGouJie.gif" alt="" />
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods layoutType="3" :isScroll="false"></goods>
    </div>
  </div>
</template>

<script>
import { swiperData, activityDatas, secondsData } from "@/api/home.js";
import MySwiper from "@c/MySwiper.vue";
import Activity from "@c/Activity.vue";
import ModeOption from "@c/ModeOption.vue";
import SecondKill from "@c/SecondKill.vue";
import Goods from "@c/goods/Goods.vue";
import NavigationBar from "@c/NavigationBar.vue";
import Search from "@c/Search.vue";

export default {
  name: "Home",
  components: {
    MySwiper,
    Activity,
    ModeOption,
    SecondKill,
    Goods,
    NavigationBar,
    Search
  },
  data() {
    return {
      swiperData: [],
      slideHeight: "186px",
      activityDatas: [],
      secondsData: [],
      // navBar插槽的样式数据，包含页面未开始滑动时候插槽的样式，和页面滑动到锚点之后的插槽的样式
      navBarSlotStyle: {
        // 默认样式
        normal: {
          // 左侧插槽
          leftIcon: require("@imgs/more-white.svg"),
          // 中间插槽
          search: {
            bgColor: "#fff",
            hintColor: "#999",
            icon: require("@imgs/search.svg")
          },
          // 右侧插槽
          rightIcon: require("@imgs/message-white.svg")
        },
        //高亮样式
        highlight: {
          // 左侧插槽
          leftIcon: require("@imgs/more.svg"),
          // 中间插槽
          search: {
            bgColor: "#d7d7d7",
            hintColor: "#fff",
            icon: require("@imgs/search-white.svg")
          },
          // 右侧插槽
          rightIcon: require("@imgs/message.svg")
        }
      },
      // navBar当前使用的样式
      navBarCurrentSlotStyle: {},
      // navBar的定制样式
      navBarStyle: {
        position: "fixed",
        backgroundColor: ""
      },
      // 记录页面的滚动值
      scrollTopValue: -1,
      // 锚点值,当超过锚点值的时候，navBarCurrentSlotStyle样式发生改变
      ANCHOR_SCROLL_TOP: 160
    };
  },
  methods: {
    initData() {
      this.swiperData = swiperData;
      this.activityDatas = activityDatas;
      this.secondsData = secondsData;
    },
    /**
     * 监听页面的滚动
     * 1、获取当前页面滚动的距离
     * 2、计算NavBar背景色(navBar背景透明度)
     *    当前滚动的距离 / 锚点值 = navBar背景透明度 opacity
     *  3、opacity>=1  =>当前滚动的距离已经超过了锚点值,当前navBar插槽样式改变为 "高亮"样式
     *   否则的话，opacity < 1,当前navBar插槽的样式，为默认状态的样式
     * */
    onScrollChange($event) {
      // 获取当前页面滚动的距离
      this.scrollTopValue = $event.target.scrollTop;
      // 计算navBar的背景色 (navBar 背景透明度)
      let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;

      //指定navBar的插槽样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
      }

      // 根据透明比例，来设置navBar的背景色
      this.navBarStyle.backgroundColor = "rgba(255,255,255," + opacity + ")";
    }
  },
  created() {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
    this.initData();
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-520 {
      position: relative;
      z-index: 2;
      // 注意:这里活动组件嵌入的3张图片有圆角，而div是方形的,故处理一些圆角问题
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img {
        width: 33.33%;
        // 解决图片下边3px的bug问题
        vertical-align: top;
      }
    }
    .activity-pin-gou-jie {
      width: 100%;
      background-color: #fff;
      margin-top: $marginSize;
      img {
        width: 100%;
      }
    }
  }
}
</style>
