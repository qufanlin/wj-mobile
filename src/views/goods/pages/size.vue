<template>
	<div>
	  <div class="p_btn">
	            <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
	  </div>
	  <div style="height:300px;overflow:auto;">
	  <mt-checklist
	    align="right"
	    class="page-part"
	    v-model="selectSizes"
	    :options="sizeOptionList">
	  </mt-checklist>
	  </div>
	</div>  	  
</template>

<style lang="scss" scoped>
  @import "../../../style/public";
</style>
<script>
import { getSizeList} from '../../../api/api';

  export default {
    name: 'page-checklist',
    data() {
      return {
    	  selectSizes:[],
    	  sizeOptionList:[],
    	  sizeList:[]
      };
    },
    created() {
    	 this.getSizes();
    },
    mounted(){
    	 if( this.$global.form.sizes != null &&  this.$global.form.sizes.length >0){
    		 for(var i=0;i< this.$global.form.sizes.length ;i++){
    			 this.selectSizes.push(this.$global.form.sizes[i].attrId);
    		 }
    	 }
    },
    methods: {
    	getSizes:function(){
    		var self = this;
            getSizeList().then((res) => {
            	self.sizeList = res.data.sizeList;
                for(var i=0;i< this.sizeList.length ;i++){
                	self.sizeOptionList.push({
                        label:this.sizeList[i].attrName,
                        value:this.sizeList[i].attrId 
                    });
                }
            });
        }, 
    	closePopup:function(){
            eventBus.$emit("closePopup");
    	},
    	updateForm:function(){
    	      this.$global.form.sizes = [];
			  for(var i=0;i<this.selectSizes.length;i++){
				  for(var j=0;j<this.sizeList.length;j++){
					  if(this.selectSizes[i] == this.sizeList[j].attrId){
	                      this.$global.form.sizes.push(this.sizeList[j]);
	                      break ;
	                  }
				  }
                  
              }
			  if(!this.$global.form.sizes.length){
				  this.$global.form.sizes.push({attrName:"-"});
			  }
            eventBus.$emit("updateForm");
    	}
    }
  }
</script>
