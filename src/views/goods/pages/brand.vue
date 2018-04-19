<template>
	<div>
	  <div class="p_btn">
      <mt-button @click.native="closePopup">取消</mt-button>
      <mt-button class="confirm" @click.native="updateForm">确定</mt-button>
	  </div>
	  <mt-radio
	    class="page-part"
	    title=""
	    v-model="selectedBrand"
	    :options="brandList">
	  </mt-radio>
	</div>
</template>
<style lang="scss" scoped>
  @import "../../../style/public";
</style>
<script>
  import { getBrandList} from '../../../api/api';

    export default {
        data() {
            return {
                selectedBrand: "",
                brandList:[]
            };
        },
        created:function(){
   			this.getBrands();

        },
        mounted:function(){
        	if( this.$global.form.brand != null){
	   			this.selectedBrand =  this.$global.form.brand;
	    	 }
        },
        methods: {
        	getBrands:function(){
        		getBrandList().then((res) => {
        	     		 this.brandList = [];
					  for(var i in res.data.brandList){
						  var brand = res.data.brandList[i];
						  this.brandList.push({
					            label: brand.attrName,
					            value: brand.attrName
					            });
					  };


				});
        	},
        	closePopup:function(){
                eventBus.$emit("closePopup");
        	},
        	updateForm:function(){
        		this.$global.form.brand = this.selectedBrand;
                eventBus.$emit("updateForm");
        	}
        }
    }
</script>
