<template>
  <div class="count-down">
    <span class="count-down-end-time">{{ endHours }}点场</span>
    <span class="count-down-surPlus">{{ surplus | formatTime }}</span>
  </div>
</template>

<script>
/**
 * 能力:传递给组件一个活动开始时间
 * 1、当前时间未到开始时间的时候，展示倒计时
 * 2、当前时间到了开始时间的时候，显示活动进行中
 * 3、当前时间超过开始时间的时候，显示活动已结束
 *
 * */
export default {
  name: "CountDown",
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {
      surplus: 0, //活动状态
      diffSeconds: 0, //活动距离现在的秒数,
      interval: undefined //定时器ID
    };
  },
  watch: {
    // 监听秒数的变化
    diffSeconds(newVal) {
      // 当前时间秒数/3600,向下取整，转化为对应的小时数
      const hours = Math.floor(newVal / 3600);
      // 当前时间秒数/60，再对60取模，获取对应的分钟数
      const minutes = Math.floor(newVal / 60) % 60;
      // 当前秒数 %60,获取超过小时，分钟数的秒数
      const seconds = newVal % 60;
      // 拼接数据
      this.surplus = hours + ":" + minutes + ":" + seconds;

      // 如果差距秒数为0，需要修改展示数据
      if (newVal === 0) {
        this.computedSurplusTime();
      }
    },
    // 监听活动开始时间的变化,注意：如果不监听endHours变化,在封装此组件给开发人员使用的时候，传递不同的endHours,此时不会重新倒计时效果
    endHours() {
      this.computedSurplusTime();
    }
  },
  created() {
    this.computedSurplusTime();
  },

  methods: {
    // /**
    //  * 计算展示的内容
    //  * 1、当前时间未到开始时间的时候，展示倒计时
    //  * 2、当前时间到了开始时间的时候，显示活动进行中
    //  * 3、当前时间超过开始时间的时候，显示活动已结束
    //  * /
    computedSurplusTime() {
      // 清除之前的定时器
      if (this.interval) {
        clearInterval(this.interval);
      }

      //当前时间
      const date = new Date();

      // 当前时间超过开始时间，显示活动已结束
      if (date.getHours() - this.endHours > 0) {
        this.surplus = "活动已结束";
        return;
      }
      // 当前时间等于开始时间，显示活动正在进行中
      if (date.getHours() - this.endHours === 0) {
        this.surplus = "活动进行中";
        return;
      }

      /**
       * 当活动开始时间未到的时候: 倒计时显示处理
       * 1、获取当前时间与活动开始时间的秒数
       * 2、根据秒数转化为对应的秒数:时：分：秒
       */
      //差距的小时数，注意：-1,比如12点开始，当前9点，差距的时间是3分59分59秒
      const diffHours = this.endHours - date.getHours() - 1;
      // 差距的分钟数
      const diffMinutes = 60 - date.getMinutes() - 1;
      // 差距的秒数
      const diffSeconds = 60 - date.getSeconds();
      // 转换为对应的总秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;

      //在created调用,只会调动一次，此时倒计时时间并不会变化,需要开启定时器,每变化1秒,差距的秒数-1
      this.interval = setInterval(() => {
        this.diffSeconds--;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.count-down {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: $radiusSize;
    border-bottom-left-radius: $radiusSize;
    border: px2rem(1) solid $mainColor;
    color: #fff;
  }
  &-surPlus {
    background-color: #fff;
    border-top-right-radius: $radiusSize;
    border-bottom-right-radius: $radiusSize;
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
