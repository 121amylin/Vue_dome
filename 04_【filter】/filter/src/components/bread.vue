<template>
  <div>
    <ul class="bread">
      <li><a href="#">bread1</a></li>
      /
      <li><a href="#">bread2</a></li>
    </ul>
  </div>
</template>
<style lang="scss">
.bread {
  padding: 13px 16px;
  color: $g_color_1;
  background-color: $g_color_3;
  margin-bottom: 24px;
  list-style: none;
  .active {
    color: $main-color;
  }
  li {
    display: inline-block;
    padding: 0 8px;
    vertical-align: middle;
    &:first-child {
      a {
        color: $main-color;
      }
    }
  }
}
</style>
