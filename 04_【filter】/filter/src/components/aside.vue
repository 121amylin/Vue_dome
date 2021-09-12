<template>
  <aside id="aside">
    <div class="item show991">
      <div class="search_box">
        <h3>搜尋</h3>
        <input type="text" />
      </div>
    </div>

    <div class="item">
      <h3>地點</h3>
      <select>
        <option value="請選擇地點" disabled>請選擇地點</option>
        <option value="11">11</option>
      </select>
    </div>

    <div class="item">
      <h3>時間</h3>
      <div class="time_item">
        <label for="from"
          >從
          <input type="date" id="from" />
        </label>
      </div>

      <div class="time_item">
        <label for="to"
          >至
          <input type="date" id="to" />
        </label>
      </div>
    </div>
<!--
    <div class="item">
      <h3>地點</h3>
      <div class="place_item">
        <label for="from"
          ><input
            class="checkbox"
            type="checkbox"
            name="all"
            id="all"
          />全部</label
        >
      </div>
    </div> -->
  </aside>
</template>
<style lang="scss">
@import '../scss/base';
#aside {
  width: 30%;
  min-width: 288px;
  margin-top: 24px;
  background-color: $g_color_4;
  @media (max-width: 991px) {
    width: 100%;
    min-width: unset;
    margin-top: 0;
    margin-bottom: 24px;
  }
  .search_box {
    input {
      width: 100%;
    }
  }
  .item {
    padding: 25px 40px;
    background-color: $g_color_3;
    border-top: 2px solid $g_color_2;
    @media (max-width: 991px) {
      padding: 24px 30px;
    }
    @media (max-width: 768px) {
      padding: 14px 20px;
    }
    &:nth-child(1) {
      border-top: none;
      @media (max-width: 768px) {
        padding-top: 30px;
      }
    }
    &:nth-child(2) {
      border-top: none;
      @media (max-width: 991px) {
        border-top: 2px solid $g_color_2;
      }
    }
    .time_item,
    .place_item {
      @media (max-width: 991px) {
        display: inline-block;
        margin-right: 10px;
      }
    }
    h3 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 24px;
      @media (max-width: 991px) {
        margin-bottom: 12px;
      }
    }
    input {
      margin-bottom: 8px;
      padding: 6px;
      margin-left: 4px;
    }
    select {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
