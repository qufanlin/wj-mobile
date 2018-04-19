<template>
  <div class="manager">
    <!--固定头部-->
    <div class="m_header">
      <router-link to="/">
        <i class="iconfont icon-back"></i>
      </router-link>
      <div class="m_inp">
        <i class="mintui mintui-search"></i>
        <input ref="keyword" type="text" v-model="keyword"  @keyup="searchGoods" placeholder="款号、品名、条码">
        <i class="iconfont icon-saoma" @click="scanCode"></i>
      </div>
    </div>
    <div class="m_cont">
      <mt-navbar class="page-part">
        <mt-button type="default">按分类显示</mt-button>
		<mt-button type="default" @click="hotSale">热销</mt-button>
		<mt-button type="default" @click="poorSale">滞销</mt-button>
        <div class="totle">
          <p><span>共{{goodsCount}}种商品</span></p>
        </div>
      </mt-navbar>
      <mt-tab-container>
        <ul class="m_list" v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <li v-for="goods in goodsList">
            <a @click="goDetail(goods.goodsId)">
              <img v-if="goods.listPict" :src="goods.listPict+'_100x100.jpg'">
              <img v-else   src="../../assets/nogoodspic.png" class="img">
              <div class="listcont">
                <p>{{goods.goodsName}}</p>
                <p><span>款号：{{goods.goodsSn}}</span></p>
                <p><span>规格：{{goodsStyle(goods.colors,goods.sizes)}}</span><span>价格:{{(goods.goodsPrice/100).toFixed(2)}}</span></p>
              </div>
            </a>
          </li>
        </ul>
      </mt-tab-container>
    </div>
    <!--添加按钮-->
    <mt-button @click="addGoods" id="addbtn"><i class="iconfont icon-i-add"></i></mt-button>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/goods/manager";
  @import "../../style/public";
  @import "../../style/list";
</style>
<script>
import { InfiniteScroll } from 'mint-ui';
import { getGoodsListPage  } from '../../api/api';
  export default {
    data() {
      return {
        value: '',
      　	pageSize: 15,
	      currentPage: 1,
	      goodsCateId :  '',
	      keyword:  '',
	      orderType : '',
         goodsList:[],
         goodsCount:0,
         costAmount:0.00
      };
    },
    components: {
    　　　　InfiniteScroll
    },
    methods:{
      goDetail(goodsId){
        this.$router.push({ path: '/goods/detail',query: {goodsId: goodsId}});
      },
      addGoods(){
        this.$router.push({ path: '/goods/publish'});
      },
      hotSale(){
    	  this.orderType = "salesDesc";
    	  this.searchGoods();
      },
      poorSale(){
    	  this.orderType = "salesAsc";
    	  this.searchGoods();
      },
      searchGoods(){
         this.currentPage=1;
         this.goodsList = [];
         this.loadMore();
      },
      loadMore() {
    	  this.loading = true;
    	  let para = {
                  currentPage: this.currentPage,
                  keyword: this.keyword,
                  showCount:this.pageSize,
                  goodsCateId : this.goodsCateId,
                  goodsCateName : this.goodsCateName,
                  orderType: this.orderType,
              };
          var self = this;
          getGoodsListPage(para).then((res) => {
       	       var totalPage = res.data.page.totalPage;
       	       self.goodsCount = res.data.page.totalResult;
	       	   if(totalPage == 0){
	       		   this.$message({
	       		          showClose: false,
	       		          message: '没有找到商品',
	       		          type: 'warning',
	       		          duration:1000
	       		        });
	       	   }
		      this.goodsList = [...this.goodsList, ...res.data.goodsList];
              this.currentPage += 1;
          });
      },
      goodsStyle(colors,sizes){
    	  try{
    		  var cs = JSON.parse(colors);
        	  var ss = JSON.parse(sizes);

        	  if(cs.length > 1 || ss.length > 1 ){
        		  return "多颜色尺码";
        	  }else{
        		  return cs[0].attrName+"/"+ss[0].attrName;
        	  }
    	  }catch(e){

    	  }
      },
      scanCode(){
        JsBridge.scanCode("keyword");
        var self = this;
        eventBus.$on('scanCodeResult',function(result,obj){
           self.keyword = result;
           self.searchGoods();
        });
      },
    }
  };
</script>
