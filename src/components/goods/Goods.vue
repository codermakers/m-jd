<template>
  <!-- 
     如何在一个组件中去展示不同的样式
     1、HTML 表示布局的结构,具体的展示样式,将由css决定
     2、每种展示样式对应不同的css，也就是不同的类名(css)
        1、垂直列表 ->goods-list
        2、网格布局 -> goods-grid
        3、瀑布流布局 ->goods-waterfall
     3、实现不同的展示形式,本质上就是实现不同的css样式


   瀑布流:
     概念:多个宽度相同,但高度不同的Item,按照从上到下，从左到右的顺序进行依次排序。
    分析：
       1、创建商品列表的基本的html和css,让Item 相对于 goods(div)定位
       2、生成不同高度的图片，撑起不同高度的item
       3、计算Item的位置，来达到从上到下，从左到右依次排列的目的。
  -->
  <div class="goods goods-waterfall" :style="{ height: goodsViewHeight }">
    <div
      class="goods-item goods-waterfall-item"
      v-for="(item, index) in dataSource"
      :key="index"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
    >
      <!-- 图片 -->
      <img
        class="goods-item-img"
        :src="item.img"
        :style="imgStyles[index]"
        alt="图片"
      />
      <!-- 具体描述-->
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name text-line-2"
          :class="{ 'goods-item-desc-name-hint': !item.isHave }"
        >
          <!-- 是否为直营,这里将此抽离成一个组件,之后很多地方会用到 -->
          <direct v-if="item.isDirect"></direct>
          <!-- 是否有库存,这里将此抽离成一个组件,之后很多地方会用到 -->
          <no-have v-if="!item.isHave"></no-have>
          {{ item.name }}
        </p>
        <div class="goods-item-desc-data">
          <!-- 价钱 -->
          <p class="goods-item-desc-data-price">
            ￥{{ item.price | formatPrice }}
          </p>
          <!-- 销量 -->
          <p class="goods-item-desc-data-volume">销量:{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from "./Direct.vue";
import NoHave from "./NoHave.vue";
import { goodsData } from "@/api/home.js";
export default {
  name: "Goods",
  components: {
    Direct,
    NoHave
  },
  data() {
    return {
      dataSource: [],
      //生成图片最大高度
      MAX_IMG_HEIGHT: 186,
      // 生成图片最小高度
      MIN_IMG_HEIGHT: 120,
      // 图片高度样式集合,用来存放根据数据源生成随机的图片高度集合
      imgStyles: [],
      // ITEM垂直下margin值
      ITEM_MARGIN_SIZE: 8,
      // Item的样式集合
      goodsItemStyles: [],
      // 组件的高度由leftHeightTotal和rightHeightTotal的较大值决定
      goodsViewHeight: 0
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.dataSource = goodsData;
      this.initImgStyle();
      // 注意:调用时机，created里DOM尚未加载，使用$nextTick可以在下次DOM更新时执行
      this.$nextTick(() => {
        this.initWaterfall();
        console.log(this.goodsItemStyles);
      });
    },
    //生成随机图片高度
    randomImgHeight() {
      return (
        Math.floor(
          Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
            this.MIN_IMG_HEIGHT
        ) + "px"
      );
    },
    // 根据随机图片高度,生成对应的图片样式数据
    initImgStyle() {
      this.dataSource.forEach(() => {
        let imgHeight = this.randomImgHeight();
        this.imgStyles.push({
          height: imgHeight
        });
      });
    },
    /**
     * 瀑布流(定位Position实现)
     * 1、获取所有的Item元素
     * 2、遍历Item元素,得到每一个item的高度，加上垂直方向的margin的高度
     * 3、创建2个变量:leftHeightTotal,rightHeightTotal分别表示左右两侧div距离顶部的距离,对比2个值来确定item的摆放位置
     *    if(leftHeightTotal <=rightHeightTotal),item应该被放置在左侧,此时Item距离左侧为0, 距离顶部是leftHeightTotal,否则,item被放置在右侧，
     * 4、保存计算出的item的所有样式,配置到Item上去。
     * 5、Item配置完成之后,对比左右两侧最大的高度,最大的高度为goods组件的高度
     *
     *
     */
    initWaterfall() {
      //  1、获取所有的Item元素
      let $goodsItems = this.$refs.goodsItem;
      if (!$goodsItems) return;

      let leftHeightTotal = 0,
        rightHeightTotal = 0;
      [...$goodsItems].forEach($el => {
        // 2、遍历Item元素,得到每一个item的高度，加上垂直方向的margin的高度
        let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
        let goodsItem = {};
        // 3、对比2侧距离顶部的距离，决定ITEM的摆放位置
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItem = {
            left: "0px",
            top: leftHeightTotal + "px"
          };
          // 更新左边ITEM距离顶部的距离,注意不要手贱+"px"，这里更新的Number值
          leftHeightTotal = leftHeightTotal + elHeight;
        } else {
          goodsItem = {
            right: "0px",
            top: rightHeightTotal + "px"
          };
          // 更新右边Item距离顶部的距离,注意不要手贱+"px"，这里更新的Number值
          rightHeightTotal = rightHeightTotal + elHeight;
        }
        //4、 保存ITEM的样式集合
        this.goodsItemStyles.push(goodsItem);
      });

      // 5、组件的高度由leftHeightTotal和rightHeightTotal的较大值决定
      this.goodsViewHeight =
        (leftHeightTotal > rightHeightTotal
          ? leftHeightTotal
          : rightHeightTotal) + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods {
  background-color: $bgColor;
  &-item {
    width: 50%;
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        font-size: $infoSize;
        line-height: px2rem(18);
        &-hint {
          // 注意：缺货状态下,商品描述文字会变灰
          color: $hintColor;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}

.goods-waterfall {
  position: relative;
  left: 0;
  top: 0;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
