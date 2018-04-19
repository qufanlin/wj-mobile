<template>
  <div class="stored">
    <!--头部-->
    <mt-header title="储值记录">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="s_cont">
      <div class="s_head">
        <p>共{{memberOrderToUpCount}}条记录</p>
        <p><span>累计充值</span><span>{{topUpCountMemberOrder/100}}</span></p>
        <p><span>累计消费</span><span>{{countOrderMember/100}}</span></p>
      </div>
      <ul class="s_list">
        <li v-for="obj in topUpMemberOrder">
          <p class="p1">{{obj.create_date|formatDate }}</p>
          <div class="list_cont" v-bind:class="{'height':obj.isShow}">
            <i class="iconfont icon-jiantou" v-show="obj.isShow1" v-on:click="toggle1(obj)"></i>
            <i class="iconfont icon-jiantou_down" v-show="obj.isShow2" v-on:click="toggle2(obj)"></i>
            <p><span>会员充值</span><span>{{obj.total_price/100}}</span></p>
            <p><span>实收金额</span><span>{{obj.paid_money/100}}</span></p>
            <p><span>储值金额</span><span>{{obj.total_price/100}}</span></p>
            <p><span>销售人员</span><span>{{obj.sales_clerk_name}}</span></p>
            <p><span>支付方式</span><span>{{obj.pay_type}}</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../../style/member/stored";
  @import "../../../style/public";
</style>
<script>
  import { getTopUpMemberOrder,getCountMemberOrder,getTopUpCountMemberOrder} from '../../../api/api';
  import {formatDate} from '../../../common/js/data.js'
  export default {
    data(){
      return{
        isShow1:true,
        isShow2:false,
        isShow:false,
        memberId:'',//
        topUpMemberOrder:[],
        memberOrderToUpCount:0,//会员充值记录条数
        countOrderMember:0,//消费总额
        topUpCountMemberOrder:0,//充值总额
      }
    },
    created:function () {
      this.memberId=this.$route.query.memberId;
      this.MemberBalance();
      this.getCountMemberOrder();
    },
    filters:{
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    methods:{
      toggle1:function(obj){
        obj.isShow1 = !obj.isShow1;
        obj.isShow2 = !obj.isShow2;
        obj.isShow = !obj.isShow;
      },
      toggle2:function(obj){
        obj.isShow1 = !obj.isShow1;
        obj.isShow2 = !obj.isShow2;
        obj.isShow = !obj.isShow;
      },
      MemberBalance(){
        var params={memberId:this.memberId};
        getTopUpMemberOrder(params).then((res)=>{
          this.topUpMemberOrder=res.data.topUpMemberOrder;
          this.memberOrderToUpCount=res.data.page.totalResult;
          if(this.topUpMemberOrder.length>0){
              for(var i=0;i<this.topUpMemberOrder.length;i++){
                this.$set(this.topUpMemberOrder[i],"isShow1",true);
                this.$set(this.topUpMemberOrder[i],"isShow2",false);
                this.$set(this.topUpMemberOrder[i],"isShow",false);
              }
          }
        });
      },
      getCountMemberOrder(){
        var para={memberId:this.memberId};
        getCountMemberOrder(para).then((res)=>{
          this.countOrderMember=res.data.countOrderMember.payin_money;
        });
      },
      getTopUpCountMemberOrder(){
        var para={memberId:this.memberId};
        getTopUpCountMemberOrder(para).then((res)=>{
          this.topUpCountMemberOrder=res.data.topUpCountMemberOrder.payin_money;
        });
      },
    }
  }
</script>
