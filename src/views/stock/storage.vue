<template>
  <div class="order">
    <!--搜索框-->
    <div class="mint-search">
      <!--搜索框固定-->
      <div class="fixed">
        <router-link class="m_back" to="/">
          <i class="iconfont icon-back"></i>
        </router-link>
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search"></i>
            <input type="search" v-model="order_sn" v-on:search="searchOrder()" placeholder="输入入库单号">
          </div>
        </div>
        <!--筛选按钮-->
        <mt-button class="screen" @click="screen">筛选</mt-button>
      </div>
      <div class="mint-search-list" v-show="show">
        <div class="mint-search-list-warp">
          <slot>
            <mt-tab-container>
              <ul class="m_list" v-infinite-scroll="findorderlist"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
                <li v-for="order in orders">
                  <a @click="details = true">
                    <div>
                      <p class="p1">入库单号：{{order.orderSn}}</p>
                      <p class="p2">入库时间：{{order.createDate}}</p>
                    </div>
                    <div>
                      <p class="p1">入库数量：{{order.goodsQuantity}} 入库总额：¥{{order.payinMoney}}</p>
                      <p class="p2">经办人：张三</p>
                    </div>
                  </a>
                </li>
              </ul>
            </mt-tab-container>
          </slot>
        </div>
      </div>
    </div>
    <router-view v-show="viewShow"/>
    <!--多颜色弹窗-->
    <mt-popup v-model="details" position="bottom">
      <div class="p_btn">
        <span>入库单详情</span><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
      </div>
      <div class="c_cont">
        <p><span>入库门店：门店名称</span><span>入库单号：456789</span></p>
        <p><span>经办人：张三</span><span>时间：2018-01-11 11-22</span></p>
      </div>
      <table border="1" cellspacing="0" cellpadding="0">
        <tr>
          <th>款号</th>
          <th>规格</th>
          <th>数量</th>
        </tr>
        <tr>
          <td>gjj78</td>
          <td>红色/XL</td>
          <td>7</td>
        </tr>
      </table>
    </mt-popup>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/order/order";
</style>
<script>
  import { InfiniteScroll } from 'mint-ui';
  import { orderlist  } from '../../api/api';
  export default {
    name: 'mt-search',
    components: {
      InfiniteScroll
    },
    data() {
      return {
        show: true,
        viewShow:false,
        visible: false,
        currentValue: this.keyword,
        order_sn: '',//订单编号
        card_no:'',//会员卡号
        beginDate: '',//开始时间
        endDate: '',//结束时间
        branch_id:'',//分店id
        shop_staff_id:'',//操作员id
        pay_type:'',//支付方式
        order_state:'',//订单状态
        order_type:'',//订单类型
        orders:[],
        pageSize: 10,
        currentPage: 1,
        reportOnce: 0,
        type:0,

        details:false,
      };
    },
    beforeRouteUpdate (to, from, next) {
      if(to.path=='/order'){
        this.show=true;
        this.viewShow=false;
        if(to.query!=null){
          this.order_sn= to.query.order_sn,
            this.card_no= to.query.card_no,//会员卡号
            this.beginDate= to.query.beginDate,//开始时间
            this.endDate= to.query.endDate,//结束时间
            this.branch_id= to.query.branch_id,//分店id
            this.shop_staff_id= to.query.shop_staff_id,//操作员id
            this.pay_type= to.query.pay_type,//支付方式
            this.order_state= to.query.order_state,//订单状态
            this.order_type= to.query.order_type//订单类型
          this.searchOrder();
        }
      }
      next();
    },
    methods:{
      screen() {
        // this.show = false;
        // this.viewShow=true;
        // this.$router.push({path:'/order/screen'});
      },
      // goto(obj){
      //   this.show=false;
      //   this.viewShow=true;
      //   this.$router.push({ path: '/order/analysis',query:{
      //       order_id:obj.orderId,order_sn:obj.orderSn,member_name:obj.member_name,
      //       create_date:obj.createDate,total_price:obj.totalPrice,
      //       goods_quantity:obj.goodsQuantity,paid_money:obj.paidMoney,
      //       payin_money:obj.payinMoney,charge_money:obj.chargeMoney,
      //       pay_type:obj.payType,order_state:obj.orderState,
      //       login_name:obj.loginName,
      //       sales_clerk_name:obj.salesClerkNmae,
      //     }});
      // },
      searchOrder(){
        this.show=true;
        this.viewShow=false;
        this.currentPage=1;
        this.orders = [];
        this.findorderlist();
      },
      findorderlist(){
        this.loading = true;
        let para={
          order_sn:this.order_sn,//订单编号
          card_no:this.card_no,//会员卡号
          beginDate: this.beginDate,//开始时间
          endDate: this.endDate,//结束时间
          branch_id:this.branch_id,//分店id
          shop_staff_id:this.shop_staff_id,//操作员id
          pay_type:this.pay_type,//支付方式
          order_state:this.order_state,//订单状态
          order_type:this.order_type,//订单类型
          currentPage:this.currentPage
        };
        orderlist(para).then(res => {
          var totalPage = res.data.page.totalPage;
          if(totalPage == 0){
          }
          this.orders = [...this.orders, ...res.data.orderlist];
          this.currentPage += 1;
        });
      }
    }
  };
</script>
