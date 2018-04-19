<template>
  <div class="report">
    <!--头部-->
    <mt-header title="经营日报">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="r_cont" >
      <div class="r_head" v-show="biaoge">
        <mt-button v-on:click="gettoOneDayStat(2)">昨日</mt-button>
        <input type="date" v-model="chooseDate">
      </div>
      <div class="r_head" v-show="tubiao">
        <mt-button v-on:click="gettoOneDayOrder(1)">今日</mt-button>
        <mt-button v-on:click="gettoOneDayOrder(2)">昨日</mt-button>
        <input type="date" v-model="chooseDate">
      </div>
      <div class="r_list">
        <div v-show="biaoge">
        <p class="r_title">销售指标</p>
        <ul v-if="toOneDayStat!=null">
          <li>
            <p>销售额</p>
            <p>{{toOneDayStat.sell_amount}}元</p>
            <p>较上周
              <i class="iconfont icon-iconset0413">{{tolastWeekOneDayStat.lastsell_amount|format}}%</i></p>
          </li>
          <li>
            <p>订单数量</p>
            <p>{{toOneDayStat.order_count}}</p>
            <p>较上周<i class="iconfont icon-iconset0414">{{tolastWeekOneDayStat.lastorder_count|format}}%</i></p>
          </li>
          <li>
            <p>客单价</p>
            <p>{{toOneDayStat.guestUnitPrice|format}}元</p>
            <p>较上周<i>{{tolastWeekOneDayStat.lastguestUnitPrice|format}}%</i></p>
          </li>
          <li>
            <p>销售商品总量</p>
            <p>{{toOneDayStat.sell_quantity}}</p>
            <p>较上周<i>{{tolastWeekOneDayStat.lastsell_quantity|format}}%</i></p>
          </li>
        </ul>
          <span v-if="toOneDayStat.length==0">暂无数据!</span>
        </div>
        <div id="barLine" v-show="tubiao" style="width:100%; height:300px;"></div>
        <mt-tabbar  v-model="selected" fixed>
          <mt-tab-item id="tubiao"  @click="biaoge=false,tubiao=true">
            图标
          </mt-tab-item>
          <mt-tab-item id="biaoge" v-on:click="tubiao=false,biaoge=true">
            表格
          </mt-tab-item>
        </mt-tabbar>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .report{
    width: 100%;
    .r_cont{
      width: 100%;
      .r_list{
        width: 100%;
        padding: 1rem;
        .r_title{
          font-size: 1.4rem;
        }
        ul{
          width: 100%;
          overflow: hidden;
          li{
            width: 41%;
            margin: 0 2% 1rem;
            display: inline-block;
            border: 1px solid #dfdce6;
            text-align: center;
            p{
              line-height: 3rem;
            }
            i{
              color: green;
            }
          }
        }

      }
    }
  }
</style>
<script>
  // 引入基本模板
  import { toOneDayOrder,toOneDayStat } from '../../api/api';
  import {numberformatDivided,formatDivided} from '../../common/js/number.js'
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  export default {
    data(){
      return{
        value6: '',
        chartLine: null,
        branchstatList: [],
        tubiao:true,
        biaoge:false,
        selected:'tubiao',//
        type:3,//报表日期
        chooseDate:'',//
        create_date:'',//时间
        toOneDayOrder:[],//图标
        toOneDayStat:{
          sell_amount:0,//销售总额
          order_count:0,//订单总量
          guestUnitPrice:0,//客单价
          sell_quantity:0,//销售商品总量
        },//表格
        tolastWeekOneDayStat:{
          lastsell_amount:0,//同比上周销售总额
          lastorder_count:0,//同比上周订单总量
          lastguestUnitPrice:0,//同比上周客单价
          lastsell_quantity:0//同比上周销售商品总量
        },//表格
        FromToday:7,//距离今天多少天
      }

    },
    created(){
      //JsBridge.setScreen(1);
    },
    filters:{      //数据过滤器
      format:function(value) {
        return formatDivided(value);
      }
    },
    mounted() {
      this.gettoOneDayOrder(1);
    },
    watch:{
      selected: function(value){
        if(value=='tubiao'){
          this.tubiao=true;
          this.biaoge=false;
        }else{
          this.tubiao=false;
          this.biaoge=true;
          this.gettoOneDayStat(2);
        }
      },
      chooseDate:function (value) {
        if(this.selected=='tubiao'){
          this.gettoOneDayOrder(3);
        }else{
          this.gettoOneDayStat(3);
        }
      }
    },
    methods:{
      drawLineChart() {
        this.chartLine = echarts.init(document.getElementById('barLine'));
        this.chartLine.setOption({
          title: {
            text: 'Line Chart'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['今天']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1','2','3','4','5', '6','7','8','9','10', '11','12','13', '14','15','16','17','18','19','20','21', '22','23', '24']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '今天',
              type: 'line',
              stack: '总量',
              data: this.toOneDayOrder
            },
          ]
        });
      },
      gettoOneDayOrder(type){
        if(type==1){
          this.create_date= this.getDay(-0,"-");
          this.chooseDate= this.getDay(0,"-");
        }else if(type==2){
          this.create_date= this.getDay(-1,"-");
          this.chooseDate= this.getDay(-1,"-");
        }else{
          this.create_date=this.chooseDate;
        }
        var para={create_date:this.create_date};
        toOneDayOrder(para).then(res => {
          this.toOneDayOrder=res.data.toOneDayOrder;
          this.drawLineChart();
        });
      },
      gettoOneDayStat(type){
       if(type==2){
          this.create_date = this.getDay(-1,"-")
          this.chooseDate = this.getDay(-1,"-");
        }else{
          this.create_date=this.chooseDate;
        }
        var para={create_date:this.create_date};
        toOneDayStat(para).then(res => {
          var list = res.data.toOneDayStat;
          var DayStat={};
          var lastWeekOneDayStat={};
          if(list!=null&&list.length>0){
            for(var i=0;i<list.length;i++){
              if(list[i].create_date==this.create_date){
                DayStat=list[i];
              }else{
                lastWeekOneDayStat=list[i];
              }
            }
          }
          if(DayStat!=null){
            if(DayStat.sell_amount!=null){
              this.toOneDayStat.sell_amount=DayStat.sell_amount/100;
            }
            if(DayStat.order_count!=null){
              this.toOneDayStat.order_count=DayStat.order_count;
            }
            if(this.toOneDayStat.order_count!=0){
              this.toOneDayStat.guestUnitPrice=this.toOneDayStat.sell_amount/this.toOneDayStat.order_count;
            }
            if(DayStat.sell_quantity!=null&&DayStat.sell_quantity!=0){
              this.toOneDayStat.sell_quantity=DayStat.sell_quantity;
            }
          }
          if(lastWeekOneDayStat!=null){
            if(lastWeekOneDayStat.sell_amount!=null&&lastWeekOneDayStat.sell_amount!=0){
              this.tolastWeekOneDayStat.lastsell_amount=
                (this.toOneDayStat.sell_amount-lastWeekOneDayStat.sell_amount/100)/lastWeekOneDayStat.sell_amount*100;
            }
            if(lastWeekOneDayStat.order_count!=null&&lastWeekOneDayStat.order_count!=0){
              this.tolastWeekOneDayStat.lastorder_count=
                (this.toOneDayStat.order_count-lastWeekOneDayStat.order_count)/lastWeekOneDayStat.order_count;
            }
            if(lastWeekOneDayStat.sell_quantity!=null&&lastWeekOneDayStat.sell_quantity!=0){
              this.tolastWeekOneDayStat.lastsell_quantity=
                (this.toOneDayStat.sell_quantity-lastWeekOneDayStat.sell_quantity)/lastWeekOneDayStat.sell_quantity;
            }
            if(lastWeekOneDayStat.order_count!=null&&lastWeekOneDayStat.sell_amount!=null&&lastWeekOneDayStat.order_count!=0){
              var a =lastWeekOneDayStat.sell_amount/lastWeekOneDayStat.order_count;
              this.tolastWeekOneDayStat.lastguestUnitPrice=
                (this.toOneDayStat.guestUnitPrice-a)/a;
            }
          }
        });
      },
      getDay(num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24*3600*1000*num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
      },
    },
  }
</script>

