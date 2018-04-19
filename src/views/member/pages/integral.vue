<template>
  <div class="stored">
    <!--头部-->
    <mt-header title="积分记录">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="s_cont">
      <div class="s_head">
        <p>共{{memberPointsCount}}条记录</p>
        <p><span>总积分 0</span></p>
      </div>
      <ul class="s_list"
          v-infinite-scroll="getMemberPointsLogs"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="obj in pointsLogs">
          <p class="p1" v-if="obj.createTime!=null&&obj.createTime!=''">{{obj.createTime|formatDate }}</p>
          <div class="list_cont" v-bind:class="{'height':obj.isShow}">
            <i class="iconfont icon-jiantou" v-show="obj.isShow1" v-on:click="toggle1(obj)"></i>
            <i class="iconfont icon-jiantou_down" v-show="obj.isShow2" v-on:click="toggle2(obj)"></i>
            <p><span>类型</span><span>{{obj.logType==0?"获取":"兑换"}}</span></p>
            <p><span>积分</span><span>{{obj.points/100}}</span></p>
            <p><span>积分说明</span><span>{{obj.memo}}</span></p>
            <p><span>操作员</span><span>{{obj.branchName}}</span></p>
            <p><span>门店</span><span>{{obj.loginName}}</span></p>
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
  import { getMemberPointsLog} from '../../../api/api';
  import {formatDate} from '../../../common/js/data.js'
  export default {
    data(){
      return{
        isShow1:true,
        isShow2:false,
        loading:false,//
        isShow:false,
        memberId:'',//
        pointsLogs:[],
        totalPage:'',
        currentPage:1,
        memberPointsCount:0,//会员充值记录条数
        countOrderMember:0,//消费总额
        topUpCountMemberOrder:0,//充值总额
      }
    },
    created:function () {
      this.memberId=this.$route.query.memberId;
      //this.getMemberPointsLogs();
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
      getMemberPointsLogs () {
        let param = new URLSearchParams();
        param.append("memberId", parseInt(this.memberId));
        param.append("page.currentPage",this.currentPage);
        getMemberPointsLog(param).then((res)=>{
          console.log(res)
          if (res.code==100000 && res.data!=null) {
            this.memberPointsCount=res.data.page.totalResult;
            if (res.data.pointsLogs!=null) {
              this.pointsLogs=[...this.pointsLogs,...res.data.pointsLogs];
              if(this.pointsLogs.length>0){
                for(var i=0;i<this.pointsLogs.length;i++){
                  this.$set(this.pointsLogs[i],"isShow1",true);
                  this.$set(this.pointsLogs[i],"isShow2",false);
                  this.$set(this.pointsLogs[i],"isShow",false);
                }
              }
            }
            if(this.currentPage>=res.data.page.totalPage){
              this.loading = true;
            }else{
              this.loading =false;
            }
            this.currentPage += 1;
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
