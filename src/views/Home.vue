<template>
  <div class="home">
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
    </div>
  </div>
</template>

<script>
import { swiperData, activityDatas, secondsData } from "@/api/home.js";
import MySwiper from "@c/MySwiper.vue";
import Activity from "@c/Activity.vue";
import ModeOption from "@c/ModeOption.vue";
import SecondKill from "@c/SecondKill.vue";

export default {
  name: "Home",
  components: {
    MySwiper,
    Activity,
    ModeOption,
    SecondKill
  },
  data() {
    return {
      swiperData: [],
      slideHeight: "186px",
      activityDatas: [],
      secondsData: []
    };
  },
  methods: {
    initData() {
      this.swiperData = swiperData;
      this.activityDatas = activityDatas;
      this.secondsData = secondsData;
    }
  },
  created() {
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
  &-content {
    height: 100%;
    overflow-y: auto;
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
  }
}
</style>
