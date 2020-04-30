<template>
  <div class="activity">
    <!-- 提供一个存放内容的空间,因为有的有3张GIF图片，有的是一张图片 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Activity"
};
</script>

<style lang="scss" scoped>
@import "@css/index.scss";
.activity {
  max-height: px2rem(160);
}
</style>
