<template>
  <div class="my">
    <div class="msg">
      <div class="fun_btn">
        <router-link to="/my/setting"><i class="iconfont icon-set"></i></router-link>
        <router-link to="/"><i class="iconfont icon-xiazai16"></i></router-link>
      </div>
      <div class="fun_cont">
        <img src="" alt="">
        <div>
          <p><span>伊伊女装连锁</span><span>沈先生</span></p>
          <p><span>商户代码：45678</span><span>工号：1000</span></p>
        </div>
        <i class="iconfont icon-jiantou"></i>
      </div>
      <ul class="fun_list">
        <li>
          <i class="iconfont icon-msnui-share"></i><span>邀请有理</span>
        </li>
        <li>
          <i class="iconfont icon-dengpao"></i><span>意见反馈</span>
        </li>
        <li>
          <i class="iconfont icon-shebeibanben"></i><span>版本信息</span>
        </li>
      </ul>
    </div>
    <!--底部固定栏-->
    <tabbar></tabbar>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/my/index";
</style>
<script>
  import tabbar from "../../components/tabbar"
  export default {
    data(){
      return{

      }
    },
    components: {
      tabbar,
    },
  }
</script>
