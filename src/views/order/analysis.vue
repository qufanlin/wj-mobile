<template>
  <div class="analysis">
    <p class="a_title">订单详情</p>
    <div class="a_cont">
      <p>单号：{{order_sn}}</p>
      <p>下单：{{create_date}}</p>
      <p>客户：{{member_name}}</p>
      <table>
        <tr>
          <th>品名/货号<p>规格</p></th>
          <th>数量</th>
          <th>单价</th>
          <th>金额</th>
        </tr>
        <tr v-for="order in tableData">
          <td>{{order.goods_name}}/23244<p>{{order.size_color}}</p></td>
          <td>{{order.quantity}}</td>
          <td>{{order.goods_price}}</td>
          <td>{{order.zongjia}}</td>
        </tr>
      </table>
      <ul>
        <li><span>商品数：{{goods_quantity}}</span><span>金额合计：{{total_price}}</span></li>
        <li><span>整单折扣：{{discount_price}}</span><span>{{discount_price}}</span></li>
        <li><span>实收：</span><span>{{paid_money}}</span></li>
        <li><span>找零：</span><span>{{charge_money}}</span></li>
        <li><span>支付方式：</span><span>{{payName}}</span></li>
        <li><span>收营员：{{login_name}}</span><span>导购员：{{sales_clerk_name}}</span></li>
      </ul>
    </div>
    <div class="a_btn">
      <mt-button type="primary"  v-on:click="back">返回</mt-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../style/order/analysis";
</style>
<script>
  import { orderitemlist} from '../../api/api';
  export default {
    data() {
      return{
        tableData: [],
        order_id:'',//订单id
        order_sn:'',//订单编号
        login_name:'',//操作员名称
        member_name:'游客',
        payName:"",//支付方式
        create_date:'',
        total_price:0,//总价
        discount_price:0,//折扣价
        goods_quantity:0,//数量
        paid_money:0,// 实收金额
        payin_money:0,//应付金额
        charge_money:0,//找零
        pay_type:'',//订单状态
        sales_clerk_name:'',//营业员
        order_state:'',
        multiOrder:false,
        multiitemorder:false,
        back_reason:'',//退款原因
        refund_quantity:0,//退货件数
        max:0,
      }
    },
    created:function() {
      this.order_id = this.$route.query.order_id;
      this.order_sn = this.$route.query.order_sn;
      this.member_name = this.$route.query.member_name;
      this.create_date = this.$route.query.create_date;
      this.total_price = this.$route.query.total_price;
      this.goods_quantity = this.$route.query.goods_quantity;
      this.paid_money = this.$route.query.paid_money;
      this.payin_money = this.$route.query.payin_money;
      this.charge_money = this.$route.query.charge_money;
      this.order_state = this.$route.query.order_state;
      this.pay_type = this.$route.query.pay_type;
      this.sales_clerk_name=this.$route.query.sales_clerk_name;
      if(this.pay_type==1){
        this.payName="会员刷卡";
      }else if(this.pay_type==2){
        this.payName="现金";
      }else if(this.pay_type==3){
        this.payName="刷卡";
      }else if(this.pay_type==4){
        this.payName="支付宝";
      }else{
        this.payName="微信";
      }
      this.login_name=this.$route.query.login_name;
      this.paid_money= this.number(this.paid_money/100);
      this.charge_money= this.number(this.charge_money/100);
      this.payin_money= this.number(this.payin_money/100);
      this.total_price= this.number(this.total_price/100);
      this.discount_price=this.number(this.total_price-this.payin_money);
    },
    methods:{
      findorderitem(){
        var para={order_id:this.order_id};
        orderitemlist(para).then(res => {
          this.tableData=res.data.orderlist;
          for (var i=0;i<this.tableData.length;i++){
              this.tableData[i].goods_price=this.tableData[i].goods_price/100;
              var a={goods_price:this.tableData[i].goods_price,
              zongjia:this.tableData[i].quantity*this.tableData[i].goods_price,
              quantity:this.tableData[i].quantity,
              goods_name:this.tableData[i].goods_name,
              size_color:this.tableData[i].size_color,
              order_item_id:this.tableData[i].order_item_id,
              order_item_state:this.tableData[i].order_item_state
            }
            this.tableData[i]=a;
          }
        });
      },
      number(value) {
        var toFixedNum = Number(value).toFixed(3);
        var realVal = toFixedNum.substring(0, toFixedNum.toString().length - 1);
        return realVal;
      },
      back(){
        this.$router.push({path:'/order'});
      },
      searchGoods(){
        alert(111);
      },
    },
    mounted(){
     this.findorderitem();
    }
  };
</script>
