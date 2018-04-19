<template>
	<div>
	  <div class="p_btn">
	            <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
	  </div>
	  <mt-radio
	    class="page-part"
	    title=""
	    v-model="selectedCategory"
	    :options="categoryList">
	  </mt-radio>
	</div>  
</template>
<style lang="scss" scoped>
  @import "../../../style/public";
</style>
<script>
  import { getCategoryList} from '../../../api/api';

    export default {
        data() {
            return {
                selectedCategory: "",
                categoryList:[]
            };
        },
        created:function(){
   			this.getCategorys();
	   		 
        },
        mounted:function(){
        	if( this.$global.form.category != null){
	   			this.selectedCategory =  this.$global.form.category.value+"";
	    	 }
        },
        methods: {
          	getCategorys:function(){
        	     	getCategoryList().then((res) => { 
        	     		 this.categoryList = [];
					  for(var i in res.data.categoryList){
						  var cate = res.data.categoryList[i];
						  this.categoryList.push({  
					            label: cate.goodsCateName,  
					            value: cate.goodsCateId+"" 
					            });
					  };
					
					
				});
        	},
        	closePopup:function(){
                eventBus.$emit("closePopup");
        	},
        	updateForm:function(){
        		 for(var i in this.categoryList){
        			  var cate = this.categoryList[i];
        		      if(this.selectedCategory == cate.value){
        		    	  this.$global.form.category = this.categoryList[i];
        		    	  break;
        		      }
				  };
                eventBus.$emit("updateForm");
        	}
        }
    }
</script>
