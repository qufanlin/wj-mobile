<template>
  <div class="set">
    <!--头部-->
    <mt-header title="我的资料">
      <router-link to="/my" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="set_cont">
      <mt-cell title="商户LOGO">
        <label><i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-cell title="商户名称">
        <label>伊伊女装<i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-cell title="主营业务">
        <label>箱包、鞋帽等综合<i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-cell title="门店设置">
        <label>共6家<i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-cell title="我的姓名">
        <label>老王<i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-cell title="我的工号">
        <label>1000</label>
      </mt-cell>
      <mt-cell title="更改密码">
        <label><i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
    </div>
  </div>
</template>
