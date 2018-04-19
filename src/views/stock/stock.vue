<template>
  <div class="stock">
    <!--头部-->
    <mt-header title="库存管理">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="s_cont">
      <router-link to="/stock/purchase">
        采购入库
      </router-link>
      <router-link to="/stock/record">
        库存盘点
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/stock/stock";
</style>
