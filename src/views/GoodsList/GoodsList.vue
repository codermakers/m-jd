<template>
  <div class="goods-list-page">
    <navigation-bar pageName="商品列表" @onLeftClick="onBackClick">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangelayoutTypeClick()" alt="" />
      </template>
    </navigation-bar>
    <div class="goods-list-page-content z-index-2">
      <goods-options></goods-options>
      <goods :layoutType="layoutType.type" :isScroll="true"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@c/NavigationBar.vue";
import GoodsOptions from "@c/goods/GoodsOptions.vue";
import Goods from "@c/goods/Goods.vue";
export default {
  name: "GoodsList",
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  data() {
    return {
      layoutTypeDatas: [
        // 垂直布局
        {
          type: "1",
          icon: require("@imgs/list-type.svg")
        },
        // 网格布局
        {
          type: "2",
          icon: require("@imgs/grid-type.svg")
        },
        // 瀑布流布局
        {
          type: "3",
          icon: require("@imgs/waterfall-type.svg")
        }
      ],
      // 当前goods展示形式
      layoutType: {}
    };
  },
  created() {
    this.layoutType = this.layoutTypeDatas[0];
  },
  methods: {
    // 后退按钮：后退到上一页
    onBackClick() {
      this.$router.go(-1);
    },
    /**
     * 切换 goods 展示形式
     * */

    onChangelayoutTypeClick() {
      if (this.layoutType.type === "1") {
        this.layoutType = this.layoutTypeDatas[1];
      } else if (this.layoutType.type === "2") {
        this.layoutType = this.layoutTypeDatas[2];
      } else {
        this.layoutType = this.layoutTypeDatas[0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-list-page {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content {
    //相当于flex：1
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
