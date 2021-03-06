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
       

    如果允许goods单独滑动,就加goods-scroll类,反之不加 
  -->
  <!-- *
    商品排序功能的实现
       1、排序后的数据源，用来在html中展示(替换dataSource)
       2、定义排序规则(可以直接使用GoodOptions中数据源的Id)
       3、定义排序方法，根据排序规则来修改对应的排序
   -->
  <div
    class="goods"
    :class="[layoutClass, { 'goods-scroll': isScroll }]"
    :style="{ height: goodsViewHeight }"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item, index) in sortGoodsData"
      :key="index"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
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
  props: {
    /**
     * 在父元素中指定的展示形式
     * 1:垂直列表布局
     * 2:网格布局
     * 3：瀑布流布局
     * */
    layoutType: {
      type: String,
      default: "1"
    },
    // 是否允许Goods支持自动滑动
    isScroll: {
      type: Boolean,
      default: true
    },
    /**
     * 排序规则(GoodsOptions)
     * 1:默认排序
     * 1-2：价格由高到低
     * 1-3：销量由高到低
     * 2:有货优先
     * 3:直营优先
     * */

    sort: {
      type: String,
      default: "1"
    }
  },
  components: {
    Direct,
    NoHave
  },
  data() {
    return {
      // 数据源
      dataSource: [],
      // 排序数据
      sortGoodsData: [],

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
      goodsViewHeight: "100%",
      // 不同展示形式下的类名
      layoutClass: "",
      layoutItemClass: ""
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.dataSource = goodsData;
      // 数据排序
      this.setSortGoodsData();
      // 设置布局
      this.initLayout();
    },

    // 商品排序
    setSortGoodsData() {
      switch (this.sort) {
        // 默认
        case "1":
          // 深拷贝，不改变原数组
          this.sortGoodsData = this.dataSource.slice(0);
          break;
        case "1-2":
          this.getSortGoodsDataFromKey("price");
          break;
        case "1-3":
          this.getSortGoodsDataFromKey("volume");
          break;
        // 有货优先
        case "2":
          this.getSortGoodsDataFromKey("isHave");
          break;
        // 直营优先
        case "3":
          this.getSortGoodsDataFromKey("isDirect");
          break;
      }
    },
    getSortGoodsDataFromKey(key) {
      /**
       * sort排序完成数据的排序
       *  当接收的值为“负值”的时候,goods1在goods2之前
       *  当接收的值为"正值"的时候，goods1排在goods之后
       *  当接收的值为0的时候,排序不变
       * */
      this.sortGoodsData = this.sortGoodsData.sort((goods1, goods2) => {
        let v1 = goods1[key],
          v2 = goods2[key];
        //处理Bolean类型的数据(直营、有货)
        if (typeof v1 === "boolean") {
          if (v1) {
            return -1;
          }
          if (v2) {
            return 1;
          }
          return 0;
        }
        // 处理float类型的数据
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1;
        }
        return 1;
      });
    },
    /**
     * 设置布局，为不同的layout设定不同的展示形式
     * 1、初始化影响到布局的数据
     *    1、goodsViewHeight ->垂直布局/网格布局(100%),瀑布流(实际高度)
     *    2、goodsItemStyles
     *    3、imgStyles
     * */

    initLayout() {
      // 初始化数据
      this.goodsViewHeight = "100%";
      this.goodsItemStyles = [];
      this.imgStyles = [];
      switch (this.layoutType) {
        // 垂直布局
        case "1":
          this.layoutClass = "goods-list";
          this.layoutItemClass = "goods-list-item";
          break;
        // 网格布局
        case "2":
          this.layoutClass = "goods-grid";
          this.layoutItemClass = "goods-grid-item";
          break;
        // 瀑布流布局
        case "3":
          this.layoutClass = "goods-waterfall";
          this.layoutItemClass = "goods-waterfall-item";
          this.initImgStyle();
          // 注意:调用时机，created里DOM尚未加载，使用$nextTick可以在下次DOM更新时执行
          this.$nextTick(() => {
            this.initWaterfall();
            console.log(this.goodsItemStyles);
          });
          break;
      }
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

      // 在允许Goods单独滑动的时候
      if (!this.isScroll) {
        // 5、组件的高度由leftHeightTotal和rightHeightTotal的较大值决定
        this.goodsViewHeight =
          (leftHeightTotal > rightHeightTotal
            ? leftHeightTotal
            : rightHeightTotal) + "px";
      }
    },
    onItemClick(item) {
      if (!item.isHave) {
        alert("该商品暂无库存");
        // 注意：无库存，不让它跳转到商品详情页面
        return;
      }
      // 跳转到商品详情页面
      this.$router.push({
        name: "GoodsDetail",
        params: {
          goods: item
        }
      });
    }
  },
  watch: {
    layoutType() {
      this.initLayout();
    },
    sort() {
      this.setSortGoodsData();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
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
//垂直列表布局
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}

//3.瀑布流布局
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
