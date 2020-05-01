<template>
  <div class="seconds">
    <div class="seconds-wrap">
      <div class="seconds-wrap-title">京东秒杀</div>
      <!-- 倒计时模块 -->
      <count-down :endHours="12"></count-down>
    </div>
    <div class="seconds-content">
      <div
        class="seconds-content-item"
        v-for="(item, index) in dataSource"
        :key="index"
      >
        <img class="seconds-content-item-img" :src="item.icon" alt="" />
        <p class="seconds-content-item-price">
          ￥{{ item.price | formatPrice }}
        </p>
        <p class="seconds-content-item-old-price">
          ￥{{ item.oldPrice | formatPrice }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from "@c/CountDown.vue";
export default {
  name: "Seconds",
  props: {
    dataSource: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  components: {
    CountDown
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.seconds {
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  border-radius: $radiusSize;
  margin: $marginSize;
  &-wrap {
    padding: $marginSize;
    display: flex;
    &-title {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
  &-content {
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    &-item {
      font-size: $fontSize;
      text-align: center;
      padding: px2rem(12);
      &-img {
        display: block;
        width: px2rem(66);
        height: px2rem(66);
        object-fit: contain;
      }
      &-price {
        color: $mainColor;
        margin-top: $marginSize;
        font-size: $titleSize;
      }
      &-old-price {
        font-size: $infoSize;
        color: $hintColor;
        margin-top: $marginSize;
        text-decoration: line-through;
      }
    }
  }
}
</style>
