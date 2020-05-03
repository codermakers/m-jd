<template>
  <!-- 1、需要一个swiper
       2、swiper-slide是内部的滑动模块，可用v-for进行循环展示
       3、分页器设置:插槽(slot)配置分页器
   -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in swiperData" :key="index">
      <img
        class="swiper-slide-img"
        :src="item.imgUrl"
        alt=""
        :height="height"
      />
    </swiper-slide>
    <!-- 分页器 -->
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "MySwiper",
  props: {
    //数据源
    swiperData: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    //silde高度
    height: {
      type: String,
      default: "auto"
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      //配置Swiper
      swiperOptions: {
        //自动滚动
        autoplay: true,
        //swiper高度随着slide高度变化而变化
        autoHeight: true,
        //分页器配置
        pagination: {
          //分页器对应的html元素
          el: ".swiper-pagination",
          //分页器类型:圆点
          type: "bullets",
          //分页器自定义类名
          bulletClass: "custom-bullet-class"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.swiper-slide-img {
  width: 100%;
}
.swiper-pagination {
  bottom: px2rem(12);
  // 解决样式穿透问题,否则自定义custom-bullet-class失效
  /deep/ .custom-bullet-class {
    display: inline-block;
    width: px2rem(6);
    height: px2rem(6);
    margin: 0 px2rem(4);
    border-radius: 50%;
    border: px2rem(1) solid #fff;
    opacity: 1;
  }
  /deep/ .swiper-pagination-bullet-active {
    background-color: #fff;
  }
}
</style>
