<template>
  <div class="page-field">
    <div class="page-title">筛选订单
      <i class="iconfont icon-close" @click="closepage"></i>
    </div>
    <div class="page-part">
      <input type="text" v-model="order_sn" placeholder="请输入订单号"/>
      <input type="text" v-model="card_no" placeholder="请输入会员卡号"/>
      <mt-field label="开始" placeholder="消费时间" type="date" v-model="beginDate"></mt-field>
      <mt-field label="结束" placeholder="消费时间" type="date" v-model="endDate"></mt-field>

      <div class="wrapper">
        <label>所属门店</label>
        <select v-model="branch_id">
          <option value ="">全部</option>
          <option  v-for="item in branchList"
                   :key="item.branchId"
                   :label="item.branchName"
                   :value="item.branchId"></option>
        </select>
      </div>
      <div class="wrapper more">
        <label>更多条件</label>
        <div>
          <select v-model="order_state">

            <option  v-for="item in orderState"  :key="item.value" :label="item.label" :value="item.value">
            </option>
          </select>
          <select  v-model="order_type">

            <option
              v-for="item in orderType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </option>
          </select><br>
          <select v-model="pay_type">

            <option
              v-for="item in payType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </option>
          </select>
          <select v-model="shop_staff_id">
            <option value ="">操作店员</option>
            <option
              v-for="item in shopStaffId"
              :key="item.shopStaffId"
              :label="item.loginName"
              :value="item.shopStaffId">
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="page-btn">
      <mt-button type="primary" v-on:click="chaxun">查询</mt-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/order/screen";
</style>
<script>
  import { DatetimePicker } from 'mint-ui';
  import { getbranchList  } from '../../api/api';
  export default {
    name: 'page-field',
    component:{
        DatetimePicker
    },
    data() {
      return {
        order_sn: '',//订单编号
        card_no:'',//会员卡号
        beginDate: '',//开始时间
        endDate: '',//结束时间
        branch_id:'',//分店id
        shop_staff_id:'',//操作员id
        pay_type:'',//支付方式
        order_state:'',//订单状态
        order_type:'',//订单类型
        branchList:[],
        payType: [
          {
            value: '',
            label: '支付方式'
          },
          {
            value: '1',
            label: '会员卡'
          }, {
            value: '2',
            label: '现金'
          }, {
            value: '3',
            label: '刷卡'
          }, {
            value: '4',
            label: '支付宝'
          }, {
            value: '5',
            label: '微信'
          }],
        orderState: [
          {
            value: '',
            label: '订单状态'
          },
          {
            value: '0',
            label: '未处理'
          }, {
            value: '1',
            label: '完成'
          }, {
            value: '2',
            label: '已处理'
          }, {
            value: '3',
            label: '作废'
          },{
            value: '4',
            label: '已退单'
          },{
            value: '6',
            label: '退单处理中'
          }
        ],
        orderType: [
          {
            value: '',
            label: '订单类型'
          },
          {
            value: '1',
            label: '会员消费订单'
          }, {
            value: '2',
            label: '散客消费订单'
          }, {
            value: '3',
            label: '会员充值'
          }, {
            value: '4',
            label: '积分兑换'
          }, {
            value: '5',
            label: '会员充次'
          }
        ],
        shopStaffId:[]
      }
    },
    methods:{
      closepage:function () {
        this.$router.push({ path:'/order',query:{}});
      },
      chaxun(){
        this.$router.push({ path:'/order',query: {
            order_sn: this.order_sn,
            card_no: this.card_no,//会员卡号
            beginDate: this.beginDate,//开始时间
            endDate: this.endDate,//结束时间
            branch_id: this.branch_id,//分店id
            shop_staff_id: this.shop_staff_id,//操作员id
            pay_type: this.pay_type,//支付方式
            order_state: this.order_state,//订单状态
            order_type: this.order_type//订单类型
          }});
      },
      /*onSubmit() {
        var problem={
          order_sn:this.order_sn,
          card_no:this.card_no,//会员卡号
          beginDate: this.beginDate,//开始时间
          endDate: this.endDate,//结束时间
          branch_id:this.branch_id,//分店id
          shop_staff_id:this.shop_staff_id,//操作员id
          pay_type:this.pay_type,//支付方式
          order_state:this.order_state,//订单状态
          order_type:this.order_type//订单类型
        };
      },*/
      getpostbranchList(){
        let para={};
        getbranchList (para).then(res => {
          this.branchList=res.data.branchList;
          this.shopStaffId=res.data.shopStaffId;
        });
      }
    },
    mounted(){
      this.getpostbranchList();
    }
  };
</script>
