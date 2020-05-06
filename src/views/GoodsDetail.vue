<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@imgs/back-2.svg" alt="" />
        </div>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper
        :swiperData="goodsData.swiperImgs"
        :height="SWIPER_IMGER_HEIGTH + 'px'"
        :paginationType="'2'"
      ></my-swiper>
      <!-- 内容 -->
      <div class="goods-detail-content-desc">
        <div class="goods-detail-content-desc-item">
          <p class="goods-detail-content-desc-item-price">
            ￥{{ goodsData.price }}
          </p>
          <p class="goods-detail-content-desc-item-name">
            <!-- 是否直营 -->
            <direct v-if="goodsData.isDirect"></direct>
            {{ goodsData.name }}
          </p>
        </div>
        <div class="goods-detail-content-desc-item">
          <!-- 已选商品 -->
          <p class="goods-detail-content-desc-item-select">
            已选<span class="single-row-text">{{ goodsData.name }}</span>
          </p>
          <!-- 附加服务 -->
          <div class="goods-detail-content-desc-item-support">
            <ul class="goods-detail-content-desc-item-support-list">
              <li
                class="goods-detail-content-desc-item-support-list-item"
                v-for="(item, index) in attachDatas"
                :key="index"
              >
                <img src="@imgs/support.svg" alt="" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品描述 -->
        <div class="goods-detail-content-desc-detail">
          <img
            v-for="(item, index) in goodsData.detailImgs"
            :src="item"
            :key="index"
            alt=""
          />
        </div>
        <!-- 加入购物车/立即购买 -->
        <div class="goods-detail-buy">
          <div class="goods-detail-buy-add">
            加入购物车
          </div>
          <div class="goods-detail-buy-now">
            立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from "@c/NavigationBar.vue";
import MySwiper from "@c/MySwiper.vue";
import Direct from "@c/goods/Direct.vue";
export default {
  name: "GoodsDetail",
  components: {
    NavigationBar,
    MySwiper,
    Direct
  },
  data() {
    return {
      SWIPER_IMGER_HEIGTH: 364,
      navBarStyle: {
        backgroundColor: "",
        position: "fixed"
      },
      // 商品详情数据
      goodsData: {},
      //附加服务
      attachDatas: [
        "可配送服务",
        "京东发货&售后",
        "京准达",
        "211限时达",
        "可自提",
        "可配送海外",
        "不可使用优惠券"
      ]
    };
  },
  created() {
    this.goodsData = this.$route.params.goods;
  },
  methods: {
    onBackClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-nav-left {
    width: 100%;
    display: flex;
    img {
      align-self: center;
    }
  }
  &-content {
    overflow: hidden;
    overflow-y: auto;
    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0px2rem (16) 0 rgba(0, 0, 0, 0.2);

      &-item {
        background-color: #fff;
        padding: $marginSize;
        margin-bottom: $marginSize;
        // 价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: 700;
            margin-left: px2rem(4);
          }
        }
        //
        &-support {
          margin-top: $marginSize;
          &-list {
            display: flex;
            flex-wrap: wrap;
            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }
              span {
                font-size: 12px;
                color: $hintColor;
              }
            }
          }
        }
      }
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    background-color: #fff;
    border-bottom: px2rem(1) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: #fff;
    }
    &-add {
      background-color: $mainColor;
    }
    &-now {
      background-color: #f1c40f;
    }
  }
}
</style>
