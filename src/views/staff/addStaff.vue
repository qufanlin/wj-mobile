<template>
  <div class="field">
    <!--头部-->
    <mt-header title="添加员工">
      <router-link to="/staff" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="part">
      <mt-cell title="门店" @click.native="popup1 = true">
        <input type="text" readonly v-bind:value="staff.branchName"><label>选择 <i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-field label="姓名"  v-model="staff.loginName"  placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
      <mt-field label="工号"  v-model="staff.shopLoginId"  placeholder="请输入数字" type="number"></mt-field>
      <mt-field label="密码"  v-model="staff.passwd" placeholder="请输入密码" type="password"></mt-field>
      <mt-field label="确认密码" v-model="staff.checkPass" placeholder="请输入密码" type="password"></mt-field>
      <!--<mt-field label="职务" placeholder="选择"></mt-field>-->
      <mt-cell title="职务" @click.native="popup2 = true">
        <input type="text" readonly v-bind:value="staff.roleName"><label>选择 <i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-field label="手机号"  v-model="staff.mobile" placeholder="请输入手机号" type="tel"></mt-field>
    </div>
    <!--按钮-->
    <div class="a_btn">
      <mt-button type="primary" @click="saveStaff(0)">保存</mt-button>
      <mt-button type="primary"  @click="saveStaff(1)">继续保存</mt-button>
    </div>
    <!--底部弹出框-->
    <mt-popup v-model="popup1" position="bottom">
      <div class="popup">
        <div class="p_btn">
          <mt-button @click.native="popup1 = false">取消</mt-button><mt-button class="confirm" @click="confirmBrandSelect">确定</mt-button>
        </div>
        <mt-radio
          align="right"
          class="part"
          v-model="staff.branchId"
          :options="branchList">
        </mt-radio>
      </div>
    </mt-popup>
    <mt-popup v-model="popup2" position="bottom">
      <div class="popup">
        <div class="p_btn">
          <mt-button @click.native="popup2 = false">取消</mt-button><mt-button class="confirm" @click="confirmRoleSelect">确定</mt-button>
        </div>
        <mt-radio
          align="right"
          class="part"
          v-model="staff.roleId"
          :options="roleList">
        </mt-radio>
      </div>
    </mt-popup>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/public";
  .field{
    .mint-popup{
      width: 100%;
    }

  }
</style>
<script>
import { getBranchList,getRoleList,saveStaff} from '../../api/api';
  export default {
    data(){
      return{
        popup1: false,
        popup2: false,
 	    branchList:[],  
	    roleList:[],
	    staff:{
	    	 roleName:"",
	         branchName:"",
	    	loginName:"",
	    	shopLoginId:"",
	    	branchId:"",
	    	roleId:"",
	    	passwd:"",
	    	checkpass:"",
	    	mobile:"",
	    	}
      }
    },
    created() {
   		 this.getBranchList();
		 this.getRoleList();
    },
    methods:{
        getBranchList(){
        	getBranchList().then((res) => {
        		this.branchList = [];
  			   for(var i in res.data.branchList){
  				 this.branchList.push({
  					 label:res.data.branchList[i].branchName,
  					 value:res.data.branchList[i].branchId+"",
  				 });
  			   }
  			});
        },
        getRoleList(){
        	getRoleList().then((res) => {
        		this.roleList = [];
  			  for(var i in res.data.roleList){
   				 this.roleList.push({
   					 label:res.data.roleList[i].roleAlias,
   					 value:res.data.roleList[i].roleId+"",
   				 });
   			   }
  			});
        },
        saveStaff(loc){


        	if(this.staff.branchId == ""){
        		this.$toast("请选择所属门店"); 
        		return false;
        	}
        	
         	if(this.staff.loginName == ""){
         		this.$toast("请输入员工姓名");  
        		return false;
        	}
        	if(this.staff.shopLoginId == ""){
        		this.$toast("请输入员工工号");
        		return false;
        	}


        	if(this.staff.passwd != "" && this.staff.passwd != this.staff.checkPass){
        		this.$toast("密码输入不一致");  
        		return false;
        	}
        	
        	for(var i in this.staffList){
        		if(this.staffList[i].shopLoginId == this.staff.shopLoginId
        		&& this.staffList[i].shopStaffId  != this.staff.shopStaffId  
        		   ){
        			this.$toast("工号已经存在，请更换");  
              		return false;
        		}
        	}
        	

          	if(this.staff.roleId == ""){
        		this.$toast("请选择员工职务");  
        		return false;
        	}
        	
        	let param = {
        			shopStaffId:this.staff.shopStaffId,
        			shopLoginId:this.staff.shopLoginId,
        			loginName:this.staff.loginName,
        			mobile:this.staff.mobile,
        			passwd:this.staff.passwd,
        			commission:this.staff.commission,
        			roleId:this.staff.roleId,
        			branchId:this.staff.branchId
        	}
         	
        	saveStaff(param).then((res) => {
        		if(res.code != 100000){
        			if(res.error_info == "overLimit"){
        				this.$toast("您不能开更多的员工账号，请联系旺加开通");  
        			}else if(res.error_info == "staffLoginIdExists"){
        				this.$toast("员工工号已存在，请更换");  
      			   }else{
        				this.$toast("员工账号保存失败");  
        			}
        		   
        		}else{
    				 this.$toast("员工账号已保存");  
        			 this.staff={}; 
    				 if(loc == 1){
    					  this.$router.push({path:'/staff'});
    				 }
        		}  
  			});
        },
        confirmBrandSelect(){
        	for(var i in this.branchList ){
        		if(this.branchList[i].value == this.staff.branchId){
        			this.staff.branchName = this.branchList[i].label;
        			break;
        		}
        	}
        	this.popup1 = false;
        },
        confirmRoleSelect(){
        	for(var i in this.roleList ){
        		if(this.roleList[i].value == this.staff.roleId){
        			this.staff.roleName = this.roleList[i].label;
        			break;
        		}
        	}
        	this.popup2 = false;
        }
    }
  };
</script>
