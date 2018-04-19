<template>
  <div class="achieve">
    <!--头部-->
    <mt-header title="门店业绩">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="a_cont">
      <mt-tabbar  v-model="selected" fixed>
        <mt-tab-item id="tubiao"  @click="biaoge=false,tubiao=true">
          图标
        </mt-tab-item>
        <mt-tab-item id="biaogea" v-on:click="tubiao=false,biaoge=true">
          表格
        </mt-tab-item>
      </mt-tabbar>
      <div class="a_btn">
        <el-button v-on:click="getstoresStat(3)">最近一周</el-button>
        <el-button v-on:click="getstoresStat(4)">最近一月</el-button>
      </div>
      <div v-show="tubiao" id="container" style="width: 100%;height: 200px;"></div>
      <div v-show="biaoge">
        <table border="1" cellspacing="0" cellpadding="0">
          <tr>
            <th>门店名称</th>
            <th>销售业绩</th>
            <th>订单总数</th>
            <th>会员发展量</th>
            <th>商品销售总数</th>
            <th>客单价</th>
            <th>排名</th>
          </tr>
          <tr v-for="(obj ,index) in branchstatList">
            <td>{{obj.name}}</td>
            <td>{{obj.sell_amount}}</td>
            <td>{{obj.order_count}}</td>
            <td>{{obj.member_count}}</td>
            <td>{{obj.sell_count}}</td>
            <td>{{obj.sell_amount/obj.order_count|format}}</td>
            <td>{{index+1}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .achieve{
    width: 100%;
    .a_cont{
      .a_ul{
        width: 100%;
        overflow: hidden;
        li{
          width: 32%;
          display: inline-block;
          p{
            width: 100%;
          }
        }
      }
    }
  }
</style>
<script>
  // 引入基本模板
  import { storesStat } from '../../api/api';
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
        seriesData:[],//报表日期
        seriesdata:[],//报表数据
        seriesNmaes:[],//门店名称
        FromToday:7,//距离今天多少天
      }

    },
    created(){
      // JsBridge.setScreen(1);
    },
    filters:{      //数据过滤器
      format:function(value) {
        return formatDivided(value);
      }
    },
    mounted() {
      this.getstoresStat(3);
    },
    watch:{
      selected: function(value){
        if(value=='tubiao'){
          this.tubiao=true;
          this.biaoge=false;
        }else{
          this.tubiao=false;
          this.biaoge=true;
        }
      }
    },
    methods:{
      drawLineChart() {
        this.chartLine = echarts.init(document.getElementById('container'));
        this.chartLine.setOption({
          title: {
            text: '门店业绩'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.seriesNmaes
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
            data:this.seriesData
          },
          yAxis: {
            type: 'value'
          },
          series:this.seriesdata
        });
      },
      getstoresStat(type){
        var beginDate=null;
        var endDate="";
        if(type==3){
          beginDate= this.getDay(-7,"-")
        }else{
          beginDate= this.getDay(-30,"-")
        }
        var para={type:type,beginDate:beginDate,endDate:endDate};
        storesStat(para).then(res => {
          this.seriesdata=res.data.series;
          this.seriesNmaes=res.data.seriesName;
          this.seriesData=res.data.seriesData;
          this.branchstatList=res.data.branchstatList;
          this.drawLineChart();
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

