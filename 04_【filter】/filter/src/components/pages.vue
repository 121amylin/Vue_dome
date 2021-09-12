<template>
  <div class="pages">
    <a href="#"><span class="gg-push-chevron-left"></span></a>
    <a href="#"><span class="prev_arr"></span></a>
    <a href="#"><span class="num">1</span></a>
    <a href="#"><span class="next_arr"></span></a>
    <a href="#"><span class="gg-push-chevron-right"></span></a>
  </div>
</template>
<style lang="scss">
@import '../scss/base';

.pages {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    justify-content: center;
  }
  a {
    display: flex;
    width: 42px;
    height: 42px;
    background-color: #fff;
    text-align: center;
    line-height: 42px;
    &.active {
      background-color: $main-color;
      color: #fff;
    }
    + a {
      margin-left: 4px;
    }
    span {
      margin: auto;
    }
  }
}
</style>
