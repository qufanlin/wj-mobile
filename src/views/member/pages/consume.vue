<template>
  <div class="consume">
    <!--头部-->
    <mt-header title="消费记录">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="c_cont">
      <div class="totle">
        <p><span>共{{countOrder}}单</span><span>销售总额：<i>{{countOrderMember/100}}</i></span></p>
      </div>
      <div class="order" v-infinite-scroll="getMemberOrder"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="o_list" v-for="obj in orderMember">
          <p><span>订单编号：{{obj.order_sn}}</span><span>{{obj.create_date|formatDate}}</span></p>
          <ul >
            <li v-for="item in obj.memberOrderItem">
              <img v-if="item.listPict" :src="item.listPict+'_100x100.jpg'">
              <img v-else   src="../../../assets/nogoodspic.png" class="img">
              <div>
                <p>{{item.goods_name}}</p>
                <p><span>{{item.size_color}}&nbsp;{{item.quantity}}件</span><span>{{item.goods_price/100}}</span></p>
              </div>
            </li>
          </ul>
          <p><span>武林一店</span><span>共{{obj.goods_quantity}}件商品&nbsp;&nbsp;实付：{{obj.paid_money/100}}</span></p>
        </div>
    </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
  @import "../../../style/member/consume.scss";
  @import "../../../style/public";
</style>
<script>
  import {formatDate} from '../../../common/js/data.js'
  import { getCountMemberOrder,getMemberOrder  } from '../../../api/api';
export default {
  data(){
    return{
      memberId:'',
      loading:false,
      orderMember:[],
      countOrderMember:0,
      totalPage:'',
      currentPage:1,
      showCount:10,
      countOrder:0,
    }
  },
  created:function(){
    this.memberId=this.$route.query.memberId;
    this.getMemberOrder();
  },
  filters:{
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
    methods:{
    getMemberOrder(){
      var para={memberId:this.memberId,currentPage:this.currentPage};
      getMemberOrder(para).then((res)=>{
          this.countOrder=res.data.page.totalResult;
          this.orderMember=[...this.orderMember,...res.data.orderMember];
          if(this.currentPage>=res.data.page.totalPage){
            this.loading = true;
          }else{
            this.loading =false;
          }
          this.currentPage += 1;
      });
    },
    getCountMemberOrder(){
      var para={memberId:this.memberId};
      getCountMemberOrder(para).then((res)=>{
        this.countOrderMember=res.data.countOrderMember.payin_money;
      });
    },
  },
  mounted(){
    this.getCountMemberOrder();
  }
}



</script>
