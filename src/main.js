// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routers'
import MintUI from 'mint-ui';
import globals from './global'
import 'mint-ui/lib/style.css';
import axios from 'axios';

Vue.use(MintUI);
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});
Vue.config.productionTip = false;


//注册全局变量
Vue.prototype.$global = globals;

//请求拦截
axios.interceptors.request.use(function (config) {
 if (sessionStorage.getItem('access_token')!=null && sessionStorage.getItem('access_token')!="" && sessionStorage.getItem('access_token')!="null") {
     config.headers['access_token'] = sessionStorage.getItem('access_token');
 }
 if (sessionStorage.getItem('refresh_token')!=null && sessionStorage.getItem('refresh_token')!="" && sessionStorage.getItem('refresh_token')!="null") {
     config.headers['refresh_token'] = sessionStorage.getItem('refresh_token');
 }
 return config;
}, function (error) {
return Promise.reject(error);
});


router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('staff'); 
  }
  let user = JSON.parse(sessionStorage.getItem('staff'));
  if (!user && to.path != '/login' && to.path.indexOf("/system/")) {
    next({ path: '/login' });
  } else {
    next();
  }
});


//响应拦截
axios.interceptors.response.use(
	 function (response) {
		response = response.data;
		if (Object.prototype.toString.call(response) === '[object String]') {
			    response = JSON.parse(response);
			  }
		//如果有token则重置
		if(response.refresh_token){
		   sessionStorage.setItem('refresh_token', response.refresh_token);
		}
		
		if(response.access_token){
		   sessionStorage.setItem('access_token', response.access_token);
		}
		if(response.code==200001){
			Vue.$toast('登录已过期，请重新登录');
			     router.push({path:'/login'}); 
		}else if(response.code==200002){
			Vue.$toast(response.message);
			     router.push({path:'/login'}); 
		}
		return response;
	 },  
	function (error) {
		return Promise.reject(error);
	}

);
 
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  globals,
  components: { App },
  template: '<App/>'
});

