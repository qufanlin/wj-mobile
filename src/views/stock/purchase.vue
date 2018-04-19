<template>
  <div class="stock">
    <!--固定头部-->
    <div class="m_header">
      <router-link to="/stock">
        <i class="iconfont icon-back"></i>
      </router-link>
      <div class="m_inp">
        <i class="mintui mintui-search"></i>
        <input ref="keyword" type="text" v-model="keyword"  @keyup="searchGoods" placeholder="款号、品名、条码">
        <i class="iconfont icon-saoma" @click="scanCode"></i>
      </div>
    </div>
    <div class="s_add">
      <i class="iconfont icon-home"></i>
      <input type="text" placeholder="入库门店" @click="store = true">
      <mt-button type="primary">添加商品</mt-button>
    </div>
    <div class="p_cont">
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <th>款式</th>
          <th>规格</th>
          <th class="num">入库数量</th>
        </tr>
        <tr>
          <td>yu122</td>
          <td>红色/L</td>
          <td>
            <div class="min" name="" v-on:click="min">-</div>
            <input class="text-box" name="pricenum"  type="tel" v-model="counter" placeholder="请输入价格"  maxlength="12 " />
            <div class="add" name="" v-on:click="add">+</div>
          </td>
        </tr>
      </table>
      <div class="totle">
        <p><span>合计5款</span><span>共36件</span><span>总额3000.00元</span></p>
        <div>
          <mt-button plain @click="storage">入库记录</mt-button>
          <mt-button plain class="clear">清空</mt-button>
          <mt-button type="primary">确定入库</mt-button>
        </div>
      </div>
    </div>
    <!--筛选出商品列表展示-->
    <div class="screenGood" v-show="goodList">
        <ul class="m_list">
          <li>
            <a @click="color = true">
              <img src="" alt="">
              <div class="listcont">
                <p><span>款式：</span></p>
                <p><span>颜色：</span></p>
              </div>
            </a>
          </li>
        </ul>
    </div>
    <!--底部popup-筛选店铺-->
    <mt-popup v-model="store" position="bottom">
      <div class="p_btn">
        <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
      </div>
      <mt-radio
        class="page-part"
        title=""
        v-model="shop"
        :options="shopList">
      </mt-radio>
    </mt-popup>
    <!--多颜色弹窗-->
    <mt-popup v-model="color" position="bottom">
      <div class="p_btn">
        <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
      </div>
      <div class="c_cont">
          <div class="c_cont1">
            <img src="" alt="">
            <div>
              <p>连衣裙</p>
              <p>ii90</p>
            </div>
            <p class="price">456.00</p>
          </div>
        <mt-checklist
          class="page-part"
          align="right"
          v-model="value1"
          :options="options1">
        </mt-checklist>
      </div>
    </mt-popup>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/stock/stock";
  @import "../../style/public";
  @import "../../style/list";
</style>
<script>
  export default {
    data(){
      return{
        keyword:  '',
        store: false,
        counter:0,
        shop: "",
        shopList:[],
        goodList:false,
        color:false,
        value1: [],
      }
    },
    methods:{
      searchGoods(){
        this.goodList=!this.goodList;
        // this.currentPage=1;
        // this.goodsList = [];
        // this.loadMore();
      },
      scanCode(){
        // JsBridge.scanCode("keyword");
        // var self = this;
        // eventBus.$on('scanCodeResult',function(result,obj){
        //   self.keyword = result;
        //   self.searchGoods();
        // });
      },
      add: function() {
        this.counter = parseInt(this.counter) + 1;
      },
      min: function(){
        if(this.counter > 0){
          this.counter = parseInt(this.counter) - 1;
        }
      },
      closePopup:function(){
        eventBus.$emit("closePopup");
      },
      updateForm:function(){
        this.$global.form.brand = this.shop;
        eventBus.$emit("updateForm");
      },
      storage:function () {
        this.$router.push({path:'/stock/storage'});
      }
    },
    created(){
      this.options1 = ['选项A', '选项B', '选项C'];
    }
  }
</script>
