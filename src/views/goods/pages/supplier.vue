<template>
	<div>
	  <div class="p_btn">
	            <mt-button @click.native="closePopup">取消</mt-button><mt-button class="confirm" @click.native="updateForm">确定</mt-button>
	  </div>
	  <mt-radio
	    class="page-part"
	    title=""
	    v-model="selectedSupplier"
	    :options="supplierList">
	  </mt-radio>
	</div>  
</template>
<style lang="scss" scoped>
  @import "../../../style/public";
</style>
<script>
  import { getSupplierList} from '../../../api/api';

    export default {
        data() {
            return {
                selectedSupplier: "",
                supplierList:[]
            };
        },
        created:function(){
   			this.getSuppliers();
	   		 
        },
        mounted:function(){
        	if( this.$global.form.supplier != null){
	   			this.selectedSupplier =  this.$global.form.supplier;
	    	 }
        },
        methods: {
        	getSuppliers:function(){
        		getSupplierList().then((res) => { 
        	     		 this.supplierList = [];
					  for(var i in res.data.supplierList){
						  var supplier = res.data.supplierList[i];
						  this.supplierList.push({  
					            label: supplier.attrName,  
					            value: supplier.attrName 
					            });
					  };
					
					
				});
        	},
        	closePopup:function(){
                eventBus.$emit("closePopup");
        	},
        	updateForm:function(){
        		this.$global.form.supplier = this.selectedSupplier;
                eventBus.$emit("updateForm");
        	}
        }
    }
</script>
