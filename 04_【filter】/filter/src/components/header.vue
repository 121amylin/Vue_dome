<template>
  <header id="header">
    <div class="container flex">
      <div class="logo">
        <h1><router-link to="/">HaveFun</router-link>
</h1>

      </div>

      <div class="search_box hide991">
        <i class="gg-search"></i>
        <input type="text" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import '../scss/base';

#header {
  background-color: $dark-color;
  color: $g_color_4;
  padding: 24px 0;
  @media (max-width: 991px) {
    padding: 16px 0;
  }
  .logo {
    width: 30%;
    min-width: 288px;
    padding: 0 40px;
    @media (max-width: 991px) {
      padding: 0 30px;
    }
    @media (max-width: 768px) {
      padding: 0 20px;
    }
    h1 a{
      font-size: 3.6rem;
      color: #fff;
    }
  }
  .search_box {
    width: 53%;
    padding-left: 40px;
    position: relative;
    i {
      display: inline-block;
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      left: 50px;
    }
    input {
      width: 100%;
      padding: 4px 12px 16px 34px;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      color: #fff;
    }
  }
}
</style>
