<template>
  <div class="member">
    <!--固定头部-->
    <div class="m_header">
      <router-link to="/">
        <i class="iconfont icon-back"></i>
      </router-link>
      <div class="m_inp">
        <i class="mintui mintui-search"></i>
        <input autofocus type="text" placeholder="姓名/工号/手机号">
        <i class="iconfont icon-saoma"></i>
      </div>
    </div>
    <div class="m_cont">
      <div class="totle">
        <p>员工数：<span>3</span></p>
      </div>
      <ul class="m_list">
        <li v-for="staff in staffList">
          <a @click="editShopStaff(staff)">
            <div :style="'border-radius: 50%;width: 30px;height: 30px;background-color:'+nameToColor(staff.loginName)"><span style="height:30px; line-height:30px;font-size:16px; display:block; color:#FFF; text-align:center">{{getFirstName(staff.loginName)}}</span></div>
            <div class="listcont">
              <p>{{staff.loginName}}</p>
              <p><span>工号：{{staff.shopLoginId}}</span><span>门店：{{staff.branchName}}</span></p>
            </div>
          </a>
        </li> 
      </ul>
    </div>
    <!--添加按钮-->
    <mt-button @click="addStaff" id="addbtn"><i class="iconfont icon-i-add"></i></mt-button>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/member/member";
  @import "../../style/public";
</style>
<script>
import { getBranchList,getRoleList,getStaffList} from '../../api/api';
    export default {
        data() {
            return {
            	   branchList:[],  
            	   branchId:"",
            	   keyword:"",
            	   dialogFormVisible:false,
            	   staffList:[],
            	   roleList:[],
            	   staff:{
            		   shopLoginId:"",
            		   loginName:"",
            		   mobile:"",
            		   passwd:"",
            		   roleId:"",
            		   commission:""
            	   },
            }
        },
        mounted(){
        	 this.getBranchList();
        	 this.getStaffList();
        	 this.getRoleList();
        },
        methods:{
        	addStaff:function(){
        		  this.$router.push({path:'/staff/addStaff'});
        	},
        	roleSet:function (memberId) {
                this.$router.push({path:'/setup/role'});
            },
            getBranchList(){
            	getBranchList().then((res) => {
      			    this.branchList= res.data.branchList;
      			});
            },
	       editShopStaff(row){
	        	  this.staff =  row;
	        	  this.dialogFormVisible=true;
	          },
            handleDelete(staff){
                	 this.$confirm('确定要删除此员工吗?', '提示', {
          	   	          confirmButtonText: '确定',
          	   	          cancelButtonText: '取消',
          	   	          type: 'warning'
          	   	        	}).then(() => {
	          	   	          	let param = {
	                        		"staffId":staff.staffId,
	                        	};
          	   	        	deleteStaff(param).then((res) => {
          	            		if(res.code != 100000){
          	            				this.$message({
          	          	                  message: "店员删除失败",
          	          	                  type: 'error'
          	          	                }); 
          	            		}else{
          	            			this.$message({
        	        	                  message: "店员已删除",
        	        	                  type: 'success'
        	        	             }); 
          	            		}  
          	  			    });
          	   	        }).catch(() => {
          	                 
              	        });
            },
            getStaffList(){
            	let param = {
            		"branchId":this.branchId,	
            		"roleId":this.roleId,	
            		"keyword":this.keyword
            	};
            	getStaffList(param).then((res) => {
      			   this.staffList = res.data.shopStaffList;
      			});
            },
            getRoleList(){
            	getRoleList().then((res) => {
      			   this.roleList = res.data.roleList;
      			});
            },
            saveStaff(){
            	
            	if(this.staff.shopLoginId == ""){
            		this.$message({
  	                  message: "请输入员工工号",
  	                  type: 'error'
  	                });
            		return false;
            	}
            	
            	if(this.staff.branchId == ""){
            		this.$message({
  	                  message: "请选择所属门店",
  	                  type: 'error'
  	                });
            		return false;
            	}
            	
             	if(this.staff.loginName == ""){
            		this.$message({
  	                  message: "请输入员工姓名",
  	                  type: 'error'
  	                });
            		return false;
            	}


            	if(this.staff.passwd != "" && this.staff.passwd != this.staff.checkPass){
            		this.$message({
  	                  message: "密码输入不一致",
  	                  type: 'error'
  	                });
            		return false;
            	}
            	
            	for(var i in this.staffList){
            		if(this.staffList[i].shopLoginId == this.staff.shopLoginId
            		&& this.staffList[i].shopStaffId  != this.staff.shopStaffId  
            		   ){
            			this.$message({
        	                  message: "工号已经存在，请更换",
        	                  type: 'error'
        	                });
                  		return false;
            		}
            	}
            	

              	if(this.staff.roleId == ""){
            		this.$message({
  	                  message: "请选择员工职务",
  	                  type: 'error'
  	                });
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
            				this.$message({
            	                  message: "您不能开更多的员工账号，请联系旺加开通",
            	                  type: 'error'
            	                });
            			}else{
            				this.$message({
          	                  message: "员工账号保存失败",
          	                  type: 'error'
          	                });
            			}
            		   
            		}else{
            			this.$message({
        	                  message: "员工账号已保存",
        	                  type: 'success'
        	             }); 
            			 this.dialogFormVisible=false;
            			 this.staff={};
            			this.getStaffList();
            		}  
      			});
            },
            getFirstName(strName){
            	return 	 strName.substring(0,1);  
            },
            nameToColor(strName){
            	      var first =  this.getFirstName(strName);
            	      var lastValueStr = escape(first);
            	      var lastValue = lastValueStr.charCodeAt(lastValueStr.length-1)%10;
            	      var colors = ['#912CEE', '#99ff00', '#312520', '#801dae', '#25f8cb', '#CC3333', '#808080', '#a29b7c', '#bce672', '#44cef6'];
            	     return colors[lastValue];
            }
        }
    }
</script>
