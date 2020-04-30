<template>
  <div class="modeOption">
    <div
      class="modeOption-item"
      v-for="(item, index) in dataSource"
      :key="index"
    >
      <img class="modeOption-item-img" :src="item.imgUrl" alt="" />
      <p class="modeOption-item-title">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModeOption",
  data() {
    return {
      dataSource: [
        {
          id: 1,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/101343/9/13798/5312/5e5cb38cef1d04468/8c9c8051031687b1.png.webp",
          title: "清仓特时"
        },
        {
          id: 2,
          imgUrl:
            "//img20.360buyimg.com/jdphoto/s80x80_jfs/t1/95401/22/8604/9217/5e05c59de8c2e1a69/bafa8250b304172a.png.webp",
          title: "9.9包邮"
        },
        {
          id: 3,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/87290/35/13716/4809/5e5dc324eb71474d8/c36c78824b730f1e.png.webp",
          title: "1元福利"
        },
        {
          id: 4,
          imgUrl:
            "//img12.360buyimg.com/img/jfs/t1/89902/6/19826/22763/5ea12ab0ef65ffca5/2e51451fa430488f.gif",
          title: "话费充值"
        },
        {
          id: 5,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/86863/11/12768/5091/5e4ea73bec6f1d19e/8e712ee45f205c69.png.webp",
          title: "京喜省钱卡"
        },
        {
          id: 6,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/86819/28/12869/9945/5e4f6f82e5830667b/288f880c661612b7.png.webp",
          title: "0元领水果"
        },
        {
          id: 7,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/99379/17/13907/5586/5e5dc272ea9d0ad6a/3a3b4a4074acef24.png.webp",
          title: "1元领礼盒"
        },
        {
          id: 8,
          imgUrl:
            "//img12.360buyimg.com/img/jfs/t1/94147/32/9522/9443/5e0eff8becae4a9a0/e725e9709f79b38d.png.webp",
          title: "任务赚金币"
        },
        {
          id: 9,
          imgUrl:
            "//img12.360buyimg.com/img/s78x75_jfs/t1/85650/38/17918/7536/5e8ed647e0fabfb1e/e5337e49e960da3e.png.webp",
          title: "好物0元造"
        },
        {
          id: 10,
          imgUrl:
            "//img12.360buyimg.com/img/s80x80_jfs/t1/108558/15/7662/8607/5e5dc28be937e07fd/648d1078fe85702d.png.webp",
          title: "全部频道"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.modeOption {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  &-item {
    width: 20%;
    text-align: center;
    margin-bottom: 10px;
    cursor: pointer;
    &-img {
      width: 40px;
      height: 40px;
    }
    &-title {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>
