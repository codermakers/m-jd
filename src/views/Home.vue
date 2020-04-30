<template>
  <div class="home">
    <div class="home-content">
      <!-- Swiper -->
      <my-swiper :swiperData="swiperData" :height="slideHeight">
        <slot name="pagination"></slot>
      </my-swiper>
    </div>
  </div>
</template>

<script>
import MySwiper from "@c/MySwiper.vue";
export default {
  name: "Home",
  components: {
    MySwiper
  },
  data() {
    return {
      swiperData: [
        {
          id: 1,
          imgUrl:
            "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/90271/5/18058/100904/5e903077E6d94be1c/3dd16410ac9e6398.jpg!cr_1125x445_0_171!q70.jpg.dpg"
        },
        {
          id: 2,
          imgUrl:
            "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/114072/23/3596/150927/5ea93b31Eae6be065/9b428541bc22ea51.jpg!cr_1125x445_0_171!q70.jpg.dpg"
        },
        {
          id: 3,
          imgUrl:
            "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/110333/15/14507/90136/5ea7ddd3E74987663/148e060a9cf80493.jpg!cr_1125x445_0_171!q70.jpg.dpg"
        },
        {
          id: 4,
          imgUrl:
            "//m.360buyimg.com/mobilecms/s700x280_jfs/t1/110333/15/14507/90136/5ea7ddd3E74987663/148e060a9cf80493.jpg!cr_1125x445_0_171!q70.jpg.dpg"
        }
      ],
      slideHeight: "186px"
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
.home-content {
  height: 100%;
}
</style>
