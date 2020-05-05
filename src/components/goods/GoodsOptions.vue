<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选器 -->
    <ul class="goods-options-list">
      <li
        class="goods-options-list-item"
        v-for="(item, index) in optionsDatas"
        :key="index"
      >
        <a
          class="goods-options-list-item-content"
          @click="onOptionItemClick(item, index)"
        >
          <span
            class="goods-options-list-item-content-name"
            :class="{
              'goods-options-list-item-content-name-active':
                selectOption.id === item.id
            }"
            >{{ item.name }}</span
          >
          <span
            class="goods-options-list-item-content-caret caret"
            v-show="item.subs.length > 0"
            :class="[
              isShowSubContent && selectOption.id === item.id
                ? 'goods-options-list-item-content-caret-open'
                : 'goods-options-list-item-content-caret-close'
            ]"
          ></span>
        </a>
      </li>
    </ul>
    <!-- 子选项 -->
    <transition name="fold-height">
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <ul class="options-sub-content-list">
          <li
            class="options-sub-content-list-item"
            v-for="(item, index) in selectOption.subs"
            :key="index"
          >
            <a
              class="options-sub-content-list-item-content"
              @click="onSubOptionItemClick(item, index)"
            >
              <span
                class="options-sub-content-list-item-content-name"
                :class="{
                  'options-sub-content-list-item-content-name-active':
                    selectOption.id === item.id
                }"
                >{{ item.name }}</span
              >
              <img
                v-show="selectOption.id === item.id"
                class="options-sub-content-list-item-content-select"
                src="@imgs/options-select.svg"
                alt
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>

    <!-- 遮罩层实现：点击遮罩，关闭子选项 -->
    <div
      class="cover"
      v-show="isShowSubContent"
      @click="isShowSubContent = false"
    ></div>
  </div>
</template>

<script>
export default {
  name: "GoodsOptions",
  data() {
    return {
      // 筛选器数据源
      optionsDatas: [
        {
          id: "1",
          name: "默认",
          subs: [
            {
              id: "1",
              name: "默认"
            },
            {
              id: "1-2",
              name: "价格从高到底"
            },
            {
              id: "1-3",
              name: "销量从高到低"
            }
          ]
        },
        {
          id: "2",
          name: "有货优先",
          subs: []
        },
        {
          id: "3",
          name: "自营优先",
          subs: []
        }
      ],
      //默认选中,初始状况下是第一项数据被选中标红
      selectOption: {},
      // 标记子选项是否处于展开状态
      isShowSubContent: false
    };
  },
  created() {
    this.selectOption = this.optionsDatas[0];
  },
  methods: {
    /**
     * 一级筛选项逻辑分析
     * 1、如果子选项处于展开状态,则关闭子选项
     * 2、筛选项(item)包含子选项(subs.length>0),并且当item处于item处于处于一个选中的状态下的时候(ite.id === selectOption.id)
     * 3、设置选中项为用户点击的item
     * */

    onOptionItemClick(item) {
      //如果子选项处于展开状态,则关闭子选项
      if (this.isShowSubContent) {
        this.isShowSubContent = false;
        // 一定注意：这里return的作用,我们只是关闭子级选项,如果点击其他item不会有任何效果
        return;
      }
      /**
       * 展示子选项视图
       * 1、(item)包含子选项(item.subs.length>0)
       * 2、item处于选中项的时候(item.id == selectOption.id)
       **/

      if (item.subs.length > 0 && this.selectOption.id === item.id) {
        this.isShowSubContent = true;
      }
      // 设置选中项为用户点击的item
      this.selectOption = item;
    },
    /**
     * 子选项分析
     * 1、设置选中项为用户点击的选项
     * 2、将选中项置顶为一级选项
     * 3、关闭子选项视图
     * */

    onSubOptionItemClick(item) {
      // 1、设置选中项为用户点击的选项
      this.selectOption = item;
      //2、将选中项置顶为一级选项
      this.optionsDatas.forEach(options => {
        options.subs.forEach(subOptions => {
          if (subOptions.id === this.selectOption.id) {
            options.id = subOptions.id;
            options.name = subOptions.name;
          }
        });
      });
      // 3、关闭子选项视图
      this.isShowSubContent = false;
    }
  },
  watch: {
    selectOption(newVal) {
      console.log(newVal);
      this.$emit("optionsChange", newVal.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.goods-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;
  // 一级选项
  &-list {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: #fff;
    &-item {
      flex: 1;
      &-content {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;
          &-active {
            color: $mainColor;
          }
        }
        &-caret {
          &-open {
            transform: rotate(-180deg);
            transition: all 0.3s;
          }
          &-close {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
        }
      }
    }
  }
  // 子选项
  .options-sub-content {
    position: absolute;
    width: 100%;
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: #fff;
    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;
          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex: 1;
            &-active {
              color: $mainColor;
            }
          }
          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
  // 当子选项展开,v-if/v-show为true时调用
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }
  // 当子选项关闭时,v-if/v-show为false时调用
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }
}
</style>
