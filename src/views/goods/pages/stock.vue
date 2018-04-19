<template>
	<div>
	  <div class="p_btn">
	    <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="submitForm">确定</mt-button>
	  </div>
  		<div class="stock"  style="height:300px;overflow:auto;">
		    <p class="s_head"><span>规格</span><span class="code">条码</span><span>数量</span></p>
		    <ul >
		      <li  v-for="option in goodsOptions" >
		        <!-- 配图 -->
			      <div>
			      		<img style="width:80px;height:80px;border:1px solid #dadada" v-if="option.colorPict" :src="option.colorPict" class="avatar">
					   <i v-else-if="option.colorValue == 'gezi'" :style="'width:80px;height:80px;border:1px solid #dadada;background:url(\''+require('../../../assets/color/gezi.png')+'\');background-size:cover;'"  class="el-icon-plus avatar-uploader-icon"></i>
					   <i v-else-if="option.colorValue == 'huase'" :style="'width:80px;height:80px;border:1px solid #dadada;background:url(\''+require('../../../assets/color/huase.png')+'\');background-size:cover;'"  class="el-icon-plus avatar-uploader-icon"></i>
					   <i v-else-if="option.colorValue == 'tiaowen'" :style="'width:80px;height:80px;border:1px solid #dadada;background:url(\''+require('../../../assets/color/tiaowen.png')+'\');background-size:cover;'"  class="el-icon-plus avatar-uploader-icon"></i>
					  <i  :style="'width:80px;height:80px;border:1px solid #dadada;background:'+option.colorValue" v-else class="el-icon-plus avatar-uploader-icon">+</i>
			      </div>
		        <div   v-for="size in option.sizes">
		          <p>{{ option.colorName }}/{{ size.sizeName }}</p>
		          <p class="code1"><input class="code" v-model="size.barcode" type="text" /><i class="iconfont icon-saoma" @click="scanCode(option.colorName+'|'+size.sizeName)"></i></p>
		          <p><input  v-model="size.stock" class="num" type="text" /></p>
		        </div>
		      </li>
		    </ul>
      </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../../style/public";
  @import "../../../style/goods/add";
</style>


<script>
  export default {
    data() {
      return {
        uploadUrl:this.$global.uploadHost+"/upload/uploadImages",
        sizes:[],
        colors:[], 
        goodsOptions: [] 
      }
    },   
      mounted(){
    	 		this.sizes = this.$global.form.sizes;
    	 		this.colors = this.$global.form.colors;
		     if(!this.sizes ||  this.sizes.length < 1){
		    	 this.sizes.push({attrName:"-"});
		     }
		     if(!this.colors ||  this.colors.length < 1){
		    	 this.colors.push({attrName:"-"});
		     }
		     for(var c in this.colors){
		       var color = {
		            colorName: this.colors[c].attrName,
			        colorPict: this.colors[c].attrPict,
			        colorValue:this.colors[c].attrValue,
			        sizes:[]
		       }
		      
		          for(var s in this.sizes){
		             var size = {
				             sizeName: this.sizes[s].attrName, 
				             barcode: "",
				             stock: "",
				       }
				       color.sizes.push(size);
		          }
		          
		       this.goodsOptions.push(color);
		     }
		     
		     //从缓存中取出
		     if(this.$global.form.goodsOptions){
		        var oldGoodsOptions =  this.$global.form.goodsOptions; 
		        for(var i in oldGoodsOptions){
		           for(var ii in this.goodsOptions){
		              if(this.goodsOptions[ii].colorName ==  oldGoodsOptions[i].colorName){
		                 for(var j in oldGoodsOptions[i].sizes){
		          			 for(var jj in this.goodsOptions[ii].sizes){
		          		           if(this.goodsOptions[ii].sizes[jj].sizeName == oldGoodsOptions[i].sizes[j].sizeName){
		                                    this.goodsOptions[ii].sizes[jj].barcode =  oldGoodsOptions[i].sizes[j].barcode;
		                                    this.goodsOptions[ii].sizes[jj].stock =   oldGoodsOptions[i].sizes[j].stock;
		                           }   
		          			 }
		          		}	 
		              }
		           }
		        }
		     }
		    this.fieldEmptyBarCode();     
     }, 
    methods: {
      submitForm() { 
        this.$global.form.goodsOptions = this.goodsOptions;
      	eventBus.$emit('updateForm');
      },
	  closePopup:function(){
	          eventBus.$emit("closePopup");
	 },
      setBatchStock() { 
         for(var i in this.goodsOptions){
		    for(var j in this.goodsOptions[i].sizes){
		          this.goodsOptions[i].sizes[j].stock = this.batchStock;		         
		     }
		 }	 
      },
      
      //填充空的条形码 日期戳+随机3位
      fieldEmptyBarCode() {
    	  var updated = false;
         for(var i in this.goodsOptions){
 		    for(var j in this.goodsOptions[i].sizes){
 		        if(!this.goodsOptions[i].sizes[j].barcode){
 		        	 var tmp = Date.parse( new Date() ).toString();
 		              tmp = parseInt((parseInt(tmp.substr(0,8))+Math.random())*100000);
 		             this.goodsOptions[i].sizes[j].barcode = tmp;
 		            updated = true;
 		        } 
 		        
 		    }
 		 }	 
         //数据有变化则保存一次
         if(updated){
             this.$global.form.goodsOptions = this.goodsOptions;
         }
       }, 
       successUpload(res,file){
              if(res.state !='success'){
                this.$message({
	                  message: res.state,
	                  type: 'error'
	                });
              }else{
             	 this.goodsOptions[res.data].colorPict = res.url;
             	 for(var c in this.colors){
             		 //同时修改颜色选项中的图片
             		 if(this.colors[c].attrName == this.goodsOptions[res.data].colorName){
             			this.colors[c].attrPict = res.url;
             			break;
             		 } 
             	 }
              }
      },
	  scanCode(obj){
		JsBridge.scanCode(obj);
		var self = this;
		eventBus.$on('scanCodeResult',function(result,obj){
			var o = obj.split("|");
			 for(var i in self.goodsOptions){
				    for(var j in self.goodsOptions[i].sizes){
				    	  if(self.goodsOptions[i].sizes[j].sizeName == o[1] && self.goodsOptions[i].colorName == o[0]){
				    		  self.goodsOptions[i].sizes[j].barcode = result;
				    		  break;
				    	  }
				     }
				 }	 
        });  
      },
    }
  }
</script> 
