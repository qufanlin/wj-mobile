<template>
  <div>
	<mt-field label="账号" placeholder="输入商家代码" v-model="ruleLoginForm.account"></mt-field>
	<mt-field label="密码" placeholder="输入密码" type="email" v-model="ruleLoginForm.checkPass"></mt-field>
	<mt-button type="primary"  @click.native.prevent="handleLogin">登录</mt-button>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleLoginForm: {
          account: '18058146607',
          checkPass: '123456',
          devId:'',
        }, 
        checked: true
      };
    },
    methods: {
      handleLogin(ev) {
        var _this = this;

            this.logining = true;
            
        	try{
        		this.ruleLoginForm.devId = JsBridge.getDevId();
        	}catch(err){
        		
        	}
            let param = {
            		"username":this.ruleLoginForm.account,
            		"passwd":this.ruleLoginForm.checkPass,
            		"devId":this.ruleLoginForm.devId
            }
		    requestLogin(param).then(result => {
              this.logining = false;
              //NProgress.done();
              let { message, code, data} = result;
              if (code !== 100000) {
                this.$message({
                  message: message,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('staff', JSON.stringify(data.staff));
                sessionStorage.setItem('userMenuList', JSON.stringify(data.userMenuList));
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('refresh_token',  data.refresh_token); 
                this.$router.push({ path: '/' });
              }
            }); 
      }
    }
  }

</script>
 