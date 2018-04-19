<template>
  <div class="detail">
    <!--头部-->
    <mt-header title="商品详情">
      <router-link to="/goods/manager" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="d_cont">
      <ul>
        <li>货号：{{goods.goodsSn}}</li>
        <li>品名：{{goods.goodsName}}</li>
        <li><span>零售价：{{goods.goodsSn}}</span><span>参考进价：{{goods.goodsCost}}</span></li>
        <li>分类：{{goods.goodsCateName}}</li>
        <li>供货商：{{goods.supplier}}</li>
        <li>品牌：{{goods.brand}}</li>
        <li>库存数量：</li>
      </ul>
      <table border="1" cellpadding="0" cellspacing="0">
        <tr>
          <th>颜色</th>
          <th>尺码</th>
          <th>数量</th>
        </tr>
        <tr v-for="option in goods.goodsOptionList" v-bind:key="option.optionId">
          <td>{{option.color}}</td>
          <td>{{option.size}}</td>
          <td>{{option.stock}}</td>
        </tr>
      </table>
      <div class="a_btn">
        <mt-button @click="editGoods" type="primary">编辑商品</mt-button>
        <mt-button @click="printBarCode" type="danger">打印标签</mt-button>
      </div>
      <labelPrinter  ref="labelPrinter"></labelPrinter>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/goods/detail";
</style>
<script>
    import { getGoods  } from '../../api/api';
    import labelPrinter from '../../components/labelPrinter'
	export default {
        data() {
            return {
            	goods:{
            	} 
            }
        },
        mounted(){
            var self = this;
                let para = {
                		goodsId: this.$route.query.goodsId 
                    };
                getGoods(para).then((res) => {
                	var goods = res.data.goods;
                	goods.goodsPrice = goods.goodsPrice/100;
                	goods.goodsPrice = goods.goodsPrice.toFixed(2);
                	goods.goodsCost = goods.goodsCost/100;
                	goods.goodsCost = goods.goodsCost.toFixed(2);
                	goods.stock = 0;
                	for(var i in  goods.goodsOptionList){
                		if(!goods.goodsOptionList[i].stock){
                			goods.goodsOptionList[i].stock=0;
                		}
                		goods.stock += parseInt(goods.goodsOptionList[i].stock);
                	}
                	
                	goods.headPictList = JSON.parse(goods.headPict);
                	goods.detailPictList = JSON.parse(goods.detailPict);
                	
                	self.goods = goods;
                	
                });  
            },
            methods : {
            	printBarCode(){
            		 if(!this.$global.labelPrinterConnected){
                      	this.$refs.labelPrinter.doConnectBluetooth();
                      	return false;
                    }
            		if(this.goods.goodsOptionList){
            			for(var i in  this.goods.goodsOptionList){
                			var option = this.goods.goodsOptionList[i];
                			var price = this.goods.goodsPrice/100;
                			price = price.toFixed(2);
                			var config =  {
                					
                					goods:{
                						goodsName:this.goods.goodsName,
                                    	goodsSn:this.goods.goodsSn,
                                    	goodsPrice:price,
                                    	goodsOption:option.color+"/"+option.size,
                                    	barcode:option.barcode,
                                    	printNum:1
                					}
                            }; 
                			
                			this.$refs.labelPrinter.doPrint(JSON.stringify(config));
                		}
            		}
            	},
            	editGoods(){
            		   this.$router.push({ path: '/goods/publish',query: {goodsId: this.goods.goodsId}});
            	}
            },
        components: {
            labelPrinter
        },

    }
</script>
