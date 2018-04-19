<template>
  <div class="detail">
    <!--头部-->
    <mt-header title="添加商品">
      <router-link to="/goods/manager" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="d_cont">
      <!--添加商品表单-->
      <div class="add_form">
        <!--图片上传-->
        <div class="page-actionsheet">
          <div class="page-actionsheet-wrapper">
         	 <ul>
			  <li v-for="imgurl in form.headImages">
			    	<img  :src="imgurl.url+'_80x80.jpg'" style="width:40px;height:40px;">
			  </li>
			</ul>
            <mt-button v-if="canAddPic" @click.native="sheetVisible = true"><i class="iconfont icon-i-add"></i></mt-button>
          </div>
          <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        </div>
        <div class="f_list">
          <mt-cell title="品名">
            <input type="text" ref="goodsName" v-model="form.goodsName"/><label>必填</label>
          </mt-cell>
          <mt-cell title="款号">
            <input type="text"  ref="goodsSn" v-model="form.goodsSn"/><label>必填</label>
          </mt-cell>
          <mt-cell title="商品分类" @click.native="classily">
            <input type="text" v-bind:value="categoryView" readonly /><label> <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-cell title="颜色" @click.native="color">
            <input type="text" v-bind:value="colorView" readonly /><label> <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-cell title="尺码" @click.native="size">
            <input type="text"  v-bind:value="sizeView" readonly /><label> <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-cell title="库存" @click.native="stock">
            <input type="text"  v-bind:value="stockTotal"   readonly>
          </mt-cell>
          <mt-cell title="零售价">
            <input type="number"  v-on:blur="formatNum()"  v-model="form.goodsPrice"  />
          </mt-cell>
          <mt-cell title="商品进价">
            <input type="number"  v-on:blur="formatNum()"  v-model="form.goodsCost"  />
          </mt-cell>
          <mt-cell title="供应商" @click.native="supplier">
            <input type="text" v-model="form.supplier" readonly><label> <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-cell title="品牌" @click.native="brand">
            <input type="text"  v-model="form.brand" readonly /><label> <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
        </div>
      </div>
      <div class="a_btn">
        <mt-button type="primary" @click.native="submitForm(1)">保存</mt-button>
        <mt-button type="primary"  @click.native="submitForm(0)">继续保存</mt-button>
      </div>
      <!--底部弹出框-->
      <mt-popup v-model="popup1" position="bottom">
        <div class="popup">
          <router-view></router-view>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/goods/detail";
  @import "../../style/public";
</style>
<script>
import { saveGoods,getGoods,saveCameraPhoto  } from '../../api/api';
  import Vue from 'vue';
  window.eventBus = new Vue();
  export default {
    data() {
      return {
        sheetVisible: false,
        actions: [],
        popup1: false,
        value1: [],
        canAddPic:true,
        form:this.formData(),
      };
    },
    methods: {
      formData(){
   		 return  {
            	goodsId:'',
               goodsSn:'',
               goodsName: '',
               goodsPrice:'',
               colors: [{attrName:"-"}],
               colorView:'',
               sizes: [{attrName:"-"}],
               sizeView:'',
               goodsCost: '',
               goodsCateId: 0,
               category: {},
               enableStock: 1,
               stock: 0,
               isDisc: 1,
               isPoints: 1,
               supplier: '',
               brand: '',
               goodsOptions:[],
               headImages:[],
               detailImages:[]
           };
   	   },
      takePhoto() {
   		this.sheetVisible= false;
   		setTimeout(function(){
   			JsBridge.cameraUpload();
   		},100);
        
      },
      openAlbum() {
    	  this.sheetVisible= false;
    	   setTimeout(function(){
      			JsBridge.albumUpload();
      		},100);
      },
      classily(){
        this.popup1=true;
        this.$router.push({ path: '/goods/classify' });
      },
      color(){
        this.popup1=true;
        this.$router.push({ path: '/goods/color' });
      },
      size(){
        this.popup1=true;
        this.$router.push({ path: '/goods/size' });
      },
      stock(){
        this.popup1=true;
        this.$router.push({ path: '/goods/stock' });
      },
      supplier(){
        this.popup1=true;
        this.$router.push({ path: '/goods/supplier' });
      },
      brand(){
        this.popup1=true;
        this.$router.push({ path: '/goods/brand' });
      }, 

      closePopup(){
        this.popup1=false; 
      },
 	 formatNum(){
 		  if(this.form.goodsCost)
 		   this.form.goodsCost =  this.form.goodsCost.replace(/[^0-9.]/g,'');
 		  if(this.form.goodsPrice)
 	       this.form.goodsPrice =  this.form.goodsPrice.replace(/[^0-9.]/g,'');
 	 },
      submitForm(loc) {
          if( this.form.goodsName == ""){
              this.$toast("品名不能为空");
              this.$refs.goodsName.focus();
              return false;
          }
          if( this.form.goodsSn == ""){
              this.$toast("货号不能为空");
              this.$refs.goodsSn.focus();
              return false;
          }

          let params = {
          	goodsId: this.form.goodsId,
              goodsName: this.form.goodsName,
              goodsSn: this.form.goodsSn,
              goodsPrice: parseInt(this.form.goodsPrice*100),
              colorList: this.form.colors,
              sizeList: this.form.sizes,
              goodsCost: parseInt(this.form.goodsCost*100),
              goodsCateId: this.form.category.goodsCateId,
              enableStock: this.form.enableStock,
              isDisc: this.form.isDisc,
              isPoints: this.form.isPoints,
              supplier: this.form.supplier,
              brand: this.form.brand,
              goodsOptions: this.form.goodsOptions,
              headImages: this.form.headImages,
              detailImages: this.form.detailImages
          }
        	var self = this;
          saveGoods(params).then((res) => {
              if(res.code != 100000){
            	   if(res.error_info != ""){
            		   self.$toast(res.error_info);
            	   }else{
            		   self.$toast("商品保存失败");
            	   }
            	  
              }else{
            	  self.$toast({
                	  message: "商品保存成功",
                	  iconClass: "icon icon-success"
                	});
                  if(loc == 1){
                	  self.$router.push({ path: '/goods/manager' });
                  }else{
                	  self.form = this.$global.form =this.formData();
                  } 
              }
          });

      }, 
      saveUploadCamera(photoData) {
    	  var self = this;
    	  if(photoData == ""){
    		  this.$toast('您没有选择图片');
    		  return false;
    	  }
    	  if(self.form.headImages.length > 4){
   			 self.canAddPic = false;
   			 self.$toast('图片最多添加5张');
   			 return false;
   		  }
      	saveCameraPhoto({imageData:photoData}).then((res)=>{
      		 this.$indicator.close();
          	 if(res.state != "success"){
          		 this.$toast('保存照片失败，请重试!');
          	 }else{ 
          		  if(self.form.headImages.length > 4){
            			 self.canAddPic = false;
            			 return false;
            	  }else{
            		  self.form.headImages.push(res); 
            	  }
          		 
          	 }
          });
      },
    },

    mounted() {
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '从相册中选择',
        method: this.openAlbum
      }];
      
      this.$global.form =  this.form;
      this.$global.form.goodsId = this.$route.query.goodsId;
      //编辑操作 先加载商品数据
      if(  this.$global.form.goodsId ){
          let para = {
          		goodsId:  this.$global.form.goodsId 
              };
          getGoods(para).then((res) => {
             var goods = res.data.goods;
             
              this.$global.form.goodsId = goods.goodsId;
              this.$global.form.goodsSn = goods.goodsSn;
              this.$global.form.goodsName = goods.goodsName;
              this.$global.form.goodsPrice = parseFloat(goods.goodsPrice)/100;
              this.$global.form.goodsPrice = this.$global.form.goodsPrice.toFixed(2);
              this.$global.form.goodsCost  = parseFloat(goods.goodsCost)/100;
              this.$global.form.goodsCost  = this.$global.form.goodsCost.toFixed(2);
              this.$global.form.goodsCateId = goods.goodsCateId;
              this.$global.form.category = {
		                		   goodsCateId:goods.goodsCateId,
		                		   goodsCateName:goods.goodsCateName
		                		   };

              this.$global.form.enableStock = goods.enableStock;
              this.$global.form.stock = goods.stock;
              this.$global.form.isDisc  = goods.isDisc;
              this.$global.form.isPoints  = goods.isPoints;
              this.$global.form.supplier = goods.supplier;
              this.$global.form.brand  = goods.brand;
              if(goods.headPict)
              this.$global.form.headImages  = JSON.parse(goods.headPict);
              this.$global.form.detailImages  = JSON.parse(goods.detailPict);
              this.$global.form.colors  = JSON.parse(goods.colors);
              this.$global.form.sizes = JSON.parse(goods.sizes);
            
             var goodsOptionList = goods.goodsOptionList;
             //装载库存及条码
              for(var c in   this.$global.form.colors){
   		       var color = {
   		            colorName:  this.$global.form.colors[c].attrName,
   			        colorPict:  this.$global.form.colors[c].attrPict,
   			        colorValue: this.$global.form.colors[c].attrValue,
   			        sizes:[]
   		       }
   		      
   		          for(var s in  this.$global.form.sizes){
   		             var size = {
   				             sizeName:  this.$global.form.sizes[s].attrName,  
   				       }
       		            for(var i in goodsOptionList){
                         	   if(goodsOptionList[i].color == color.colorName && 
                         			goodsOptionList[i].size == size.sizeName){
                         		    size.stock = goodsOptionList[i].stock;
                         		    size.barcode = goodsOptionList[i].barcode;
                         	   }
                         }
   				       color.sizes.push(size);
   		          }
   		          
   		        this.$global.form.goodsOptions.push(color);
   		     }
          });
          this.form = this.$global.form; 
      }
      
      var self = this;
      eventBus.$on('updateForm',function(){
    	  self.form = self.$global.form;
    	  self.closePopup();
      });  
      
      eventBus.$on('closePopup',function(){
    	  self.closePopup();
      });  

      eventBus.$on('photoCallback',function(result){
		    self.saveUploadCamera(result);
		    self.$indicator.close();
      });  
    },
    computed: {
        colorView () {
            var colorStr ="";
            if( this.form.colors){
                for(var i=0 ;i< this.form.colors.length ;i++){
                    colorStr+= this.form.colors[i].attrName+"/";
                }
            }
            colorStr = colorStr.replace(/\/$/,'');
            return colorStr;
        },
        sizeView () {
            var sizeStr ="";
            if( this.form.sizes){
            	 for(var i=0 ;i< this.form.sizes.length ;i++){
                     sizeStr+= this.form.sizes[i].attrName+"/";
                 }
            }
           
            sizeStr = sizeStr.replace(/\/$/,'');
            return sizeStr;
        },
        categoryView (){ 
        	return  ( this.form.category ? this.form.category.label:"");
        }, 
        stockTotal(){
            var total = 0;
            for(var i in  this.form.goodsOptions){
                for(var s in  this.form.goodsOptions[i].sizes){
                    total +=  parseInt(this.form.goodsOptions[i].sizes[s].stock);
                }
            }
            if(total >0) return total;
            return ;
        }
    } 
  };
</script>
