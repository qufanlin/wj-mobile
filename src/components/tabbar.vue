<template>
  <div class="tabbar">
    <ul>
      <li>
        <router-link to="/">
          <i class="iconfont icon-home"></i>
          <p>首页</p>
        </router-link>
      </li>
      <li>
        <router-link to="/my">
          <i class="iconfont icon-qian"></i>
          <p>收银</p>
        </router-link>
      </li>
      <li>
        <router-link to="/my">
          <i class="iconfont icon-people"></i>
          <p>我的</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .tabbar{
    width: 100%;
    position: fixed;
    bottom: 0;
    text-align: center;
    ul{
      width: 100%;
      li{
        width: 32%;
        border: 1px solid #dfdce6;
        display: inline-block;
        a{
          color: #666;
        }
        .router-link-active {
          color: red;
        }
      }
    }
  }

</style>
