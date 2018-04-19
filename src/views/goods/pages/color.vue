<template>
	<div>
	  <div class="p_btn">
	            <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
	  </div>
	  <div style="height:300px;overflow:auto;">
	  <mt-checklist
	    align="right"
	    class="page-part"
	    v-model="selectColors"
	    :options="colorOptionList">
	  </mt-checklist>
	  </div>
	</div>  	  
</template>

<style lang="scss" scoped>
  @import "../../../style/public";
</style>
<script>
import { getColorList} from '../../../api/api';

  export default {
    name: 'page-checklist',
    data() {
      return {
    	  selectColors:[],
    	  colorOptionList:[],
    	  colorList:[]
      };
    },
    created() {
    	 this.getColors();
    },
    mounted(){
    	 if( this.$global.form.colors != null &&  this.$global.form.colors.length >0){
    		 for(var i=0;i< this.$global.form.colors.length ;i++){
    			 this.selectColors.push(this.$global.form.colors[i].attrId);
    		 }
    	 }
    },
    methods: {
    	getColors:function(){
    		var self = this;
            getColorList().then((res) => {
            	self.colorList = res.data.colorList;
                for(var i=0;i< this.colorList.length ;i++){
                	self.colorOptionList.push({
                        label:this.colorList[i].attrName,
                        value:this.colorList[i].attrId 
                    });
                }
            });
        }, 
    	closePopup:function(){
            eventBus.$emit("closePopup");
    	},
    	updateForm:function(){
    	      this.$global.form.colors = [];
			  for(var i=0;i<this.selectColors.length;i++){
				  for(var j=0;j<this.colorList.length;j++){
					  if(this.selectColors[i] == this.colorList[j].attrId){
	                      this.$global.form.colors.push(this.colorList[j]);
	                      break ;
	                  }
				  } 
              }
			  if(!this.$global.form.colors.length){
				  this.$global.form.colors.push({attrName:"-"});
			  }
			
            eventBus.$emit("updateForm");
    	}
    }
  }
</script>
