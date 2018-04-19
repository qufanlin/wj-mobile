<template>
  <div class="manager">
    <div class="m_cont1">
      <mt-button @click.native="open('picker')" size="large">{{value}}</mt-button>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="value"
        @confirm="handleChange">
      </mt-datetime-picker>
      <ul class="m_ul">
        <li>
          <span></span>
          <div>
            <p>1111</p>
            <p>订单数</p>
          </div>
        </li>
        <li>
          <span></span>
          <div>
            <p>7888</p>
            <p>销售总额</p>
          </div>
        </li>
        <li>
          <span></span>
          <div>
            <p>7888</p>
            <p>采购总额</p>
          </div>
        </li>
        <li>
          <span></span>
          <div>
            <p>7888</p>
            <p>库存总额</p>
          </div>
        </li>
        <li>
          <span></span>
          <div>
            <p>7888</p>
            <p>完成率</p>
          </div>
        </li>
        <li>
          <span></span>
          <div>
            <p>7888</p>
            <p>会员数</p>
          </div>
        </li>
      </ul>
    </div>
    <ul class="m_cont2">
      <li v-for="item in links">
        <router-link v-bind:to="item.route">
          <i :class="item.iconCls"></i>
          <p>{{item.text}}</p>
        </router-link>
      </li>
    </ul>
    <div class="market">
      <p>营销工具</p>
      <router-link to="/">微会员卡</router-link>
      <router-link to="/">微商城</router-link>
      <router-link to="/">红包卡券</router-link>
    </div>
    <!--底部固定栏-->
    <tabbar></tabbar>
  </div>
</template>
<style lang="scss" scoped>
  @import "../style/main";
</style>
<script>
  import Vue from 'vue'
  import tabbar from "../components/tabbar"
  window.eventBus = new Vue();
  export default {
    data() {
      return {
        value: '2018-03-12',
        visible: false,
        links: [
          {
            iconCls:'iconfont icon-1mulu',
            text: '订单管理',
            route: '/order'
          },
          {
            iconCls:'iconfont icon-zhanghuguanli',
            text: '商品管理',
            route: '/goods/manager'
          },
          {
            iconCls:'iconfont icon-people',
            text: '会员管理',
            route: '/member'
          },
          {
            iconCls:'iconfont icon-cubes',
            text: '库存管理',
            route: '/stock'
          },

          {
            iconCls:'iconfont icon-people1',
            text: '员工管理',
            route: '/staff'
          },
          {
            iconCls:'iconfont icon-daily-report',
            text: '经营报表',
            route: '/report'
          },
          {
            iconCls:'iconfont icon-chartline',
            text: '门店业绩',
            route: '/achievement'
          },
          {
            iconCls:'iconfont icon-switch',
            text: '退出登录',
            route: '/'
          },
        ],
      };
    },
    components: {
      tabbar,
    },
    methods: {
      open(picker) {
        this.$refs[picker].open();
      },
      handleChange(value) {
        // Toast({
        //   message: '已选择 ' + value.toString(),
        //   position: 'bottom'
        // });
      },
    }
  };
</script>

